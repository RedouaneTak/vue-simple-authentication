<script setup lang="ts">
import { useAuth } from '@/stores/auth.store'
import { useRouter } from 'vue-router'

const store = useAuth()
const router = useRouter()
const handleLogout = () => {
  //store.logout()
  router.push('/')
}
</script>

<template>
  <header>
    <div class="logo">
      <RouterLink to="/home">My app</RouterLink>
    </div>

    <nav>
      <RouterLink to="/me" v-if="store.user">{{ store.user.firstname }}</RouterLink>
      <button @click="handleLogout">Logout</button>
    </nav>
  </header>
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background-color: #222;
}

.logo a {
  color: white;
  font-size: 22px;
  font-weight: bold;
  text-decoration: none;
}

.logo a.router-link-active {
  color: #48b4e8;
  border-bottom: 2px solid #48b4e8;
}

nav {
  display: flex;
  gap: 20px;
  align-items: center;
}

nav a {
  color: white;
  text-decoration: none;
}

nav a:hover,
.logo a:hover {
  text-decoration: underline;
  color: #48b4e8;
}

nav a.router-link-active {
  border-bottom: 2px solid #48b4e8;
  font-weight: bold;
  color: #48b4e8;
}

span {
  color: white;
}

button {
  background-color: transparent;
  border: 1px solid #e25555;
  color: #e25555;
  padding: 6px 14px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
}

button:hover {
  background-color: #e25555;
  color: #fff;
}

button:active {
  transform: scale(0.97);
}
</style>
