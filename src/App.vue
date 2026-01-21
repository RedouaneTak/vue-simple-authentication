<script setup lang="ts">
import UserHeader from './components/auth/UserHeader.vue';
import BaseHeader from './components/commons/BaseHeader.vue';
import { useAuth } from './stores/auth.store';
const store = useAuth()
</script>

<template>
  <UserHeader v-if="store.isAuthenticated" />
  <BaseHeader v-else />
  <RouterView />
</template>

<style scoped></style>
