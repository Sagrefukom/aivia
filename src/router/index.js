import { createRouter, createWebHistory } from 'vue-router'
import { useLoginStore } from '@/stores/login'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  base: '/test/',
  routes: [
    {
      path: '/',
      component: () => import('../views/PageLayoutView.vue'),
      meta: { requireAuth: true },
      children: [
        {
          path: '/game',
          name: 'game',
          component: () => import('../views/GamePageView.vue')
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('../views/AboutPageView.vue')
          }
      ]
    },
    {
      path: '/',
      component: () => import('../views/PageLayoutView.vue'),
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import('../views/LoginPageView.vue'),
          beforeEnter: async (to, from, next) => {
            const isLoggedIn = useLoginStore().isLoggedIn

            if (isLoggedIn) {
              return next('/game')
            }

            next()
          }
        }
      ]
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const loginStore = useLoginStore()
  if (to.matched.some((record) => record.meta.requireAuth)) {
    if (!loginStore.isLoggedIn) {
      next({ name: 'login' })
    }
  }
  next()
})

export default router
