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
      const response = await register(userData)
      accessToken.value = response.data.access_token
      refreshToken.value = response.data.refresh_token

      localStorage.setItem('access_token', response.data.access_token)
      localStorage.setItem('refresh_token', response.data.refresh_token)

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
      const response = await authenticate(credentials)
      accessToken.value = response.data.access_token
      refreshToken.value = response.data.refresh_token

      localStorage.setItem('access_token', response.data.access_token)
      localStorage.setItem('refresh_token', response.data.refresh_token)

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

  const logout = () => {
    accessToken.value = ''
    refreshToken.value = ''
    user.value = null

    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
  }

  return {
    user,
    isAuthenticated,
    registerUser,
    authentication,
    logout,
  }
})
