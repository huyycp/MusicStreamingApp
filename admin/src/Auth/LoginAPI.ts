import { IResponse } from '../type/IResponse'
import instance from '../utils/request'

export const apiLogin = async (data: { email: string; password: string }): Promise<IResponse> => {
  const response = await instance.post<IResponse>('/auth/login', data)
  return response.data
}

export const apiRefreshToken = async (data: { refresh_token: string }): Promise<IResponse> => {
  const response = await instance.post<IResponse>('/auth/refresh-token', data)
  return response.data
}