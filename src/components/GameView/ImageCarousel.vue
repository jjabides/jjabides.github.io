<template>
    <div class="carousel">
        <div class="img-cont" v-if="!carouselMode">
            <img v-bind:src="props.images[state.index]"/>
        </div>
        <div class="carousel-mode" v-else>
            <div class="navigate-left" @click="(e) => navigate(e, 'left')" :style="{ visibility: navLeftActive ? 'visible' : 'hidden'}">
                <svg class="left-arrow" width="100%" viewBox="0 0 100 100">
                    <path d="M75 100 L25 50 L75 0" style="stroke:white; stroke-width:1; fill:none;"></path>
                </svg>
            </div>
            <div class="images-cont" id="images-cont">
                <div class="image-cont" v-for="image in props.images" :style="{ transform: translateX }">
                    <img v-bind:src="image" />
                </div>
            </div>
            <div class="navigate-right" @click="(e) => navigate(e, 'right')" :style="{ visibility: navRightActive ? 'visible' : 'hidden'}">
            <svg class="right-arrow" width="100%" viewBox="0 0 100 100">
                    <path d="M25 100 L75 50 L25 0" style="stroke:white; stroke-width:1; fill:none;"></path>
            </svg>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, computed, onMounted , ref, watch} from "vue"

const props = defineProps({
    images: Array,
    topLeftCornerId: String,
    fullscreen: Boolean
})

const state = reactive({ index: 0 });
const carouselMode = ref(false);
const translateX = ref('');
const navRightActive = computed(() => state.index < props.images.length - 1);
const navLeftActive = computed(() => state.index > 0);

watch(props, (value) => {
    if (value.fullscreen) {
        setTimeout(() => {
            carouselMode.value = true;

            setTimeout(() => {
                updatePositioning();
            }, 0)
        }, 400);
    } else {
        carouselMode.value = false;
    }
});

function navigate(event, direction) {
    event.stopPropagation();

    if (direction === 'right') {
        state.index = state.index < props.images.length - 1 ? state.index + 1 : state.index;
    } else {
        state.index = state.index > 0 ? state.index - 1 : state.index;
    }

    updatePositioning();
}

function updatePositioning() {
    if (!props.fullscreen)
        return;
    var imagesCont = document.getElementById('images-cont')
    translateX.value = `translateX(${(-imagesCont.clientWidth) * state.index}px)`
}

window.addEventListener('resize', () => {
    updatePositioning();
})
</script>

<style scoped>
.carousel {
    height: 100%;
    width: 100%;
    position: absolute;
}

.img-cont {
    width: 100%;
    height: 100%;
}

.img-cont img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.carousel-mode {
    display: flex;
    animation: fade-in .5s forwards;
    width: 100%;
    height: 100%;
}

.images-cont {
    display: flex;
    width: 80%;
    pointer-events: auto;
}

.images-cont .image-cont {
    width: 100%;
    height: 100%;
    object-fit: contain;
    position: relative;
    transition: transform .4s ease-in-out;
}

.images-cont .image-cont img {

width: 100%;
    height: 100%;
    object-fit: contain;
}

@keyframes fade-in {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

.navigate-left, .navigate-right {
    width: 10%;
    height: 100%;
    cursor: pointer;
    pointer-events: auto;
    position: relative;
    background-color: black;
    z-index: 1;
    display: flex;
    align-items: center;
    transition: background-color .2s;
}

.navigate-left:hover, .navigate-right:hover {
    background: rgba(255, 255, 255, 0.5);
}
</style>