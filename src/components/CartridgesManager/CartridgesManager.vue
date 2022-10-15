<script setup lang="ts">
import { ref, reactive } from 'vue';
import Cartridge from './Cartridge/Cartridge.vue';
import { getTop, getLeft } from '../../utilities/utilities';
import Gameboy from "./Gameboy/Gameboy.vue";
import CartridgeFactory from "./Cartridge/CartridgeFactory";
import GameboyFactory from "./Gameboy/GameboyFactory";

//#region Component Definitions
const emit = defineEmits(['cartridgeSelected']);
//#endregion Component Definitions

const selectedCartridge = ref(null);
const cartridgeFactory = new CartridgeFactory({ selectedCartridge });
const gameboyFactory = new GameboyFactory({ selectedCartridge });
const cartridges = reactive(cartridgeFactory.getAllCartridges());
const gameboyProps = reactive(gameboyFactory.getGameboyProps());

function click(index) {
    selectedCartridge.value = index;
    emit("cartridgeSelected", true);
    var mainEl = document.getElementById('main');

    index = 0;
    for (var cartridge of cartridges) {
        let i = index;
        var cartridgeEl = document.getElementById('cartridge' + i);
        // Set top and left values based on parent element
        cartridge.top = getTop(cartridgeEl.parentElement, mainEl);
        cartridge.left = getLeft(cartridgeEl.parentElement, mainEl);

        index++;
    }

    var gameboyEl = document.getElementById('gameboy');
    gameboyProps.top = getTop(gameboyEl, mainEl);
    gameboyProps.left = getLeft(gameboyEl, mainEl);
}
</script>

<template>
    <div class="cartridge-cont">
        <div v-for="(cartridge, index) in cartridges">
            <Cartridge v-bind="cartridge" @click="click(index)"></Cartridge>
        </div>
    </div>

    <Gameboy v-bind="gameboyProps"></Gameboy>
</template>

<style scoped>
.cartridge-cont {
    height: 80%;
    width: 100%;
    display: flex;
    flex-flow: wrap;
    align-items: center;
    justify-content: space-evenly;
    overflow: hidden;
}
</style>