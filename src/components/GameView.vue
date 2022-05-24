<script setup>
import { computed } from "vue";

var props = defineProps({
    image: String,
    title: String,
    description: String
})

function back() {

}

function fullscreen() {

}

</script>

<template>
<div class="game-view">
    <div class="left-side" v-bind:src="props.image"></div>
    <div class="right-side">
        <div class="title">{{ props.title }}</div>
        <div class="description"> {{ props.description }}</div>
    </div>
</div>
</template>

<style scoped>

.game-view {
    width: 100%;
    height: 100%;
    display: flex;
}

.left-side {
    height: 100%;
    width: 45%;
}

.right-side {
    height: 100%;
    width: 55%;
}

.right-side .title {
    display: flex;
    justify-content: center;
}

.right-side .description {
    display: flex;
    justify-content: center;
}

</style>