import { Component } from "vue";
import CartridgesManager from "../components/CartridgesManager/CartridgesManager.vue";
import GameView from "../components/GameView/GameView.vue";

var resources = {
    views: {
        gameView: GameView,
        cartridgesManager: CartridgesManager
    }
}

export default resources;

interface ViewsResource {
    [key: string]: Component
}