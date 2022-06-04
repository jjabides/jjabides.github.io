<script setup>
import { watch, ref, computed } from "vue";
var props = defineProps({
   cartridgeHasBeenSelected: Boolean,
   top: Number,
   left: Number
});

const spinning = ref(false);
const turnOnScreen = ref(false);

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

            setTimeout(() => turnOnScreen.value = true, 200);

            gameboyEl.animate([

                {
                    top: (centerTop - 25) + 'px',
                    left: centerLeft + 'px'
                }
            ],
            {
                duration: 200,
                endDelay: 500,
                fill: 'forwards',
                easing: 'ease-out'
            }).finished.then(() => {
                var mainWidth = mainEl.clientWidth;
                var mainHeight = mainEl.clientHeight;
                var gameboyHeight = gameboyEl.clientHeight;
                var offsetFromCenter = 25;
                var scale = Math.max(mainWidth, mainHeight) / (gameboyHeight - offsetFromCenter);

                gameboyEl.animate([
                    {
                        transform: `scale(${Math.round(scale)})`
                    }
                ],
                {
                    duration: 600,
                    endDelay: 300,
                    fill: 'forwards',
                }).finished.then(() => {

                    gameboyEl.animate([
                        {
                            opacity: "0"
                        }
                    ],
                    {
                        duration: 300,
                        fill: 'forwards'
                    }).finished.then(() => {
                        
                    })
                })
            })
        });
    });
}

</script>

<template>
<svg class="gameboy" id="gameboy" viewBox="0 0 200 100" v-bind:class="{ 'spinning': spinning, 'selected': props.cartridgeHasBeenSelected }" :style="styles">
    <rect rx="20" ry="20" width="200" height="100" style="fill:rgb(82, 81, 81);"></rect>
    <rect class="screen" v-bind:class="{ 'turnon': turnOnScreen }" x="37.5" y="10" rx="8" ry="8" width="125" height="80" style="fill: black"></rect>
    
</svg>
</template>

<style scoped>

.gameboy {
    position: absolute;
    width: 176px;
    height: 76px;
    left: calc(50% - 88px);
    bottom: 10px;
    z-index: 1;
    border-radius: 18px;
    animation: fade-in .3s forwards;
}

@keyframes fade-in {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

.selected {
    left: unset;
    bottom: unset;
}

.spinning {
    animation: spinning .6s ease-out forwards;
}

.gameboy .screen.turnon {
    animation: flashing .2s forwards;
}

@keyframes flashing {
    0% {
        fill: black;
    }

    25% {
        fill: rgba(255, 255, 255, 0.7);
    }

    75% {
        fill: black;
    }

    100% {
        fill: rgba(255, 255, 255, 0.7);
    }
}

</style>