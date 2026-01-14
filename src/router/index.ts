import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import LoginPage from '@/pages/LoginPage.vue'

const routes = [
  { path: '/', redirect: 'home', meta: { requiresAuth: false }},
  { path: '/home', name: 'home', component: HomePage, meta: { requiresAuth: false } },
  { path: '/login', name: 'login', component: LoginPage, meta: { guestOnly: true } },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
