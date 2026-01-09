<script setup lang="ts"></script>

<template>
  <header>
    <div class="logo">
      <RouterLink to="/home">My app</RouterLink>
    </div>

    <nav>
      <RouterLink to="/register">Register</RouterLink>
      <RouterLink to="/login">Log in</RouterLink>
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

nav {
  display: flex;
  gap: 20px;
}

nav a {
  color: white;
  text-decoration: none;
}

nav a:hover {
  text-decoration: underline;
}

nav a.router-link-active {
  border-bottom: 2px solid white;
  font-weight: bold;
}
</style>
