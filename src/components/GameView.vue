<script setup>
import { computed, ref } from "vue";

var props = defineProps({
    image: String,
    title: String,
    description: String,
    interactiveImg: Boolean
})

const fullscreen = ref(false);


function back() {

}

function topLeftCornerClick() {
    fullscreen.value = !fullscreen.value;
}

</script>

<template>
<div class="game-view">
    <div class="top-left-corner" v-bind:class="{ 'interactive': props.interactiveImg, 'fullscreen': fullscreen }" @click="topLeftCornerClick">
        <img v-bind:src="props.image"/>
    </div>
    <div class="main-content">
        <div class="top-left-corner-space"></div>
        <div class="header">
            <div class="title">{{ props.title }}</div>
        </div>
        <div class="description"> {{ props.description }}</div>
    </div>
</div>
</template>

<style scoped>

.game-view {
    width: 100%;
    height: 100%;
    display: flex;
    position: relative;
}

.top-left-corner {
    width: 40%;
    height: 30%;
    top: 0px;
    left: 0px;
    border: 1px solid white;
    position: absolute;
    background-color: black;
    transition: width .3s, height .3s;
}

.top-left-corner.interactive {
    cursor: pointer;
}

.top-left-corner.fullscreen {
    width: 100%;
    height: 100%;
}

.top-left-corner-space {
    width: 40%;
    height: 30%;
    display: inline-block;
}

.top-left-corner img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.main-content {
    overflow-y: auto;
}

.main-content .header {
    vertical-align: top;
    display: inline-block;
    width: 60%;
    height: 30%;
    justify-content: center;
}

.header .title {
    display: flex;
    justify-content: center;
}

.main-content .description {
    font-size: 24px;
    padding: 16px;
}

::-webkit-scrollbar {
    width: 8px;
}

::-webkit-scrollbar-thumb {
    background-color: #7c7c7c;
    border-radius: 4px;
    
}

::-webkit-scrollbar-thumb:hover {
    background-color:#464646;
}

</style>