<script setup>
import { ref, reactive, computed } from "vue";
import resources from "../utilities/resources";
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
const gamePreviewId = "game-preview";

const imageCarouselProps = reactive({
    images: props.images,
    gamePreviewId,
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

function gamePreviewClick() {
    if (!props.interactiveImg)
        return;
    fullscreen.value = !fullscreen.value;
}

</script>

<template>
    <div class="game-view">
        <div class="preview-cont">
            <div class="game-preview" v-bind:id="gamePreviewId"
                v-bind:class="{ 'interactive': props.interactiveImg, 'fullscreen': fullscreen }"
                @click="gamePreviewClick">
                <ImageCarousel v-bind="imageCarouselProps"></ImageCarousel>
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
                    <div v-if="props.links" v-for="(item, index) in props.links">
                        <div class="link-title">{{ item.title }}</div>
                        <a class="link" v-bind:href="item.email ? `mailto: ${item.link}` : item.link">{{ item.link }}</a>
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
    height: 100%;
    pointer-events: none;
    position: absolute;
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