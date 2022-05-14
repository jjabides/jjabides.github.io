<script setup>
import { reactive, computed } from "vue";
const props = defineProps({ 
    cartridgeId: Number, 
    isSelected: Boolean, 
    fadeOut: Boolean, 
    spinning: Boolean, 
    top: Number, 
    left: Number, 
    cartridgeHasBeenSelected: Boolean });

const state = reactive({
    id: 'cartridge' + props.cartridgeId,
});

const styles = computed(() => {
    if (props.cartridgeHasBeenSelected)
        return { 
            top: props.top + 'px', 
            left: props.left + 'px'
        }

    return {};
});

const classes = computed(() => {
    return { 
        selected: props.isSelected, 
        'fade-out': props.fadeOut, 
        'not-selected': props.cartridgeHasBeenSelected && !props.isSelected
    }
});

function click(cartridge) {
    //console.log(cartridge)
}

function isUnselected() {
    return props.cartridgeSelected !== null && props.isSelected !== props.cartridgeId
}

</script>

<template>
<div class="cartridge" @click="click(props.cartridgeId)" v-bind="state" v-bind:style="styles" v-bind:class="classes"></div>
</template>

<style scoped>

.cartridge {
    width: 100px;
    height: 100px;
    border-radius: 18px;
    background: gray;
    cursor: pointer;
    transition: transform .3s;
    margin: 0px 50px;
}

.cartridge:hover {
    transform: rotateZ(30deg);
}

.selected, .not-selected {
    /* animation: spinning .5s linear infinite; */
    position: absolute;
}



.fade-out {
    animation: fade-out 1s forwards;
}

@keyframes fade-out {
    0% {

    }

    100% {
        background: transparent;
        display: none;
    }
}

@keyframes spinning {
    0% {
        transform: rotateZ(0deg);
    }

    100% {
        transform: rotateZ(360deg);
    }
}

</style>