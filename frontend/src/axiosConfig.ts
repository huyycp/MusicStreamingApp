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

    // Kiểm tra nếu request chưa được retry và lỗi là 401 (Unauthorized)
    if (originalRequest && error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refresh_token = localStorage.getItem('refresh_token')
        if (refresh_token) {
          // Gọi API refresh token
          const response = await apiRefreshToken({ refresh_token })

          if (response) {
            // Lưu access_token mới vào localStorage
            localStorage.setItem('access_token', response.result.access_token)
            localStorage.setItem('refresh_token', response.result.refresh_token)

            // Cập nhật header Authorization với access_token mới
            originalRequest.headers.Authorization = 'Bearer ' + response.result.access_token

            // Gửi lại request ban đầu với access_token mới
            return instance(originalRequest)
          }
        } else {
          throw new Error('No refresh token available')
        }
      } catch (err) {
        // Xử lý khi refresh token thất bại
        return Promise.reject(err)
      }
    }

    return Promise.reject(error)
  }
)

export default instance
