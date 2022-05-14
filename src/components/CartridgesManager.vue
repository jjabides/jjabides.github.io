<script setup>
import { ref, reactive, computed } from 'vue';
import Cartridge from './Cartridge.vue';

const props = defineProps({ mainBorderWidth: Number })
const selectedCartridge = ref(null);
const cartridges = reactive(getCartridges(6));
const borderWidth = 1;

function click(index) {
    selectedCartridge.value = index;
    var mainEl = document.getElementById('main');

    for (var i = 0; i < 6; i++) {
        var cartridgeEl = document.getElementById('cartridge' + i);
        // Set top and left values based on parent element
        cartridges[i].top = getTop(cartridgeEl.parentElement, mainEl);
        cartridges[i].left = getLeft(cartridgeEl.parentElement, mainEl);
    }
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

function getCartridges(count) {
    var cartridges = [];

    for(let i = 0; i < count; i++) {
        var cartridge = {
            cartridgeId: i, 
            isSelected: computed(() => {
                return selectedCartridge.value === i} ), 
            fadeOut: computed(() => selectedCartridge.value !== null && selectedCartridge.value !== i), 
            spinning: false, 
            top: 0, 
            left: 0, 
            cartridgeHasBeenSelected: computed(() => selectedCartridge.value !== null)
        }
        cartridges.push(cartridge);
    }

    return cartridges;
}

</script>

<template>


<div class="cartridge-cont" v-for="(cartridge, index) in cartridges">
    <Cartridge v-bind="cartridge" @click="click(index)"/>
</div>


</template>

<style scoped>

</style>