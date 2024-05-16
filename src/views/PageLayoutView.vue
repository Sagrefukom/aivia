<script setup>
import HeaderComponent from '@/components/HeaderComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
</script>

<template>
  <v-app>
    <HeaderComponent />
    <v-main class="main">
      <v-container fluid class="d-flex justify-center align-center">
        <router-view />
      </v-container>
    </v-main>
    <FooterComponent />
  </v-app>
</template>

<style lang="scss">
// .main {
//   height: 100%;
// }
</style>
