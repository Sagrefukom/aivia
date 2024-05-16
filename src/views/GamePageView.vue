<script setup>
import {ref, reactive} from 'vue'
import SquareComponent from '@/components/SquareComponent.vue'
const x = ref('')
const y = ref('')
const gorizontal = reactive([])
const vertical = reactive([])

function addSquares(count, array) {
    array.splice(0)
    for (let i = 0; i < count; i++) {
        array.push({});
    }
}
</script>

<template>
  <div class="d-flex flex-column justify-center w-100 h-100 game">
    <div class="game__fields">
        <v-text-field
                class="mr-3 game__field"
                label="size-x"
                v-model.lazy="x"
                type="text"
                variant="outlined"
                @input="addSquares(x, gorizontal)"

            ></v-text-field>
            <v-text-field
                class="ml-3 game__field"
                label="size-y"
                v-model="y"
                type="text"
                variant="outlined"
                @input="addSquares(y, vertical)"
            ></v-text-field>
    </div>
    <div class="d-flex game__wrapper" >
        <component
            v-for="div in gorizontal" 
            :key="div" 
            :is="SquareComponent">
        </component>
    </div>
    <div class="d-flex flex-column game__wrapper" >
        <component
            v-for="div in vertical" 
            :key="div"
            :is="SquareComponent">
        </component>
    </div>
  </div>
</template>

<style scoped lang="scss">
.game {
    &__fields {
        display: flex;
        justify-content: center;
        width: 100%;
    }
    &__field {
        max-width: 500px;
        width: 100%;
    }
    &__wrapper {
        flex-wrap: wrap;
        background-color: rgb(55, 59, 55);
        max-width: max-content;
    }
}
</style>
