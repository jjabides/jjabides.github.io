<template>
    <div class="cartridge-anchor" :style="anchorStyles">
        <div class="cartridge" v-bind="state" v-bind:class="classes"></div>
    </div>
</template>

<script setup>
import { reactive, computed, watch } from "vue";
import postal from "postal";
import resources from "./resources";

const props = defineProps({ 
    cartridgeId: Number, 
    isSelected: Boolean, 
    fadeOut: Boolean,
    top: Number, 
    left: Number, 
    cartridgeHasBeenSelected: Boolean,
    data: Object });

const state = reactive({
    id: 'cartridge' + props.cartridgeId,
    spinning: false,
    animating: false,
    animationFinished: false
});

const classes = computed(() => {
    var { isSelected, fadeOut, cartridgeHasBeenSelected } = props;
    var { spinning, animationFinished } = state;
    return { 
        selected: isSelected, 
        'fade-out': fadeOut, 
        'not-selected': cartridgeHasBeenSelected && !isSelected,
        'spinning': spinning,
        'animation-finished': animationFinished
    }
});

const anchorStyles = computed(() => {
    if (props.cartridgeHasBeenSelected)
        return { 
            top: props.top + 'px', 
            left: props.left + 'px',
            position: 'absolute',
            margin: '0px'
        }

    return { 
        margin: '0px 50px'
    };
});

watch(props, (value) => {
    if (value.isSelected) {
        setTimeout(() => {
            animate();
        }, 0)
    }
});



function animate() {
    var mainEl = document.getElementById('main');
    var cartridgeEl = document.getElementById(state.id);
    var cartridgeAnchorEl = cartridgeEl.parentElement;
    state.spinning = true;
    state.animating = true;

    var centerTop = (mainEl.clientHeight / 2) - (cartridgeEl.clientWidth / 2);
    var centerLeft = (mainEl.clientWidth / 2) - (cartridgeEl.clientWidth / 2);

    cartridgeAnchorEl.animate(
    [
        { 
            top: (centerTop - 150) + 'px', 
            left: centerLeft + 'px',
        }
    ],
    {
        duration: 500,
        fill: 'forwards'
    }).finished.then(() => {
        console.log('moved to center');

        cartridgeAnchorEl.animate(
            [
                { 
                    top: (centerTop - 25) + 'px', 
                    left: centerLeft + 'px' }
            ],
            {
                delay: 400,
                duration: 100,
                fill: 'forwards'
            }
        ).finished.then(() => {
            console.log("move down");

            cartridgeAnchorEl.animate(
                [
                    {
                        top: (centerTop - 50) + 'px',
                        left: centerLeft + 'px'
                    }
                ],
                {
                    duration: 200,
                    endDelay: 500,
                    fill: 'forwards',
                    easing: 'ease-out'
                }
            ).finished.then(() => {
                console.log("bounce up");

                cartridgeAnchorEl.animate([
                    {
                        visibility: 'hidden'
                    }
                ],
                {
                    duration: 600,
                    fill: 'forwards'
                }).finished.then(() => {

                    setTimeout(() => {
                        state.animating = false;
                        state.animationFinished = true;

                        var message = {
                            view: resources.views.gameView,
                            data: props.data
                        }
                        var channel = postal.channel("Notifications");
                        channel.publish("selectView", message);
                    }, 600);
                    
                })
            });
        });
    })
}

</script>

<style scoped>

.cartridge {
    width: 120px;
    height: 120px;
    border-radius: 18px;
    background: gray;
    cursor: pointer;
    transition: transform .3s, opacity .3s;
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

.cartridge:hover {
    transform: rotateZ(30deg);
}

.cartridge-anchor {
    margin: 0px 50px;
}

.selected, .not-selected {
    
    position: absolute;
    pointer-events: none;
}

.spinning {
    animation: spinning .6s ease-out forwards;
}

.fade-out {
    animation: fade-out 1s forwards;
}

@keyframes fade-out {
    0% {

    }

    100% {
        background: transparent;
        display: none;
    }
}

@keyframes spinning {
    0% {
        transform: rotateZ(0deg);
    }

    100% {
        transform: rotateZ(720deg);
    }
}

</style>