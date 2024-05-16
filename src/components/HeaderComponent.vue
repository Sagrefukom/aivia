<template>
  <v-app-bar>
    <v-app-bar-title>AIVIA TEST</v-app-bar-title>
    <div v-if="loginStore.isLoggedIn">
      <v-btn @click="logout">Logout</v-btn>

      <router-link to="/game"> Game </router-link>
      <router-link to="/about"> About </router-link>
    </div>
  </v-app-bar>
</template>

<script setup>
import { useLoginStore } from '@/stores/login'
import { useRouter } from 'vue-router'

const router = useRouter()

const loginStore = useLoginStore()

function logout() {
  localStorage.removeItem('user')
  loginStore.changeIsLoggedIn(false)
  router.push({ name: 'login' })
}
</script>

<style lang="scss" scoped></style>
