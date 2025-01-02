import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { apiRefreshToken } from './apis/Auth/LoginAPI'

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean
}

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_ROOT,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 60000 * 3
})

instance.interceptors.request.use(
  async function (config: CustomAxiosRequestConfig) {
    const tokenString = window.localStorage.getItem('access_token')
    let token: string | null = null

    if (tokenString) {
      try {
        token = tokenString
      } catch (e) {
        return Promise.reject(e)
      }
    }

    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }

    return config
  },
  function (error: AxiosError) {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  function (response: AxiosResponse) {
    return response
  },
  async function (error: AxiosError) {
    const originalRequest = error.config as CustomAxiosRequestConfig

    // Kiểm tra nếu chưa retry và lỗi là 401
    const refresh_token = localStorage.getItem('refresh_token')
    if (originalRequest && error.response?.status === 401 && !originalRequest._retry && refresh_token) {
      originalRequest._retry = true // Đánh dấu đã retry

      try {
        if (refresh_token) {
          // Gọi API refresh token
          const response = await apiRefreshToken({ refresh_token })

          if (response && response.result?.access_token) {
            // Lưu token mới
            localStorage.setItem('access_token', response.result.access_token)
            localStorage.setItem('refresh_token', response.result.refresh_token)

            // Cập nhật header Authorization
            originalRequest.headers.Authorization = 'Bearer ' + response.result.access_token

            // Gửi lại request
            return instance(originalRequest)
          } else {
            throw new Error('Failed to refresh token - Invalid response')
          }
        } else {
          return Promise.reject(error)
        }
      } catch (refreshError) {
        return Promise.reject(refreshError)
      }
    }
    else {
      originalRequest._retry = true
      return Promise.reject(error)
    }
  }
)

export default instance
