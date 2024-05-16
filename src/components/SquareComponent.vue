<template>
    <div class="square" @mouseover="changeColor" :style="{ backgroundColor: 'white' }" ref="square">
    </div>
</template>

<script setup>
import {ref} from 'vue'
const square = ref(null)
function changeColor() {
    square.value.style.backgroundColor === 'white' ? square.value.style.backgroundColor = 'blue' : square.value.style.backgroundColor = 'white'
}
</script>

<style lang="scss" scoped>
.square {
    width: 36px;
    height: 36px;
    margin: 5px;
    cursor: pointer;
}
</style>