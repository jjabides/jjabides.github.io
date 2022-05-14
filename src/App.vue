<script setup>
import CartridgesManager from "./components/CartridgesManager.vue"
const borderWidth = 1;
</script>

<template>

  <main id="main">
    <CartridgesManager v-bind:mainBorderWidth="borderWidth"></CartridgesManager>
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
  flex-flow: wrap;
  align-items: center;
  justify-content: space-evenly;
  overflow: hidden;
  position: relative;
}

</style>
