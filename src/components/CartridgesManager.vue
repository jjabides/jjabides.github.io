<template>
<div class="cartridge-cont">
    <div v-for="(cartridge, index) in cartridges">
        <Cartridge v-bind="cartridge" @click="click(index)"></Cartridge>
    </div>
</div>

<Gameboy v-bind="gameboyProps"></Gameboy>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import Cartridge from './Cartridge.vue';
import Gameboy from "./Gameboy.vue";
import CartridgeData from "./cartridgeData";

const props = defineProps({ mainBorderWidth: Number })
const selectedCartridge = ref(null);
const cartridges = reactive(getCartridges());
const gameboyProps = reactive({
    cartridgeHasBeenSelected: computed(() => selectedCartridge.value !== null),
    top: null,
    left: null
});

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

        i++;
    }

    var gameboyEl = document.getElementById('gameboy');
    gameboyProps.top = getTop(gameboyEl, mainEl);
    gameboyProps.left = getLeft(gameboyEl, mainEl);
}

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

function getCartridges() {
    var cartridges = [];
    var index = 0;
    var keys = Object.keys(CartridgeData);

    for (var key of keys) {
        let i = index;
        var data = CartridgeData[key];
        var cartridge = {
            cartridgeId: i,
            isSelected: computed(() => {
                return selectedCartridge.value === i
                } ),
            fadeOut: computed(() => selectedCartridge.value !== null && selectedCartridge.value !== i),
            top: 0, 
            left: 0,
            cartridgeHasBeenSelected: computed(() => selectedCartridge.value !== null),
            data: data
        }

        index++;

        cartridges.push(cartridge);
    }

    return cartridges;
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