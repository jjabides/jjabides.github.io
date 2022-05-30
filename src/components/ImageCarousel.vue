<template>
    <div class="carousel" v-bind:style="{ width: imgContWidth }">
        <div class="img-cont" v-for="(item, index) in imgItems" v-bind:style="{ left: item.left }">
            <img v-bind:src="item.image" />
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
const imgContWidth = "300%";
const topLeftCornerEl = ref(0);
const imgMargins = 16;

// TODO: Why isn't 'left' getting updated?
var imgItems = ref(props.images
.map((x, index) => { 
    return {
        image: x, 
        left: computed(() => { 
            if (!topLeftCornerEl.value)
                return '';

                console.log("trigger");

            return (topLeftCornerEl.value.clientWidth * index)  + 'px' }) 
    }
}))

onMounted(() => {
    topLeftCornerEl.value = document.getElementById(props.topLeftCornerId);
});

</script>

<style scoped>
.carousel {
    height: 100%;
}

.img-cont {
    position: absolute;
    height: 100%;
    width: 100%;
}
</style>