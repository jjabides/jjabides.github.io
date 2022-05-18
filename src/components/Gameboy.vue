<script setup>
import { watch, ref, computed } from "vue";
var props = defineProps({
   cartridgeHasBeenSelected: Boolean,
   top: Number,
   left: Number
});

var spinning = ref(false);

const styles = computed(() => {
    if (props.cartridgeHasBeenSelected) {
        return {
            top: props.top + 'px',
            left: props.left + 'px'
        }
    }

    return {};
})

watch(props, (value) => {
    if (value.cartridgeHasBeenSelected) {
        setTimeout(() => {
            animate();
        }, 0);
    }
});

function animate() {
    var mainEl = document.getElementById('main');
    var gameboyEl = document.getElementById('gameboy');
    spinning.value = true;

    var centerTop = (mainEl.clientHeight / 2) - (gameboyEl.clientHeight / 2);
    var centerLeft = (mainEl.clientWidth / 2) - (gameboyEl.clientWidth / 2);

    gameboyEl.animate(
        [
            {
                top: (centerTop - 25) + 'px',
                left: centerLeft + 'px'
            }
        ],
        {
            duration: 500,
            fill: 'forwards'
        }
    ).finished.then(() => {
        gameboyEl.animate([
            {
                top: (centerTop) + 'px',
                left: centerLeft + 'px'
            }
        ],
        {
            delay: 480,
            duration: 20,
            fill: 'forwards'
        }).finished.then(() => {

            gameboyEl.animate([

                {
                    top: (centerTop - 25) + 'px',
                    left: centerLeft + 'px'
                }
            ],
            {
                duration: 200,
                fill: 'forwards',
                easing: 'ease-out'
            })
        });
    });
}

</script>

<template>
<div class="gameboy" id="gameboy" v-bind:class="{ 'spinning': spinning, 'selected': props.cartridgeHasBeenSelected }" :style="styles"></div>
</template>

<style scoped>

.gameboy {
    position: absolute;
    width: 200px;
    height: 100px;
    left: calc(50% - 100px);
    bottom: 10px;
    background: purple;
    z-index: 1;
    border-radius: 18px;
}

.selected {
    left: unset;
    bottom: unset;
}

.spinning {
    animation: spinning .6s ease-out forwards;
}

</style>