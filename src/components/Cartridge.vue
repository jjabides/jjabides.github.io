<script setup>
import { reactive, computed, watch, ref } from "vue";

const props = defineProps({ 
    cartridgeId: Number, 
    isSelected: Boolean, 
    fadeOut: Boolean,
    top: Number, 
    left: Number, 
    cartridgeHasBeenSelected: Boolean });

const isSelected = ref(props.isSelected);

const state = reactive({
    id: 'cartridge' + props.cartridgeId,
});

const spinning = ref(false);

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

const classes = computed(() => {
    return { 
        selected: props.isSelected, 
        'fade-out': props.fadeOut, 
        'not-selected': props.cartridgeHasBeenSelected && !props.isSelected,
        'spinning': spinning.value
    }
});

function animate() {
    var mainEl = document.getElementById('main');
    var cartridgeEl = document.getElementById(state.id);
    var cartridgeAnchorEl = cartridgeEl.parentElement;
    spinning.value = true;

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
                    fill: 'forwards',
                    easing: 'ease-out'
                }
            ).finished.then(() => {
                console.log("bound up");
            });
        });
    })
}

</script>

<template>
<div class="cartridge-anchor" :style="anchorStyles">
    <div class="cartridge" v-bind="state" v-bind:class="classes"></div>
</div>
</template>

<style scoped>

.cartridge {
    width: 150px;
    height: 150px;
    border-radius: 18px;
    background: gray;
    cursor: pointer;
    transition: transform .3s;
    
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