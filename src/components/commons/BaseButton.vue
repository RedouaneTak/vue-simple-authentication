<script setup lang="ts">
import type { ButtonHTMLAttributes } from 'vue';


  interface Props{
    type?: ButtonHTMLAttributes["type"]
  }

  const props = withDefaults(defineProps<Props>(),{
    type: 'button'
  })
</script>

<template>
  <button :type="props.type" class="base-button">
    <slot></slot>
  </button>
</template>

<style scoped>
.base-button {
  padding: 0.6rem 1rem;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.base-button:hover {
  background-color: #4338ca;
}

.base-button:disabled {
  background-color: #a5b4fc;
  cursor: not-allowed;
}
</style>
