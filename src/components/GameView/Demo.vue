<template>
    <div class="demo-cont">
        <div class="side-panel">
            <FilterPanel v-bind="filterPanelParams"></FilterPanel>
            <div class="reset-anim-btn" @click="exitFullscreen"></div>
        </div>
        <svg viewBox="0 0 632 632" height="100%" width="100%" class="sun-burst-svg" :key="componentKey">
            <!-- grid lines -->
            <g>
                <path class="arc" id="arc-1" v-for="arc in arcs" v-bind:d="arc.d"
                    :style="{ 'stroke-dasharray': arc.strokeDashArray, 'stroke-dashoffset': arc.strokeDashOffset }"
                    stroke="black" stroke-width="1" fill="none"></path>
            </g>

            <!-- end lines -->
            <line opacity="0" class="start-line" v-bind="startLineCoordinates">
                <animate attributeType="CSS" attributeName="opacity" from="0" to="1" dur=".5s" fill="freeze"></animate>
            </line>
            <line opacity="0" class="end-line" v-bind="endLineCoordinates">
                <animate attributeType="CSS" attributeName="opacity" from="0" to="1" begin="1.5s" dur=".2s"
                    fill="freeze">
                </animate>
            </line>

            <!-- sun rays -->
            <g v-for="(ray, index) in sunRays">
                <rect class="sun-ray" height="8"
                    v-bind="{ x: ray.cx - 4, y: ray.cy - 4, transform: ray.rotation, fill: ray.fill, rx: 4 }" v-bind:class="{ selected: selectedWeek1 === index }">
                    <animate attributeType="CSS" attributeName="width"
                        v-bind="{ from: '0', to: `${ray.units}`, begin: `${ray.animationDelay}s` }" dur=".5s"
                        fill="freeze"></animate>
                    <animate attributeType="CSS" attributeName="opacity"
                        v-bind="{ from: 0, to: 1, begin: `${ray.animationDelay}s` }" dur=".5s" fill="freeze"></animate>

                </rect>
                <circle r="4" opacity="0" fill="black" v-bind="{ cx: ray.cx, cy: ray.cy, transform: ray.rotation }">
                    <animate attributeType="CSS" attributeName="cx"
                        v-bind="{ from: ray.cx, to: `${ray.cx + ray.units - 8}`, begin: `${ray.animationDelay}s` }"
                        dur=".5s" fill="freeze"></animate>
                    <animate attributeType="CSS" attributeName="opacity"
                        v-bind="{ from: 0, to: 1, begin: `${ray.animationDelay}s` }" dur=".5s" fill="freeze"></animate>
                </circle>
            </g>
        </svg>
    </div>

</template>

<script setup>
import { onMounted, reactive, ref, computed } from "vue";
import postal from "postal";
import FilterPanel from "./FilterPanel.vue";
const state = reactive({
    demoState: null
})

// --- start subscriptions --- //
const channel = postal.channel("Notifications");
channel.subscribe("selectYear", (year) => selectYear(year));
channel.subscribe("selectWeek", ({ week, weekSelector }) => selectWeek(week, weekSelector));
// --- end subscriptions --- //

const arcs = ref([]);
const sunRays = ref([]);
const componentKey = ref(0);
const endLineCoordinates = ref(null);
const startLineCoordinates = ref(null);
const selectedYear = ref((new Date()).getFullYear());
const currentWeek = ref(getWeekNumber(new Date()));
const selectedWeek1 = ref(currentWeek.value);
const selectedWeek2 = ref();
const currentMonth = ref();

const filterPanelParams = reactive({
    selectedYear: selectedYear,
    selectedWeek1: selectedWeek1,
    selectedWeek2: selectedWeek2,
    currentWeek: currentWeek
})

const jobTrackStates = {
    animating: "animating",
    interactive: "interactive"
}

onMounted(() => {
    draw();
})

function draw() {
    drawArc();
    drawRays();
    drawEndLine();
}

function redraw() {
    componentKey.value = componentKey.value + 1;

    // setTimeout(() => {
    //     redraw();
    // }, 5000)
}

setTimeout(() => {
    //redraw();
}, 5000)




function drawArc() {
    arcs.value = [];

    // Use 'animationend' event to sync animations
    var arcItems = [];
    const arcCount = 5;
    const offset = 32;
    const x1 = 316;
    var y1 = 60;
    var r = 256;
    const weeks = getWeeksInYear(selectedYear.value);

    for (var i = arcCount; i > 0; i--) {
        const degPerUnit = 360 / 60;
        const degToLastUnit = (degPerUnit * (weeks - 1)) * (Math.PI / 180); // In radians

        const x2 = x1 + (r * Math.sin(degToLastUnit));
        const y2 = r - (r * Math.cos(degToLastUnit)) + y1;
        const arcLength = r * degToLastUnit;

        var d = `M ${x1} ${y1}
                  A ${r} ${r} 0 1 1 ${x2} ${y2}`;

        arcItems.push({
            d: d,
            strokeDashArray: arcLength,
            strokeDashOffset: arcLength
        });

        y1 += offset; // Move down to next line
        r -= offset; // Shrink radius for next arc
    }

    arcs.value = arcItems;
}

function drawRays() {
    sunRays.value = [];
    const offsetFromTop = 60;
    var rays = [];
    const totalSlots = 60;
    const degPerUnit = 360 / totalSlots;
    const center = 316;
    const rayRadius = 4;
    const weeks = getWeeksInYear(selectedYear.value);
    const degToLastUnit = (degPerUnit * (weeks - 1)) * (Math.PI / 180); // In radians

    var x;
    var y;
    var l;
    var radius = 96; // Distance from center of circle. Should make radius of largest circle a global and derive from there...
    var delayStagger = 0;

    for (var i = 0; i < weeks; i++) {
        var deg = i * degPerUnit * (Math.PI / 180); // Number of degrees to rotate, then converted to radians
        x = center + radius * Math.sin(deg); // x offset
        y = radius - radius * Math.cos(deg) + 220; // 220 = Y offset

        l = Math.random() * 175;
        var delay = deg / degToLastUnit;

        var ray = {
            rotation: `rotate(${i * degPerUnit - 90} ${x} ${y})`,
            cx: x,
            cy: y,
            fill: '#c1c1c1',
            units: l < 8 ? 8 : l,
            selected: computed(() => selectedWeek1.value === i + 1),
            animationDelay: delay + delayStagger
        }

        delayStagger += 0.001;

        rays.push(ray);
    }

    sunRays.value = rays;
}

function drawEndLine() {
    const outerArcRadius = 256;
    const innerArcRadius = 128;
    const center = 316;

    var degPerUnit;
    var degToEndLinePosition;

    // Get the number of degrees we need to rotate to get to the final week, if 60 units are split between 360 degrees
    var weeks = getWeeksInYear(selectedYear.value);
    degPerUnit = 360 / 60;
    degToEndLinePosition = (degPerUnit * (weeks - 1)) * (Math.PI / 180); // In radians

    var x1 = center + outerArcRadius * Math.sin(degToEndLinePosition);
    var y1 = outerArcRadius - (outerArcRadius * Math.cos(degToEndLinePosition)) + 60; // 60 = Y offset

    var x2 = center + innerArcRadius * Math.sin(degToEndLinePosition);
    var y2 = innerArcRadius - (innerArcRadius * Math.cos(degToEndLinePosition)) + 188;

    startLineCoordinates.value = { x1: center, y1: 60, x2: center, y2: 188 }
    endLineCoordinates.value = { x1: x1, y1: y1, x2: x2, y2: y2 };
}

function getWeeksInYear(year) {
    var d = new Date(year, 11, 31);
    var week = getWeekNumber(d);
    return week == 1 ? 52 : week;
}

function getWeekNumber(date) {
    var date = new Date(+date);
    date.setHours(0, 0, 0, 0);

    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    // January 4 is always in week 1.
    var week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
        - 3 + (week1.getDay() + 6) % 7) / 7);
}

class JobTrackState {
    constructor(state) {
        this.state = state;
    }

    stateStart() {
        this[start]()
    }

    stateEnd() {

    }

    animating() {
        this.stateEnd();
    }

    interactive() {
        this.stateEnd();
    }
}

function exitFullscreen() {
    setTimeout(() => {
        channel.publish("exitFullscreen");
    }, 0)
}

function selectYear(year) {
    selectedYear.value = year;
    draw();
    redraw();
}

function selectWeek(week, weekSelector) {
    if (weekSelector === 1)
        selectedWeek1.value = week;
    else if (weekSelector === 2)
        selectedWeek2.value = week;
}

</script>

<style scoped>
.demo-cont {
    width: 100%;
    height: 100%;
    display: flex;
}

/* --- start side-panel --- */

.side-panel {
    width: 300px;
    height: 100%;
    background: white;
    display: flex;
    flex-direction: column;
}

.side-panel .reset-anim-btn {
    width: 100px;
    height: 36px;
    background: orange;
    border-radius: 18px;
    margin: auto 0px 36px 36px;
    cursor: pointer;
}

/* --- end side panel --- */

/* --- start sun burst diagram  */
.sun-burst-svg {
    background: white;
}

.arc,
.start-line,
.end-line {
    stroke: #bcbcbc;
}

.arc {
    animation: draw 1.5s forwards ease-in-out;
}

@keyframes draw {
    to {
        stroke-dashoffset: 0;
    }
}

svg g .sun-ray {
    transition: fill .3s;
    pointer-events: auto;
}

svg g .sun-ray.selected {
    fill: #ffb401 !important;
}

svg g .sun-ray:hover {
    fill: #fe6c00 !important;
}

/* --- end sun burst diagram --- */
</style>