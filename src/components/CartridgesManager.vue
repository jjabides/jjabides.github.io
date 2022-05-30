<template>
<div class="cartridge-cont">
    <div v-for="(cartridge, index) in cartridges">
        <Cartridge v-bind="cartridge" @click="click(index)"></Cartridge>
    </div>
</div>

<Gameboy v-bind="gameboyProps"></Gameboy>
</template>

<script setup>
import { ref, reactive } from 'vue';
import Cartridge from './Cartridge.vue';
import Gameboy from "./Gameboy.vue";
import CartridgeFactory from "./CartridgeFactory";
import GameboyFactory from "./GameboyFactory";

const props = defineProps({ mainBorderWidth: Number })
const selectedCartridge = ref(null);
const cartridgeFactory = new CartridgeFactory({ selectedCartridge });
const gameboyFactory = new GameboyFactory({ selectedCartridge });
const cartridges = reactive(cartridgeFactory.getAllCartridges());
const gameboyProps = reactive(gameboyFactory.getGameboyProps());

function click(index) {
    selectedCartridge.value = index;
    var mainEl = document.getElementById('main');

    var index = 0;
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

    function getTop(element, relativeEl) {
        var elRect = element.getBoundingClientRect();
        var relativeELRect = relativeEl.getBoundingClientRect();
        return elRect.top - relativeELRect.top - props.mainBorderWidth;
    }

    function getLeft(element, relativeEl) {
        var elRect = element.getBoundingClientRect();
        var relativeELRect = relativeEl.getBoundingClientRect();
        return elRect.left - relativeELRect.left - props.mainBorderWidth;
    }
}
</script>

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