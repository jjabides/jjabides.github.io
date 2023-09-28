<script setup lang="ts">
import postal from "postal";
import { watch } from "vue";

//#region Component Definitions
const props = defineProps({
    fullscreen: Boolean
});

const emit = defineEmits(['exitFullscreen']);
//#endregion Component Definitions

function exitFullscreen() {
    setTimeout(() => {
        emit('exitFullscreen');
    }, 0)
}

watch(props, (value) => {
    if (props.fullscreen) {
        const iframeEl = document.getElementById('zenfone-frame');
        iframeEl.focus();
    }
});

</script>

<template>
    <div class="zenfone-demo" :class="{ 'interactive': props.fullscreen }">
        <iframe id="zenfone-frame" src="https://jj-abides-zenfone-9.netlify.app/"></iframe>
        <div class="back-btn" v-if="props.fullscreen" @click="exitFullscreen">BACK</div>
    </div>
</template>

<style scoped>
.zenfone-demo {
    width: 100%;
    height: 100%;
    position: relative;
    pointer-events: none;
}

.zenfone-demo.interactive {
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