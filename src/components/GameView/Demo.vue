<template>
    <div class="demo-cont">
        <div class="side-panel">
            <FilterPanel v-bind="filterPanelParams"></FilterPanel>
            <div class="back-btn" @click="exitFullscreen">BACK</div>
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

            <!-- legend lines -->
            <g class="legend-lines">
                <g v-for="line in legendLines">
                    <line class="legend-line" v-bind="{ x1: line.x1, x2: line.x2, y1: line.y, y2: line.y }"></line>
                    <circle v-bind="{ cx: line.x1, cy: line.y, r: 3 }"></circle>
                    <text dominant-baseline="middle" text-anchor="end" v-bind="{ x: line.x1 - 8, y: line.y }">{{
                            line.text
                    }}</text>
                </g>
            </g>

            <!-- sun rays -->
            <g v-for="(ray, index) in sunRays">
                <rect class="sun-ray" height="8"
                    v-bind="{ x: ray.cx - 4, y: ray.cy - 4, transform: ray.rotation, fill: ray.fill, rx: 4 }">
                    <animate attributeType="CSS" attributeName="width"
                        v-bind="{ from: '0', to: `${ray.l}`, begin: `${ray.animationDelay}s` }" dur=".5s" fill="freeze">
                    </animate>
                    <animate attributeType="CSS" attributeName="opacity"
                        v-bind="{ from: 0, to: 1, begin: `${ray.animationDelay}s` }" dur=".5s" fill="freeze"></animate>

                </rect>
                <circle r="4" opacity="0" fill="black" v-bind="{ cx: ray.cx, cy: ray.cy, transform: ray.rotation }">
                    <animate attributeType="CSS" attributeName="cx"
                        v-bind="{ from: ray.cx, to: `${ray.cx + ray.l - 8}`, begin: `${ray.animationDelay}s` }"
                        dur=".5s" fill="freeze"></animate>
                    <animate attributeType="CSS" attributeName="opacity"
                        v-bind="{ from: 0, to: 1, begin: `${ray.animationDelay}s` }" dur=".5s" fill="freeze"></animate>
                </circle>
            </g>

            <!-- center text -->
            <g class="center-text" v-if="centerText">
                <animate attributeType="CSS" attributeName="opacity" from="0" to="1" dur="1.5s" fill="freeze"></animate>


                <path id="upper-curve" v-bind="{ d: centerText.topTextPath }" fill="none"></path>
                <path id="lower-curve" v-bind="{ d: centerText.bottomTextPath }" fill="none"></path>
                <text>
                    <textPath text-anchor="middle" startOffset="50%" xlink:href="#upper-curve">{{ centerText.topText }}
                    </textPath>
                    <textPath dominant-baseline="hanging" text-anchor="middle" startOffset="50%"
                        xlink:href="#lower-curve">
                        <tspan class="ju-used">{{ `${JUUsed} JU USED OF ${1000 * 52}` }}</tspan>
                    </textPath>


                </text>

                <g class="ju-used-cont">
                    <g class="selected-unit-1" v-if="centerText.text1">
                        <circle class="selected-unit-color" r="4"
                            v-bind="{ cx: centerText.cx, cy: centerText.cy1, fill: centerText.fill1 }"></circle>
                        <text>
                            <tspan class="center" dominant-baseline="middle" text-anchor="end"
                                v-bind="{ x: centerText.cx + 76, y: centerText.cy1 }">{{ centerText.text1 }}</tspan>
                            <tspan class="units" dominante-baseline="middle"
                                v-bind="{ x: centerText.cx + 82, y: centerText.cy1 }">JU</tspan>
                        </text>
                    </g>
                    <g class="selected-unit-2" v-if="centerText.text2">
                        <circle class="selected-unit-color" r="4"
                            v-bind="{ cx: centerText.cx, cy: centerText.cy2, fill: centerText.fill2 }"></circle>
                        <text>
                            <tspan class="center" dominant-baseline="middle" text-anchor="end"
                                v-bind="{ x: centerText.cx + 76, y: centerText.cy2 }">{{ centerText.text2 }}</tspan>
                            <tspan class="units" dominante-baseline="middle"
                                v-bind="{ x: centerText.cx + 82, y: centerText.cy2 }">JU</tspan>
                        </text>
                    </g>
                </g>
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
const legendLines = ref([]);
const centerText = ref(null);
const componentKey = ref(0);
const endLineCoordinates = ref(null);
const startLineCoordinates = ref(null);
const selectedYear = ref((new Date()).getFullYear());
const yearCount = 3;
const currentWeek = ref(getWeekNumber(new Date()));
const selectedWeek1 = ref(currentWeek.value);
const selectedWeek2 = ref();
const maxJobUnitLine = 1000;
const jusPerYear = ref(getJUsPerYear());
const JUUsed = ref(Math.floor(jusPerYear.value[selectedYear.value].reduce((sum, a) => sum + a, 0)));

// --- positioning --- //
const offsetFromTop = 60;
const center = 316;

// --- colors --- //
const accentBlue = '#00cbfd';
const accentOrange = '#ffb401';
const gray = '#c1c1c1';

const filterPanelParams = reactive({
    selectedYear: selectedYear,
    selectedWeek1: selectedWeek1,
    selectedWeek2: selectedWeek2,
    currentWeek: currentWeek,

    jusPerYear: jusPerYear,

    accentBlue: accentBlue,
    accentOrange: accentOrange,
    gray: gray
})

onMounted(() => {
    draw();
})

function draw() {
    drawArc();
    drawRays();
    drawEndLine();
    drawLegendLines();
    drawCenterText();
}

function redraw() {
    componentKey.value = componentKey.value + 1;
}

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
    var rays = [];
    const totalSlots = 60;
    const degPerUnit = 360 / totalSlots;
    const rayRadius = 4;
    const weekCount = selectedYear.value === (new Date()).getFullYear() ? currentWeek.value : getWeeksInYear(selectedYear.value);
    const degToLastUnit = (degPerUnit * (weekCount)) * (Math.PI / 180); // In radians
    const maxLength = 32 * 5;

    var x;
    var y;
    var l;
    var radius = 96; // Distance from center of circle. Should make radius of largest circle a global and derive from there...
    var delayStagger = 0;

    for (var i = 0; i < weekCount; i++) {
        var deg = i * degPerUnit * (Math.PI / 180); // Number of degrees to rotate, then converted to radians
        x = center + radius * Math.sin(deg); // x offset
        y = radius - radius * Math.cos(deg) + 220; // 220 = Y offset

        const jobUnit = jusPerYear.value[selectedYear.value][i]
        l = (jobUnit / maxJobUnitLine) * maxLength;

        var delay = deg / degToLastUnit;

        // Note: weeks start from 1, index i starts from 0
        const fill = selectedWeek1.value === i + 1 ? accentOrange :
            selectedWeek2.value === i + 1 ? accentBlue : gray;

        var ray = {
            rotation: `rotate(${i * degPerUnit - 90} ${x} ${y})`,
            cx: x,
            cy: y,
            fill: ref(fill),
            l: l < 8 ? 8 : l,
            units: l,
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

function drawLegendLines() {
    var lines = [];
    var lineDistance = maxJobUnitLine / 5;
    const distanceToNextLine = 32;
    const lineWidth = 280;

    for (var i = 0; i < 5; i++) {
        lines.push(
            {
                width: lineWidth,
                x1: center - lineWidth,
                x2: center,
                y: offsetFromTop + distanceToNextLine * i,
                text: "" + (maxJobUnitLine - lineDistance * i)
            });
    }

    legendLines.value = lines;
}

function drawCenterText() {
    var x;
    var y;
    var x2;
    var r = 78;
    var radians = 54 * (Math.PI / 180);

    var topTextPath;
    var bottomTextPath;
    var topText = "WEEKLY JOB UNITS USAGE";

    x = center - (r * Math.sin(radians));
    y = r - (r * Math.cos(radians)) + 238; // 238 = offset from the top
    x2 = center + (r * Math.sin(radians));

    // Top text
    topTextPath = `M ${x} ${y} A ${r} ${r} 0 0 1 ${x2} ${y}`;

    // Bottom text
    y = 394 - (r - (r * Math.cos(radians))); // 394 = offset from the top, starting at the bottom of the circle
    bottomTextPath = `M ${x} ${y} A ${r} ${r} 0 0 0 ${x2} ${y}`;

    // Get placement for circles and middle text
    var cx = center - 60;
    var cy1;
    var cy2;

    if (selectedWeek1.value && selectedWeek2.value) {
        cy1 = center - 15;
        cy2 = center + 15;
    } else if (selectedWeek1.value) {
        cy1 = center;
    } else if (selectedWeek2.value) {
        cy2 = center;
    }

    const selectedWeek1JUs = jusPerYear.value[selectedYear.value][selectedWeek1.value - 1];
    const selectedWeek2JUs = jusPerYear.value[selectedYear.value][selectedWeek2.value - 1];

    centerText.value = {
        topText: topText,
        topTextPath: topTextPath,
        bottomTextPath: bottomTextPath,
        cx: cx,
        cy1: ref(cy1),
        cy2: ref(cy2),
        fill1: accentOrange,
        fill2: accentBlue,
        text1: ref(selectedWeek1JUs ? Math.floor(selectedWeek1JUs) : null),
        text2: ref(selectedWeek2JUs ? Math.floor(selectedWeek2JUs) : null)
    };
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
    const selectedWeekRef = weekSelector === 1 ? selectedWeek1 : selectedWeek2;
    const fillColor = weekSelector === 1 ? accentOrange : accentBlue;

    if (!week) {
        if (!selectedWeekRef.value)
            return;

        const currentRay = sunRays.value[selectedWeekRef.value - 1];
        currentRay.fill = gray;
        selectedWeekRef.value = null;

    } else {
        const currentRay = sunRays.value[selectedWeekRef.value - 1];
        const selectedRay = sunRays.value[week - 1];
        selectedWeekRef.value = week;

        if (currentRay)
            currentRay.fill = gray;
        selectedRay.fill = fillColor;
    }

    updateCenterText(week, weekSelector);
}

function updateCenterText(week, weekSelector) {
    const jobUnits = jusPerYear.value[selectedYear.value][week - 1];
    var cy1;
    var cy2;

    if (selectedWeek1.value && selectedWeek2.value) {
        cy1 = center - 15;
        cy2 = center + 15;
    } else if (selectedWeek1.value) {
        cy1 = center;
    } else if (selectedWeek2.value) {
        cy2 = center;
    }

    if (!week) {
        if (weekSelector === 1) {
            centerText.value.text1 = null;

        } else {
            centerText.value.text2 = null;
        }
    } else {
        if (weekSelector === 1) {
            centerText.value.text1 = Math.floor(jobUnits);
        } else {
            centerText.value.text2 = Math.floor(jobUnits);
        }
    }

    centerText.value.cy1 = cy1;
    centerText.value.cy2 = cy2;
}

function getJUsPerYear() {
    var retVal = {};
    for (var year = selectedYear.value; year > selectedYear.value - 3; year--) {
        retVal[year] = generateJUs(year)
    }

    return retVal;
}

function generateJUs(year) {
    var retVal = [];
    const weekCount = year === (new Date()).getFullYear() ? currentWeek.value : getWeeksInYear(year);

    for (var i = 0; i < weekCount; i++) {
        retVal.push(Math.random() * maxJobUnitLine);
    }

    return retVal;
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

.side-panel .back-btn {
    width: 100px;
    height: 36px;
    background: #fe6c00;
    border-radius: 18px;
    margin: auto 0px 36px 36px;
    cursor: pointer;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color .2s;
}

.back-btn:hover {
    background: black;
}

/* --- end side panel --- */

/* --- start sun burst diagram  */
.sun-burst-svg {
    background: white;
}

.arc,
.start-line,
.end-line,
.legend-line {
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

svg g .sun-ray:hover {
    fill: #fe6c00 !important;
}

.legend-lines circle {
    fill: #bcbcbc;
}

.legend-lines text {
    font-size: 12px;
    fill: #bcbcbc;
}

.center-text text {
    font-size: 10px;
}

.center-text .ju-used-cont text {
    font-size: 20px;
}

/* --- end sun burst diagram --- */
</style>