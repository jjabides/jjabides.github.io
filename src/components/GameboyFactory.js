import { computed } from "vue";

class GameboyFactory {

    constructor({ selectedCartridge }) {
        this.selectedCartridge = selectedCartridge;
    }

    getGameboyProps() {
        var { selectedCartridge } = this;

        return {
            cartridgeHasBeenSelected: computed(() => selectedCartridge.value !== null),
            top: null,
            left: null
        }
    }
}

export default GameboyFactory;