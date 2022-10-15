<script setup lang="ts">
import postal from "postal";
import { watch } from "vue";

const props = defineProps({
    fullscreen: Boolean
});

const channel = postal.channel("Notifications");

function exitFullscreen() {
    setTimeout(() => {
        channel.publish("exitFullscreen");
    }, 0)
}

watch(props, (value) => {
    if (props.fullscreen) {
        const iframeEl = document.getElementById('bowling-frame');
        iframeEl.focus();
    }
});

</script>

<template>
    <div class="bowling-demo" :class="{ 'interactive': props.fullscreen }">
        <iframe id="bowling-frame" src="https://infinite-bowling.netlify.app/"></iframe>
        <div class="back-btn" v-if="props.fullscreen" @click="exitFullscreen">BACK</div>
    </div>
</template>

<style scoped>
.bowling-demo {
    width: 100%;
    height: 100%;
    position: relative;
    pointer-events: none;
}

.bowling-demo.interactive {
    pointer-events: auto;
}

iframe {
    width: 100%;
    height: 100%;
}

.back-btn {
    position: absolute;
    width: 100px;
    height: 36px;
    background: #fe6c00;
    border-radius: 18px;
    margin: 16px 0px 0px auto;
    cursor: pointer;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color .2s;
    font-size: 16px;
    position: absolute;
    bottom: 16px;
    right: 16px;
}

.back-btn:hover {
    background: black;
}
</style>