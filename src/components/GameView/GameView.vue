<script setup lang="ts">
import { ref, reactive, computed, shallowRef, watch, markRaw, defineComponent } from "vue";
import resources from "../../utilities/resources";
import ImageCarousel from "./ImageCarousel.vue";
import postal from "postal";
import { types } from "../CartridgesManager/Cartridge/CartridgeData";
import Bowling from "./Demos/Bowling.vue";
import SunburstDiagram from "./Demos/SunburstDiagram.vue";
import BlackHole from "./Demos/BlackHole.vue";
import Zenfone from "./Demos/Zenfone.vue";

const demoComponents = {
    Bowling,
    SunburstDiagram,
    BlackHole,
    Zenfone,
}

var props = defineProps({
    images: Array,
    title: String,
    descriptionUrl: String,
    interactiveImg: Boolean,
    links: Array,
    type: String,
    previewHeight: String,
    demoComponent: String
})

const description = ref("");
const fullscreen = ref(false);
const gamePreviewId = "game-preview";
const channel = postal.channel("Notifications");
const selectedComponent = getSelectedComponent();

function getSelectedComponent() {
    if (props.type === types.Carousel) {
        return ImageCarousel;
    } else {
        return demoComponents[props.demoComponent];
    }
}

const carouselProps = reactive({
    images: props.images,
    gamePreviewId,
    fullscreen,
});

const demoProps = reactive({
    gamePreviewId,
    fullscreen,
});

const componentProps = computed(() => {
    if (props.type === types.Carousel)
        return carouselProps;
    else
        return demoProps;
})

// Get description file
var client = new XMLHttpRequest();
client.open('GET', props.descriptionUrl);
client.onreadystatechange = () => {
    description.value = client.responseText;
}
client.send();

function back() {
    var message = {
        view: resources.views.cartridgesManager,
    }
    channel.publish("selectView", message);
}

function enterFullscreen() {
    if (!props.interactiveImg)
        return;
    if (!fullscreen.value)
        fullscreen.value = true;
}

function exitFullscreen() {
    if (fullscreen.value)
        fullscreen.value = false;
}
</script>

<template>
    <div class="game-view">
        <div class="preview-cont">
            <div class="game-preview" v-bind:id="gamePreviewId"
                v-bind:class="{ 'interactive': props.interactiveImg, 'fullscreen': fullscreen }"
                v-bind:style="{ 'height': props.previewHeight }" @click="enterFullscreen">
                <component :is="selectedComponent" v-bind="componentProps" @exitFullscreen="exitFullscreen"></component>
            </div>
            <div class="main-content" :style="{ 'margin-top': fullscreen ? '30%' : '0'}">
                <div class="header">
                    <div class="row-1">
                        <div class="title">{{ props.title }}</div>
                        <div class="back-btn" :class="{ 'fullscreen': fullscreen }" @click="back">BACK</div>
                    </div>
                </div>
                <div class="description body-text" v-html="description"></div>
                <div class="links body-text">
                    <div v-if="props.links" v-for="(item, index) in (props.links as any)">
                        <div class="link-title">{{ item.title }}</div>
                        <a class="link" v-bind:href="((item.email ? `mailto: ${item.link}` : item.link) as string)">{{
                        item.link}}</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.game-view {
    width: 100%;
    height: 100%;
    position: relative;
    animation: fade-in .3s forwards;
}

.preview-cont {
    width: 100%;
    height: 100%;
    overflow-y: auto;
}

.game-preview {
    width: 100%;
    height: 30%;
    position: relative;
    background-color: black;
    overflow: hidden;
    transition: width .3s, height .3s;
}

.game-preview.interactive {
    cursor: pointer;
}

.game-preview.fullscreen {
    top: 0;
    width: 100%;
    height: 100% !important;
    position: absolute;
    cursor: initial;
}

.game-preview img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.main-content {
    width: 100%;
    transition: height .3s;
}

.main-content .header {
    vertical-align: top;
    display: inline-block;
    width: 100%;
    overflow: hidden;
    padding: 0px 16px;
}

.row-1 {
    display: flex;
    padding: 8px 0px;
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
    position: absolute;
    bottom: 12px;
    right: 12px;
}

.back-btn.fullscreen {
    display: none;
}

.header .back-btn:hover {
    background-color: white;
    color: black;
}

.main-content .description {
    padding: 16px;
    font-size: 18px;
}

/* --- start scrollbar --- */
::-webkit-scrollbar {
    width: 4px;
}

::-webkit-scrollbar-thumb {
    background-color: #7c7c7c;
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background-color: #464646;
}

/* --- end scrollbar --- */

.link-title,
.link {
    overflow-wrap: break-word;
}

.title {
    font-size: 24px;
    font-weight: bold;
    color: white;
}

.links {
    padding: 16px;
    padding-bottom: 64px;
}

a.link {
    color: rgb(0, 170, 255);
}

/* --- Media Queries ---*/
@media screen and (min-width: 768px) {
    ::-webkit-scrollbar {
        width: 8px;
    }

    ::-webkit-scrollbar-thumb {
        display: block;
    }
}

@media screen and (min-width: 1200px) {
    .title {
        font-size: 32px;
    }

    .body-text {
        font-size: 24px !important;
    }
}

/* --- End Media Queries ---*/
</style>