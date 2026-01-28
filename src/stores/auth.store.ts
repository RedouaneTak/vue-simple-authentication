import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { LoginRequest, RegisterRequest, User } from '@/models/auth.model'
import { register, authenticate, getUserInfo, getNewAcessToken } from '@/api/auth.api'
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

  const isAuthenticated = computed<boolean>(() => !!accessToken.value)

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

  const checkAuth = async ()=>{

    const token = localStorage.getItem('access_token')
    const refresh = localStorage.getItem('refresh_token')

    if(token && refresh){
      accessToken.value = token;
      refreshToken.value = refresh
      user.value = await getUserInfo()
    }
  }

  const refreshAccessToken = async ()=>{
    if (!refreshToken.value) throw new Error('No refresh token')
    const data = await getNewAcessToken(refreshToken.value);
    return data;
  }

  return {
    user,
    isAuthenticated,
    accessToken,
    refreshToken,
    registerUser,
    authentication,
    logout,
    checkAuth,
    refreshAccessToken
  }
})
