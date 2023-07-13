<template>
    <div class="filter-panel">
        <div class="title">FILTER BY</div>
        <div class="selection-cont selection-1" id="selection-1">
            <div class="selection-color-cont">
                <div class="selection-color"></div>
            </div>
            <div class="selection-btn" @click="() => toggleSelectionWindow(1)"
                v-bind:class="{ focused: state.selectionWindow1Open }">
                <div class="selection-text">YEAR {{ props.selectedYear }}</div>
            </div>
            <div class="selection-window" v-bind:class="{ open: state.selectionWindow1Open }">
                <div class="close-btn" @click="toggleSelectionWindow(1)">
                    <svg width="100%" height="100%" viewBox="0 0 100 100">
                        <line x1="0" y1="0" x2="100" y2="100"></line>
                        <line x1="100" y1="0" x2="0" y2="100"></line>
                    </svg>
                </div>
                <div class="item-row-cont">
                    <div class="item-row" v-for="item in state.selectionWindow1Items"
                        :class="{ 'selected': item === props.selectedYear }" @click="selectYear(item)">{{ item }}
                        <div class="dot"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="selection-cont selection-2" id="selection-2">
            <div class="selection-color-cont">
                <div class="selection-color"></div>
            </div>
            <div class="selection-btn" @click="() => toggleSelectionWindow(2)"
                v-bind:class="{ focused: state.selectionWindow2Open }">
                <div class="selection-text">{{ selectedWeek1Text }}</div>
            </div>
            <div class="selection-window" v-bind:class="{ open: state.selectionWindow2Open }">
                <div class="close-btn" @click="toggleSelectionWindow(2)">
                    <svg width="100%" height="100%" viewBox="0 0 100 100">
                        <line x1="0" y1="0" x2="100" y2="100"></line>
                        <line x1="100" y1="0" x2="0" y2="100"></line>
                    </svg>
                </div>
                <div class="item-row-cont">
                    <div class="item-row" v-for="item in state.selectionWindow2Items" @click="selectWeek(item.value, 1)"
                        v-bind:class="{ selected: item.selected }">{{
                                item.display
                        }}
                        <div class="dot" :style="{ background: item.activeColor }"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="selection-cont selection-3" id="selection-3">
            <div class="selection-color-cont">
                <div class="selection-color"></div>
            </div>
            <div class="selection-btn" @click="toggleSelectionWindow(3)">
                <div class="selection-text">{{ selectedWeek2Text }}</div>
            </div>
            <div class="selection-window" v-bind:class="{ open: state.selectionWindow3Open }">
                <div class="close-btn" @click="toggleSelectionWindow(3)">
                    <svg width="100%" height="100%" viewBox="0 0 100 100">
                        <line x1="0" y1="0" x2="100" y2="100"></line>
                        <line x1="100" y1="0" x2="0" y2="100"></line>
                    </svg>
                </div>
                <div class="item-row-cont">
                    <div class="item-row" v-for="item in state.selectionWindow3Items" @click="selectWeek(item.value, 2)"
                        v-bind:class="{ selected: item.selected }">{{
                                item.display
                        }}
                        <div class="dot" :style="{ background: item.activeColor }"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, computed, onUnmounted, watch } from "vue";
import postal from "postal";

const channel = postal.channel("Notifications");
const props = defineProps({
    selectedYear: Number,
    selectedWeek1: Number,
    selectedWeek2: Number,
    currentWeek: Number,

    jusPerYear: Object,

    accentBlue: String,
    accentOrange: String,
    gray: String
})

var prevYear = props.selectedYear;

const state = reactive({
    selectionWindow1Open: false,
    selectionWindow2Open: false,
    selectionWindow3Open: false,

    selectionWindow1Items: setYearOptions(),
    selectionWindow2Items: [],
    selectionWindow3Items: []
})

var selectionItems = setByWeekOptions();
state.selectionWindow2Items = selectionItems;
state.selectionWindow3Items = selectionItems;

const selectedWeek1Text = computed(() => {
    return props.selectedWeek1 ? 'WEEK ' + padWithZeros(props.selectedWeek1, 2) : '';
})

const selectedWeek2Text = computed(() => {
    return props.selectedWeek2 ? 'WEEK ' + padWithZeros(props.selectedWeek2, 2) : '';
})


onMounted(() => {
    setOffClickEvents();
})

watch(props, (newProps) => {
    // Update week options if selected year has changed
    if (newProps.selectedYear !== prevYear) {
        selectionItems = setByWeekOptions();

        state.selectionWindow2Items = selectionItems;
        state.selectionWindow3Items = selectionItems;

        prevYear = newProps.selectedYear;
    }
});

function setYearOptions() {
    return Object.keys(props.jusPerYear).reverse().map((x) => Number.parseInt(x));
}

function toggleSelectionWindow(num) {
    var openState = state[`selectionWindow${num}Open`];
    state[`selectionWindow${num}Open`] = !openState;
}

function selectYear(year) {
    channel.publish("selectYear", year);
}

function selectWeek(week, weekSelector) {
    const weeks = state.selectionWindow2Items;

    const weekNum = weekSelector === 1 ? props.selectedWeek1 : props.selectedWeek2;

    const currentSelectedWeek = weeks.find((x) => x.value === weekNum);
    const selectedWeek = weeks.find((x) => x.value === week);

    if (currentSelectedWeek) {
        currentSelectedWeek.selected = false;
        currentSelectedWeek.activeColor = null;
    }

    if (selectedWeek.value) {
        selectedWeek.selected = true;

        if (weekSelector === 1) {
            selectedWeek.activeColor = props.accentOrange;
        } else {
            selectedWeek.activeColor = props.accentBlue;
        }
    }

    channel.publish("selectWeek", { week: week, weekSelector: weekSelector });
}

function setByWeekOptions() {
    let avOps = [];
    const { selectedYear, selectedWeek1, selectedWeek2 } = props;

    var currentWeekDate = new Date();
    var currentWeekNum = getWeekNumber(currentWeekDate);

    avOps.push({ display: "NOT SPECIFIED", selected: false, activeColor: null, value: null });

    var currentYear = (new Date()).getFullYear();
    var weeks;

    if (selectedYear === currentYear) {
        // Note: first day of the week in this case is Monday
        var startOfWeekDate = new Date(currentWeekDate);
        startOfWeekDate.setDate(startOfWeekDate.getDate() - (startOfWeekDate.getDay() - 1));
        var endOfWeekDate = new Date(startOfWeekDate);
        endOfWeekDate.setDate(endOfWeekDate.getDate() + (7 - endOfWeekDate.getDay()));

        const startOfWeek = getMonthDayYearFromIso(startOfWeekDate.toISOString()).substring(0, 5);
        const endOfWeek = getMonthDayYearFromIso(endOfWeekDate.toISOString()).substring(0, 5);

        avOps.push(
            {
                display: `THIS WEEK ${startOfWeek} - ${endOfWeek}`,
                activeColor: selectedWeek1 === currentWeekNum ? props.accentOrange : null,
                buttonDisplay: `WEEK ${currentWeekNum}`,
                value: currentWeekNum,
                selected: selectedWeek1 === currentWeekNum
            });
        weeks = currentWeekNum - 1;
    } else {
        weeks = getWeeksInYear(selectedYear);
    }


    var date = new Date(selectedYear, 0, 1);
    var firstWeekOfYear = getWeekNumber(date);
    // If first week of the year counts as week 52 or 53 of last year, move to next week
    if (firstWeekOfYear === 52 || firstWeekOfYear === 53) {
        date.setDate(date.getDate() + (8 - date.getDay()));
    }

    for (var i = 0; i < weeks; i++) {
        var weekNum = getWeekNumber(date);
        var startOfWeekDate = new Date(date);
        var startOfWeek = getMonthDayYearFromIso(startOfWeekDate.toISOString()).substring(0, 5);

        var endOfWeekDate = new Date(startOfWeekDate);
        endOfWeekDate.setDate(endOfWeekDate.getDate() + (7 - endOfWeekDate.getDay()));
        var endOfWeek = getMonthDayYearFromIso(endOfWeekDate.toISOString()).substring(0, 5);

        avOps.push({
            display: `WEEK ${padWithZeros(weekNum, 2)} ${startOfWeek} - ${endOfWeek}`,
            activeColor: selectedWeek1 === currentWeekNum ? props.accentOrange : null,
            value: weekNum,
            selected: selectedWeek1 === weekNum
        });

        // Increment date to next week
        date.setDate(date.getDate() + (8 - date.getDay()));
    }

    return avOps;
}

function getMonthDayYearFromIso(isoDate) {
    if (!isoDate) return null;

    isoDate = isoDate.substring(0, isoDate.indexOf('T'));

    var dateParts = isoDate.split('-');
    var month = dateParts[1];
    var day = dateParts[2];
    var year = dateParts[0];

    return `${month}/${day}/${year}`;
}

function getWeekNumber(date) {
    date = new Date(+date);
    date.setHours(0, 0, 0, 0);

    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    // January 4 is always in week 1.
    var week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
        - 3 + (week1.getDay() + 6) % 7) / 7);
}

// Move to "util" file?
function getWeeksInYear(year) {
    var d = new Date(year, 11, 31);
    var week = getWeekNumber(d);
    return week == 1 ? 52 : week;
}

function padWithZeros(num, digits) {
    var s = num + "";
    while (s.length < digits) s = "0" + s;
    return s;
}

function setOffClickEvents() {
    const selection1El = document.getElementById('selection-1');
    const selection2El = document.getElementById('selection-2');
    const selection3El = document.getElementById('selection-3');

    document.addEventListener('click', function (event) {
        const isClickInside1 = selection1El.contains(event.target as any);
        const isClickInside2 = selection2El.contains(event.target as any);
        const isClickInside3 = selection3El.contains(event.target as any);

        if (!isClickInside1) {
            state.selectionWindow1Open = false;
        }

        if (!isClickInside2) {
            state.selectionWindow2Open = false;
        }

        if (!isClickInside3) {
            state.selectionWindow3Open = false;
        }
    })
}

onUnmounted(() => {
    // Dispose Click events
})

</script>

<style scoped>
.filter-panel {
    width: 120px;
    height: 160px;
    border-radius: 18px;
    background: #e1e1e1;
    margin: 8px 0px 0px 8px;
    padding: 16px;
    font-size: 12px;
}

.filter-panel .title {
    color: black;
    height: 20px;
    display: flex;
    align-items: center;
    margin-bottom: 8px;
}

.filter-panel .selection-cont {
    display: flex;
    height: 32px;
    margin-bottom: 8px;
    position: relative;
}

.selection-cont .selection-color-cont {
    height: 24px;
    width: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.selection-color-cont .selection-color {
    height: 8px;
    width: 8px;
    border-radius: 4px;
}

.selection-cont .selection-btn {
    width: 116px;
    height: 24px;
    border-radius: 18px;
    background-color: white;
    cursor: pointer;
    transition: background-color .2s;
    display: flex;
    align-items: center;
    padding: 12px 8px;
}

.selection-text {
    color: black;
    white-space: nowrap;
}

.selection-btn:hover,
.selection-btn.focused {
    color: white;
    background-color: black;
}

.selection-btn:hover .selection-text,
.selection-btn.focused .selection-text {
    color: white;
}

.selection-1 .selection-color {
    background-color: #c1c1c1;
}

.selection-2 .selection-color {
    background-color: #ffb401;
}

.selection-3 .selection-color {
    background-color: #00cbfd;
}

.selection-window {
    position: absolute;
    border-radius: 18px;
    background: black;
    left: 100px;
    transition: transform .2s, opacity .2s;
    z-index: 1;
    padding: 8px 8px 16px 26px;
    display: flex;
    flex-flow: column;
    opacity: 0;
    display: none;
}

.selection-window .close-btn {
    width: 16px;
    height: 16px;
    stroke: white;
    stroke-width: 8px;
    margin: 0px 8px 8px auto;
    opacity: .5;
    cursor: pointer;
}

.close-btn:hover {
    opacity: 1;
}

.selection-1 .selection-window {
    width: 200px;
}

.selection-2 .selection-window,
.selection-3 .selection-window {
    width: 224px;
}

.item-row-cont {
    width: 100%;
    max-height: 200px;
    overflow-y: auto;
}

.selection-window.open {
    opacity: 1;
    display: block;
    animation: window-anim .2s forwards;
}

@keyframes window-anim {
    0% {
        opacity: 0;
        transform: translateX(-16px);
    }
    100% {
        opacity: 1;
        transform: translateX(0px);
    }
}

.selection-window .item-row {
    height: 24px;
    display: flex;
    align-items: center;
    cursor: pointer;
}

.item-row:hover,
.item-row.selected {
    color: white;
}

.item-row .dot {
    width: 6px;
    height: 6px;
    border-radius: 3px;
    background: white;
    margin: 0px 16px 0px auto;
    display: none;
}

.item-row:hover .dot {
    display: block;
    opacity: .5;
}

.selection-2 .selection-window .item-row:hover .dot {
    background: #ffb401;
}

.selection-3 .selection-window .item-row:hover .dot {
    background: #00cbfd !important;
}

.item-row.selected .dot {
    display: block;
    opacity: 1;
}

.item-row.selected {
    pointer-events: none;
}

::-webkit-scrollbar {
    width: 8px;
}

::-webkit-scrollbar-thumb {
    background-color: #7c7c7c;
    border-radius: 4px;
    display: block;
}

::-webkit-scrollbar-thumb:hover {
    background-color: #464646;
}

/* --- start media queries --- */
@media screen and (min-width: 1180px) {
    .filter-panel {
        width: 160px;
        height: 208px;
        margin: 36px 0px 0px 36px;
        font-size: 14px;
    }

    .filter-panel .title {
        margin-bottom: 20px;
        margin-left: 24px;
    }

    .filter-panel .selection-cont {
        margin-bottom: 16px;
    }

    .selection-cont .selection-color-cont {
        height: 32px;
    }

    .selection-cont .selection-btn {
        height: 32px;
    }

    .selection-window {
        left: 160px;
    }

    .selection-2 .selection-window,
    .selection-3 .selection-window {
        width: 300px;
        transform: translate(-230px, -170px) scale(0);
    }

    .selection-window.open {
        transform: translate(0, 0) scale(1);
    }

    .item-row-cont {
        max-height: 300px;
    }
}

/* --- end media queries --- */
</style>