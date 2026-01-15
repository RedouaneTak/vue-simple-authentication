<script setup lang="ts">

import { ref } from 'vue'

interface RegisterRequest{
  firstname: string,
  lastname: string,
  email: string,
  password: string
}

const registerForm = ref<RegisterRequest>({
  firstname:'',
  lastname:'',
  email:'',
  password:''
})

const register = async()=>{
  console.log(registerForm.value)
}

</script>

<template>
  <h1>Register</h1>
  <form @submit.prevent="register" class="register-form">
    <BaseInput
      label="Firstname"
      id="firstname-input"
      type="text"
      v-model="registerForm.firstname"
    />
    <BaseInput label="Lastname" id="lastname-input" type="text" v-model="registerForm.lastname" />
    <BaseInput label="Email" id="email-input" type="text" v-model="registerForm.email" />
    <BaseInput
      label="Password"
      id="password-input"
      type="password"
      v-model="registerForm.password"
    />
    <BaseButton type="submit">Sign up</BaseButton>

  </form>
</template>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
}

.register-form {
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
