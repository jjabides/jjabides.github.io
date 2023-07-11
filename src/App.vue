<script setup lang="ts">
import resources from "./utilities/resources";
import postal from "postal";
import { ref, shallowRef } from "vue";

var channel = postal.channel("Notifications");
channel.subscribe("selectView", selectView);

const displayView = shallowRef(false);
const currentView = shallowRef(resources.views.cartridgesManager);
const gameViewProps = shallowRef(null);
const cartridgeSelected = ref(false);

function selectView(message) {
  var views = resources.views;

  switch (message.view) {
    case views.gameView:
      currentView.value = message.view;
      gameViewProps.value = message.data;
      break;
    case views.cartridgesManager:
      currentView.value = message.view;
      cartridgeSelected.value = false;
      gameViewProps.value = null;
      break;
    default:
      break;
  }
  
}

function setCartridgeSelection(message) {
  cartridgeSelected.value = message;
}

// Wait for 'Select Cartridge' title to float to top
setTimeout(() => {
  displayView.value = true;
}, 1800)

console.log('test')
</script>

<template>
  <main id="main">
    <div class="select-cartridge-title" v-bind:class="{ 'selected': cartridgeSelected }">Select a Cartridge</div>
    <div class="views-cont" v-bind:style="{ 'display': displayView ? 'flex' : 'none' }">
      <component :is="currentView" v-bind="gameViewProps" @cartridgeSelected="setCartridgeSelection"></component>
    </div>
  </main>
</template>

<style>
@import "./assets/base.css";

main {
  width: 100%;
  height: 100%;
  background: black;
  display: flex;
  overflow: hidden;
  position: relative;
}

.views-cont {
  display: flex;
  width: 100%;
  height: 100%;
  opacity: 0;
  animation: fade-in .3s forwards;
}

.select-cartridge-title {
  color: white;
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  opacity: 0;
  
  animation: title-animation 2s forwards;
  transition: color .3s;
}

.selected {
  color: transparent;
}

/* --- Key Frames ---*/
@keyframes fade-in {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

/* --- End Key Frames ---*/

@keyframes title-animation {
  0% {
    opacity: 0;
    top: calc(50% - 21px);
  }

  20% {
    opacity: 1;
  }

  50% {
    opacity: 1;
    top: calc(50% - 21px);
  }

  100% {
    opacity: 1;
    top: 0px;
  }
}

/* --- Media Queries ---*/
@media screen and (min-width: 768px) {
  .select-cartridge-title {
    font-size: 3rem;
  }
}

@media screen and (min-width: 1200px) {
  main {
    width: 80%;
    margin: 0px 10%;
  }
}
/*--- End Media Queries ---*/
</style>
