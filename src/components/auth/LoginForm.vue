<script setup lang="ts">
import BaseButton from '../commons/BaseButton.vue'
import BaseInput from '../commons/BaseInput.vue'
import { ref } from 'vue'
import type { LoginErrors, LoginRequest } from '@/models/auth.model'
import { useAuth } from '@/stores/auth.store'
import { useRouter,useRoute } from 'vue-router'
import { validateLogin } from '@/validators/login.validator'


const store = useAuth()
const router = useRouter()
const route = useRoute()

const errors = ref<LoginErrors>({})

const loginForm = ref<LoginRequest>({
  email: '',
  password: '',
})

const clearError = (field: keyof LoginErrors) => {
  delete errors.value[field]
}

const login = async () => {

  errors.value = validateLogin(loginForm.value)
  if (Object.keys(errors.value).length > 0) return

  try {
    await store.authentication(loginForm.value)
    const redirectTo = typeof route.query.redirect === 'string' ? route.query.redirect : '/home'
    router.push(redirectTo)
  } catch (err) {
    console.error(err)
  }
}
</script>

<template>
  <h1>Login</h1>
  <form @submit.prevent="login" class="login-form">
    <BaseInput
      label="Email"
      id="email-input"
      type="text"
      v-model="loginForm.email"
      :error="errors.email"
      @update:model-value="clearError('email')"

    />
    <BaseInput
      label="Password"
      id="password-input"
      type="password"
      v-model="loginForm.password"
      :error="errors.password"
      @update:model-value="clearError('password')"
    />
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
