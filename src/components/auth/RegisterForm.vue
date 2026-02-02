<script setup lang="ts">
import BaseButton from '../commons/BaseButton.vue'
import BaseInput from '../commons/BaseInput.vue'
import { ref } from 'vue'
import type { RegisterRequest,RegisterErrors } from '@/models/auth.model'
import { useAuth } from '@/stores/auth.store'
import { useRouter } from 'vue-router'

const store = useAuth()
const router = useRouter()

const errors = ref<RegisterErrors>({})

const registerForm = ref<RegisterRequest>({
  firstname: '',
  lastname: '',
  email: '',
  password: '',
})

const register = async () => {
  try {
    await store.registerUser(registerForm.value)
    router.push('/home')
  } catch (err) {
    console.error(err)
  }
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
