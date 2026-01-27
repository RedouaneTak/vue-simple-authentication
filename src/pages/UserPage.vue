<script setup lang="ts">
import { useAuth } from '@/stores/auth.store';
import AuthLayout from '@/layouts/AuthLayout.vue';

const store = useAuth()

</script>

<template>
  <AuthLayout>
    <h1>Me page working !</h1>
    <h2 v-if="store.user">Hey {{ store.user.firstname }}</h2>
  </AuthLayout>
</template>
