<script setup lang="ts"></script>

<template>
  <main class="home-wrapper">
    <div class="home-container">
      <h1>Welcome to the Home Page!</h1>
      <p>
        This project is a personal portfolio application designed to showcase my skills in modern frontend development using Vue.js.
        The interface communicates with a Spring Boot backend through a REST API, demonstrating my ability to build full-stack applications,
        structure scalable components, and handle real-world data flows.
      </p>
    </div>
  </main>
</template>

<style scoped>
.home-wrapper {
  min-height: calc(100vh - 70px); /* hauteur du header */
  display: flex;
  justify-content: center;
  align-items: center;
}

.home-container {
  text-align: center;
  padding: 20px;
  max-width: 800px;
  width: 100%;

  transform: translateY(-80px);
}

h1 {
  margin-bottom: 20px;
  font-size: 2.2rem;
}

p {
  line-height: 1.6;
  font-size: 1.1rem;
  color: #444;
}
</style>
