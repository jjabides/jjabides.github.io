<script setup>
const props = defineProps({ cartridgeId: Number, isSelected: Boolean, fadeOut: Boolean, spinning: Boolean })

function click(cartridge) {
    //console.log(cartridge)
}

</script>

<template>
<div class="cartridge" @click="click(props.cartridgeId)" v-bind:id="props.cartridgeId" v-bind:class="{ selected: props.isSelected, 'fade-out': props.fadeOut, spinning: props.spinning }"></div>
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

.fade-out {
    animation: fade-out 1s forwards;
}

.spinning {
    animation: spinning .4s linear infinite;
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