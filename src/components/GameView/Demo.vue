<template>
    <svg viewBox="0 0 632 632" height="100%" style="background-color: white;" :key="componentKey">
        <!-- grid lines -->
        <g>
            <path class="arc" id="arc-1" v-for="arc in arcs" v-bind:d="arc.d"
            :style="{ 'stroke-dasharray': arc.strokeDashArray, 'stroke-dashoffset': arc.strokeDashOffset }" stroke="black"
            stroke-width="1" fill="none"></path>
        </g>

        <!-- units -->
        <g v-for="ray in sunRays">
            <!-- <path class="sun-ray" v-bind="{ d: ray.d, transform: ray.rotation, fill: ray.fill}"></path> -->
            <!-- <circle v-bind="{ r: 4, cx: ray.cx, cy: ray.cy, transform: ray.rotation }"></circle> -->
            <rect class="sun-ray" height="8" v-bind="{ x: ray.cx, y: ray.cy, transform: ray.rotation, fill: ray.fill }">
                <animate attributeType="CSS" attributeName="width" v-bind="{ from: '0', to: `${ray.units}`, begin: `${ray.animationDelay}s`}" dur="2s" fill="freeze"></animate>
                <animate attributeType="CSS" attributeName="opacity" v-bind="{ from: 0, to: 1, begin: `${ray.animationDelay}s`}" dur="2s" fill="freeze"></animate>
            </rect>
        </g>
    </svg>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
const state = reactive({
    demoState: null
})

const arcs = ref([]);
const sunRays = ref([]);
const componentKey = ref(0);

const jobTrackStates = {
    animating: "animating",
    interactive: "interactive"
}

onMounted(() => {
    drawArc();
    drawRays();
})

function redraw() {
    componentKey.value = componentKey.value + 1;

    setTimeout(() => {
    redraw();
}, 5000)
}

setTimeout(() => {
    redraw();
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
    const weeks = getWeeksInYear(2022);

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
    const weeks = getWeeksInYear(2022);
    const degToLastUnit = (degPerUnit * (weeks - 1)) * (Math.PI / 180); // In radians

    var x;
    var y;
    var l;
    var radius = 96; // Distance from center of circle. Should make radius of largest circle a global and derive from there...

    for (var i = 0; i < totalSlots; i++) {
        var deg = i * degPerUnit * (Math.PI / 180); // Number of degrees to rotate, then converted to radians
        x = center + radius * Math.sin(deg); // x offset
        y = radius - radius * Math.cos(deg) + 220; // 220 = Y offset

        l = Math.random() * 100;
        var delay = deg / degToLastUnit;
        console.log(delay);

        var ray = {
            d: `M ${x - rayRadius} ${y}
                L ${x - rayRadius} ${y - l}
                A 4 4 0 0 1 ${x + rayRadius} ${y - l}
                L ${x + rayRadius} ${y}
                A 4 4 0 0 1 ${x - rayRadius} ${y}`,
            rotation: `rotate(${i * degPerUnit - 90} ${x} ${y})`,
            cx: x,
            cy: y,
            fill: 'gray',
            units: l,
            animationDelay: delay
        }

        rays.push(ray);
    }

    sunRays.value = rays;
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




</script>

<style scoped>
svg .arc {
    animation: draw 2s forwards linear;
}

/* .animate {
    animation: draw 1s forwards ease-in-out;
} */

@keyframes draw {
    to {
        stroke-dashoffset: 0;
    }
}

svg g .sun-ray {
}



</style>