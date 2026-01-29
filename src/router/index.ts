import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import RegisterPage from '@/pages/RegisterPage.vue'
import { useAuth } from '@/stores/auth.store'
import UserPage from '@/pages/UserPage.vue'

const routes = [
  { path: '/', redirect: 'home'},
  { path: '/home', name: 'home', component: HomePage},
  { path: '/login', name: 'login', component: LoginPage, meta: { guestOnly: true } },
  { path: '/register', name: 'register', component: RegisterPage, meta: { guestOnly: true } },
  { path: '/me', name: 'me', component: UserPage, meta: {requiresAuth: true}},
  { path: '/:pathMatch(.*)*', redirect: '/home' },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to) => {
  const store = useAuth()
  const isAuthenticated = store.isAuthenticated

  if (to.meta.requiresAuth && !store.isAuthenticated) {
    return {
      path: '/login',
      query: { redirect: to.fullPath },
    }
  }

  if (to.meta.guestOnly && isAuthenticated) {
    return { name: 'home' }
  }

})

export default router
