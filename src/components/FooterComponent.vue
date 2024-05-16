<script setup>
import { useLoginStore } from '@/stores/login'

const isLoggedIn = useLoginStore().isLoggedIn

</script>

<template>
  <v-footer class="bg-grey-lighten-1">
    <v-row justify="center" no-gutters>
      <v-col v-if="isLoggedIn" class="text-center" cols="12">
        <div></div>
        <router-link to="/game"> Game </router-link>
        <router-link to="/about"> About </router-link>
      </v-col>
      <v-col class="text-center mt-4" cols="12">
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>
