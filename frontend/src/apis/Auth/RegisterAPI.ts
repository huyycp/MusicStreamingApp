import instance from '~/axiosConfig'
import { RegisterData } from '~/type/Auth/RegisterData'
import { IResponse } from '~/type/IResponse'

export const apiRegister = async (data: RegisterData): Promise<IResponse> => {
  const response = await instance.post<IResponse>('/auth/register', data)
  return response.data
}

export const apiVerifyEmail = async (data: { email: string; otp: string }): Promise<IResponse> => {
  const response = await instance.post<IResponse>('/auth/verify-email', data)
  return response.data
}

export const apiGetOTP = async (data: { email: string }): Promise<IResponse> => {
  const response = await instance.post<IResponse>('/auth/get-otp-verify', data)
  return response.data
}

export const apiCheckEmail = async (data: { email: string }): Promise<IResponse> => {
  const response = await instance.post<IResponse>('/auth/check-email', data)
  return response.data
}
