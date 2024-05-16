import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLoginStore = defineStore('login', {
  state: () => {
    return { isLoggedIn: ref(!!localStorage.getItem('user')) }
  },
  actions: {
    changeIsLoggedIn(e) {
      this.isLoggedIn = e
    }
  }
})
