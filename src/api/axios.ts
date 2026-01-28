import { useAuth } from '@/stores/auth.store'
import axios from 'axios'
import type { AxiosError, AxiosRequestConfig } from 'axios'

interface FailedRequest {
  resolve: (token: string) => void
  reject: (error: AxiosError) => void
}

let failedQueue: FailedRequest[] = []
let isRefreshing = false

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {

    console.log(config.url);
    if (config.url?.includes('auth/refresh-token')) {
      return config
    }

    const token = localStorage.getItem('access_token')
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config



  },
  (error) => Promise.reject(error),
)

const processQueue = (error: AxiosError | null, token: string | null = null): void => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error)
    else if (token) prom.resolve(token)
  })
  failedQueue = []
}

api.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean
    }

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers = {
                ...originalRequest.headers,
                Authorization: `Bearer ${token}`,
              }
              resolve(api(originalRequest))
            },
            reject,
          })
        })
      }

      isRefreshing = true
      const authStore = useAuth()

      try {
        const data = await authStore.refreshAccessToken()

        const newAccessToken = data.access_token as string
        const newRefreshToken = data.refresh_token as string | undefined

        localStorage.setItem('access_token', newAccessToken)
        if (newRefreshToken) {
          localStorage.setItem('refresh_token', newRefreshToken)
        }

        authStore.accessToken = newAccessToken
        if (newRefreshToken) {
          authStore.refreshToken = newRefreshToken
        }

        await authStore.checkAuth()

        api.defaults.headers.Authorization = `Bearer ${newAccessToken}`

        processQueue(null, newAccessToken)

        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${newAccessToken}`,
        }

        return api(originalRequest)
      } catch (err) {
        processQueue(err as AxiosError, null)
        authStore.logout()
        return Promise.reject(err)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

export default api
