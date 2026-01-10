<script setup lang="ts"></script>

<template>
  <div class="layout-wrapper">
    <div class="layout-card">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.layout-wrapper {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: #f4f6f8;
  padding-top: 80px;
}

.layout-card {
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 12px;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
}
</style>
