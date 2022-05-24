<script setup>
import CartridgesManager from "./components/CartridgesManager.vue";
import GameView from "./components/GameView.vue";
import resources from "./components/resources.js";
import postal from "postal";
import { ref } from "vue";

var channel = postal.channel("Notifications");
channel.subscribe("selectView", selectView);
const borderWidth = 1;

const currentView = ref(resources.views.cartridgesManager);
const gameViewProps = ref(null);

function selectView(message) {
  var views = resources.views;

  switch (message.view) {
    case views.gameView:
      currentView.value = message.view;
      gameViewProps.value = message.data;
      break;
    case views.cartridgesManager:
      currentView.value = message.view;
      break;
    default:
      break;
  }
  
}

</script>

<template>

  <main id="main">
    <CartridgesManager v-if="currentView === resources.views.cartridgesManager" v-bind:mainBorderWidth="borderWidth"></CartridgesManager>
    <GameView  v-else-if="currentView === resources.views.gameView" v-bind="gameViewProps"></GameView>
  </main>
  
</template>

<style>
@import "./assets/base.css";

main {
  margin: 0px 15%;
  width: 70%;
  height: 100%;
  background: black;
  border: 1px solid white;
  display: flex;
  overflow: hidden;
  position: relative;
}

</style>
