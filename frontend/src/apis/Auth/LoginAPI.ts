import instance from '~/axiosConfig'
import { IResponse } from '~/type/IResponse'

export const apiLogin = async (data: { email: string; password: string; type?: '' | 'oauth' }): Promise<IResponse> => {
  const response = await instance.post<IResponse>('/auth/login', data)
  return response.data
}

export const apiRefreshToken = async (data: { refresh_token: string }): Promise<IResponse> => {
  const response = await instance.post<IResponse>('/auth/refresh-token', data)
  return response.data
}

export const apiForgotPassword = async (data: { email: string }): Promise<IResponse> => {
  const response = await instance.post<IResponse>('/auth/forgot-password', data)
  return response.data
}

export const apiVerifyPassword = async (data: { email: string; otp: string }): Promise<IResponse> => {
  const response = await instance.post<IResponse>('/auth/verify-forgot-password', data)
  return response.data
}

export const apiResetPassword = async (data: { email: string; password: string }): Promise<IResponse> => {
  const response = await instance.post<IResponse>('/auth/reset-password', data)
  return response.data
}
