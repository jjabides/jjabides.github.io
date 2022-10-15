import CartridgeData from "./CartridgeData";
import { computed } from "vue";

class CartridgeFactory {
    constructor({ selectedCartridge }) {
        this.selectedCartridge = selectedCartridge;
    }
    
    getAllCartridges() {
        var { selectedCartridge } = this;

        var cartridges = [];
        var index = 0;
        var keys = Object.keys(CartridgeData);

        for (var key of keys) {
            let i = index;
            var data = CartridgeData[key];
            let cartridge = {
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
}

export default CartridgeFactory;