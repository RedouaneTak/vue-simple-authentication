import api from '@/api/axios'
import type { LoginRequest, RegisterRequest } from '@/models/auth.model'

export const authenticate = async (credentials: LoginRequest) => {
  const response = await api.post('auth/authenticate', credentials)
  return response.data
}

export const register = async (userData: RegisterRequest) => {
  const response = await api.post('auth/register', userData)
  return response.data
}

export const getUserInfo = async () => {
  const response = await api.get('auth/me')
  return response.data
}
