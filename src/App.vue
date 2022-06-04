<script setup>
import CartridgesManager from "./components/CartridgesManager.vue";
import GameView from "./components/GameView.vue";
import resources from "./components/resources.js";
import postal from "postal";
import { ref } from "vue";

var channel = postal.channel("Notifications");
channel.subscribe("selectView", selectView);
channel.subscribe("cartridgeSelected", (message) => setCartridgeSelection(message))
const borderWidth = 1;

const views = resources.views;
const currentView = ref(resources.views.cartridgesManager);
const gameViewProps = ref(null);
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
      break;
    default:
      break;
  }
  
}

function setCartridgeSelection(message) {
  cartridgeSelected.value = message;
}

</script>

<template>
  <main id="main">
    <div class="select-cartridge-title" v-bind:class="{ 'selected': cartridgeSelected }">Select a Cartridge</div>
    <div class="views-cont">
      <CartridgesManager v-if="currentView === views.cartridgesManager" v-bind:mainBorderWidth="borderWidth"></CartridgesManager>
      <GameView  v-else-if="currentView === views.gameView" v-bind="gameViewProps"></GameView>
    </div>
  </main>
  
</template>

<style>
@import "./assets/base.css";

main {
  width: 100%;
  height: 100%;
  background: black;
  border: 1px solid white;
  display: flex;
  overflow: hidden;
  position: relative;
}

.views-cont {
  display: flex;
  width: 100%;
  height: 100%;
  opacity: 0;
  animation: fade-in .3s forwards 1.8s;
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
</style>
