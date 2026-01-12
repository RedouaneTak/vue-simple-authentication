<script setup lang="ts">
import BaseButton from '../commons/BaseButton.vue'
import BaseInput from '../commons/BaseInput.vue'
import { ref } from 'vue'


interface LoginRequest{
  email: string,
  password: string

}

const loginForm = ref<LoginRequest>({
  email: '',
  password: ''
})

const login = ()=>{

}
</script>

<template>
  <h1>Login</h1>
  <form @submit.prevent="login" class="login-form">
    <BaseInput label="Email" id="email-input" type="text" v-model="loginForm.email" />
    <BaseInput label="Password" id="password-input" type="password" v-model="loginForm.password" />
    <BaseButton type="submit">Log in</BaseButton>
  </form>
</template>

<style scoped>
  h1 {
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.error-message {
  color: #d9534f;
  text-align: center;
  margin-top: 0.5rem;
  font-weight: 500;
}
</style>
