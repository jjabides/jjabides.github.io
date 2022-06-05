<template>
    <div class="cartridge-anchor" :style="anchorStyles">
        <div class="cartridge" v-bind="state" v-bind:class="classes">
            <img v-bind:src="data.icon"/>
        </div>
    </div>
</template>

<script setup>
import { reactive, computed, watch, onMounted } from "vue";
import postal from "postal";
import resources from "../../utilities/resources";
import tippy, { animateFill, roundArrow } from "tippy.js";
import { getTop, getLeft } from "../../utilities/utilities";
import 'tippy.js/themes/light.css'
import 'tippy.js/dist/backdrop.css';
import 'tippy.js/animations/shift-away.css';
import 'tippy.js/dist/svg-arrow.css';

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

    return {};
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
    var dx = centerLeft - getLeft(cartridgeAnchorEl, mainEl);
    var dy = centerTop - getTop(cartridgeAnchorEl, mainEl);
    
    cartridgeAnchorEl.animate(
    [
        { 
            transform: `translate(${dx}px, ${dy - 150}px)`
        }
    ],
    {
        duration: 500,
        fill: 'forwards'
    }).finished.then(() => {
        cartridgeAnchorEl.animate(
            [
                { 
                    transform: `translate(${dx}px, ${dy - 25}px)`
                }
            ],
            {
                delay: 400,
                duration: 100,
                fill: 'forwards'
            }
        ).finished.then(() => {

            cartridgeAnchorEl.animate(
                [
                    {
                        transform: `translate(${dx}px, ${dy - 50}px)`
                    }
                ],
                {
                    duration: 200,
                    endDelay: 500,
                    fill: 'forwards',
                    easing: 'ease-out'
                }
            ).finished.then(() => {

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

onMounted(() => {
    const isTouchScreen = true == ("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch);

    if (!isTouchScreen) {
        tippy('#' + state.id, {
            content: props.data.title,
            placement: 'bottom',
            animation: 'shift-away',
            theme: 'custom',
            arrow: roundArrow,
            offset: [0, 20]
        })
    }
})

</script>

<style scoped>




.cartridge {
    width: 96px;
    height: 96px;
    padding: 12px;
    border-radius: 18px;
    background: gray;
    cursor: pointer;
    transition: transform .3s, opacity .3s;
    animation: fade-in .3s forwards;
}

.cartridge:hover {
    transform: rotateZ(30deg);
}

.selected, .not-selected {
    
    position: absolute;
    pointer-events: none;
}

.spinning {
    animation: spinning .6s ease-out forwards;
}

img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.fade-out {
    animation: fade-out 1s forwards;
}

@keyframes fade-out {
    0% {
        opacity: 1;
    }

    100% {
        opacity: 0;
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

/* --- Media Queries ---*/
@media screen and (min-width: 768px) {
    .cartridge {
        width: 120px;
        height: 120px;
    }
}
/* --- End Media Queries ---*/

</style>