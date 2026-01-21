import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { LoginRequest, RegisterRequest, User } from '@/models/auth.model'
import { register, authenticate, getUserInfo } from '@/api/auth.api'
import axios from 'axios'

export const useAuth = defineStore('auth', () => {
  const user = ref<User | null>({
    firstname: '',
    lastname: '',
    email: '',
    role: '',
  })

  const accessToken = ref<string>('')
  const refreshToken = ref<string>('')

  const isAuthenticated = computed(() => !!accessToken.value)

  const registerUser = async (userData: RegisterRequest) => {
    try {
      const data = await register(userData)
      accessToken.value = data.data.access_token
      refreshToken.value = data.data.refresh_token

      localStorage.setItem('access_token', data.data.access_token)
      localStorage.setItem('refresh_token', data.data.refresh_token)

      user.value = await getUserInfo()
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error(err.response?.data ?? err.message)
      } else {
        console.error(err)
      }
      throw err
    }
  }

  const authentication = async (credentials: LoginRequest) => {
    try {
      const data = await authenticate(credentials)

      accessToken.value = data.data.access_token
      refreshToken.value = data.data.refresh_token

      localStorage.setItem('access_token', data.data.access_token)
      localStorage.setItem('refresh_token', data.data.refresh_token)

      user.value = await getUserInfo()
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error(err.response?.data ?? err.message)
      } else {
        console.error(err)
      }
      throw err
    }
  }

  return {
    user,
    isAuthenticated,
    registerUser,
    authentication,
  }
})
