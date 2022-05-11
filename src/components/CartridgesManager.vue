<script setup>
import { ref, reactive } from 'vue';
import Cartridge from './Cartridge.vue';

const state = reactive({ selectedCartridge: null })
const cartridges = ref(Array(6));

function click(index) {
    //selectedCartridge = index;
    state.selectedCartridge = index;
    // var cartridgeEL = document.getElementById('cartridge' + index);
    // cartridgeEL.clientLeft
}

</script>

<template>


<div class="cartridge-cont" v-for="(cartridge, index) in cartridges">
    <Cartridge v-bind:cartridgeId="index" @click="click(index)" v-bind:isSelected="state.selectedCartridge === index" v-bind:fadeOut="state.selectedCartridge !== null && state.selectedCartridge !== index"/>
</div>

<div class="cartridge-cont" v-if="state.selectedCartridge !== null">
    <Cartridge v-bind:cartridgeId="state.selectedCartridge" v-bind:spinning="true"/>
</div>


</template>

<style scoped>

</style>