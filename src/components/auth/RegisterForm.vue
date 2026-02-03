<script setup lang="ts">
import BaseButton from '../commons/BaseButton.vue'
import BaseInput from '../commons/BaseInput.vue'
import { ref} from 'vue'
import type { RegisterRequest,RegisterErrors } from '@/models/auth.model'
import { validateRegister } from '@/validators/register.validator'
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

  errors.value = validateRegister(registerForm.value)
  if (Object.keys(errors.value).length > 0) return

  try {
    await store.registerUser(registerForm.value)
    router.push('/home')
  } catch (err) {
    console.error(err)
  }
}

const clearError = (field: keyof RegisterErrors) => {
  delete errors.value[field]
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
      :error="errors.firstname"
      @update:model-value="clearError('firstname')"
    />

    <BaseInput
      label="Lastname"
      id="lastname-input"
      type="text"
      v-model="registerForm.lastname"
      :error="errors.lastname"
      @update:model-value="clearError('lastname')"
    />
    <BaseInput
      label="Email"
      id="email-input"
      type="text"
      v-model="registerForm.email"
      :error="errors.email"
      @update:model-value="clearError('email')"
    />

    <BaseInput
      label="Password"
      id="password-input"
      type="password"
      v-model="registerForm.password"
      :error="errors.password"
      @update:model-value="clearError('password')"
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
