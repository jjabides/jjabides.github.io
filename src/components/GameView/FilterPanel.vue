<template>
    <div class="filter-panel">
        <div class="title">FILTER BY</div>
        <div class="selection-cont selection-1">
            <div class="selection-color-cont">
                <div class="selection-color"></div>
            </div>
            <div class="selection-btn" @click="() => toggleSelectionWindow(1)"
                v-bind:class="{ focused: state.selectionWindow1Open }">
                <div class="selection-text">YEAR {{ props.selectedYear }}</div>
            </div>
            <div class="selection-window" v-bind:class="{ open: state.selectionWindow1Open }">
                <div class="item-row" v-for="item in state.selectionWindow1Items" @click="selectYear(item)">{{ item }}
                </div>
            </div>
        </div>
        <div class="selection-cont selection-2">
            <div class="selection-color-cont">
                <div class="selection-color"></div>
            </div>
            <div class="selection-btn" @click="() => toggleSelectionWindow(2)"
                v-bind:class="{ focused: state.selectionWindow2Open }">
                <div class="selection-text">{{ selectedWeek1Text }}</div>
            </div>
            <div class="selection-window" v-bind:class="{ open: state.selectionWindow2Open }">
                <div class="item-row-cont">
                    <div class="item-row" v-for="item in state.selectionWindow2Items" @click="selectWeek(item.value, 1)"
                        v-bind:class="{ selected: item.value === props.selectedWeek1 }">{{
                                item.display
                        }}</div>
                </div>
            </div>
        </div>
        <div class="selection-cont selection-3">
            <div class="selection-color-cont">
                <div class="selection-color"></div>
            </div>
            <div class="selection-btn"></div>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, onMounted, computed } from "vue";
import postal from "postal";

const channel = postal.channel("Notifications");
const props = defineProps({
    selectedYear: Number,
    selectedWeek1: Number,
    selectedWeek2: Number,
    currentWeek: Number
})

const state = reactive({
    selectionWindow1Open: false,
    selectionWindow2Open: false,
    selectionWindow3Open: false,

    selectionWindow1Items: setYearOptions(),
    selectionWindow2Items: setByWeekOptions()
})

const selectedWeek1Text = computed(() => {
    return props.selectedWeek1 ? 'WEEK ' + padWithZeros(props.selectedWeek1 , 2): '';
})

function setYearOptions() {
    let currentYear = props.selectedYear;
    var retVal = [];
    for (var i = 0; i < 3; i++) {
        retVal.push(currentYear);
        currentYear--;
    }

    return retVal;
}

function toggleSelectionWindow(num) {
    var openState = state[`selectionWindow${num}Open`];
    state[`selectionWindow${num}Open`] = !openState;
}

function selectYear(year) {
    channel.publish("selectYear", year);
}

function selectWeek(week, weekSelector) {
    channel.publish("selectWeek", { week: week, weekSelector: weekSelector });
}

function setByWeekOptions() {
    var avOps = [];
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
                activeColor: null,
                buttonDisplay: `WEEK ${currentWeekNum}`,
                value: currentWeekNum
            });
        weeks = currentWeekNum - 1;
    } else {
        weeks = getWeeksInYear(selectedYear) - 1;
    }


    var date = new Date(selectedYear, 0, 1);

    // If first week of the year counts as week 52 of last year, move to next week
    if (getWeekNumber(date) === 52) {
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
            activeColor: null,
            value: weekNum
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

</script>

<style scoped>
.filter-panel {
    width: 160px;
    height: 208px;
    border-radius: 18px;
    background: #e1e1e1;
    margin: 36px 0px 0px 36px;
    padding: 16px;
}

.filter-panel .title {
    color: black;
    height: 20px;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    margin-left: 24px;
}

.filter-panel .selection-cont {
    display: flex;
    height: 32px;
    margin-bottom: 16px;
    position: relative;
}

.selection-cont .selection-color-cont {
    height: 32px;
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
    height: 32px;
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
    left: 160px;
    transition: transform .2s;
    z-index: 1;
    padding: 16px 8px 16px 26px;
}

.selection-1 .selection-window {
    width: 200px;
    transform: translate(-176px, -52px) scale(0);
}

.selection-2 .selection-window {
    width: 300px;
    transform: translate(-176px, -150px) scale(0);
}

.item-row-cont {
    width: 100%;
    max-height: 300px;
    overflow-y: auto;
}

.selection-window.open {
    transform: translate(0, 0) scale(1);
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
</style>