<script setup lang="ts">
import { useAuth } from '@/stores/auth.store';
import AuthLayout from '@/layouts/AuthLayout.vue';

const store = useAuth()

</script>

<template>
  <AuthLayout>
    <h1>Me page working !</h1>
    <div v-if="store.user">
      <h2>>Hey {{ store.user.firstname }}, your role is: {{ store.user.role }}</h2>
    </div>

  </AuthLayout>
</template>
