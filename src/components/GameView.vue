<script setup>
import {  ref, reactive, computed } from "vue";
import resources from "./resources";
import ImageCarousel from "./ImageCarousel.vue";
import postal from "postal";
import $ from "jquery";

var props = defineProps({
    images: Array,
    title: String,
    descriptionUrl: String,
    interactiveImg: Boolean,
    links: Array
})

const description = ref("");
const fullscreen = ref(false);
const topLeftCornerId = "top-left-corner";

const imageCarouselProps = reactive({
    images: props.images,
    topLeftCornerId,
    fullscreen,
})

// Get description file
$.ajax({
    async: false,
    url: props.descriptionUrl,
    dataType: 'text',
    success: (text) => {
        description.value = text;
    }
})

function back() {
    var message = {
        view: resources.views.cartridgesManager,
    }

    var channel = postal.channel("Notifications");
    channel.publish("selectView", message);
}

function topLeftCornerClick() {
    fullscreen.value = !fullscreen.value;
}

</script>

<template>
<div class="game-view">
    <div class="top-left-corner" v-bind:id="topLeftCornerId" v-bind:class="{ 'interactive': props.interactiveImg, 'fullscreen': fullscreen }" @click="topLeftCornerClick">
        <ImageCarousel v-bind="imageCarouselProps"></ImageCarousel>
    </div>
    <div class="main-content">
        <div class="top-left-corner-space"></div>
        <div class="header">
            <div class="row-1">
                <div class="title header-text">{{ props.title }}</div>
                <div class="back-btn" @click="back">BACK</div>
            </div>
            <div v-if="props.links" v-for="(item, index) in props.links" v-bind:class="'row-' + (index + 2)">
                <div class="link-title header-text">{{ item.title }}</div>
                <a class="link header-text" v-bind:href="item.link">{{ item.link }}</a>
            </div>
        </div>
        <div class="description" v-html="description"></div>
    </div>
</div>
</template>

<style scoped>
@import "../assets/base.css";

.game-view {
    width: 100%;
    height: 100%;
    display: flex;
    position: relative;
    animation: fade-in .3s forwards;
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
    overflow: hidden;
}

.top-left-corner.interactive {
    cursor: pointer;
}

.top-left-corner.fullscreen {
    width: 100%;
    height: 100%;
    pointer-events: none;
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
    width: 100%;
}

.main-content .header {
    vertical-align: top;
    display: inline-block;
    width: 60%;
    height: 30%;
    overflow: hidden;
    padding: 0px 32px;
}

.row-1 {
    display: flex;
    padding: 16px 0px;
}

.row-1 .title {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.row-1 .back-btn {
    width: 100px;
    height: 36px;
    margin: 0px 0px 0px auto;
    border-radius: 25px;
    background-color: rgb(83, 83, 208);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: white;
    transition: background-color .2s, color .2s;
}

.header .back-btn:hover {
    background-color: white;
    color: black;
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

.link-title, .link {
    overflow-wrap: break-word;
}

.header-text {
    font-size: 18px;
}

.title {
    font-size: 26px;
}

</style>