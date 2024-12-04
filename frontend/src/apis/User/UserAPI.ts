import instance from '~/axiosConfig'
import { IResponse } from '~/type/IResponse'

export const apiGetProfile = async (): Promise<IResponse> => {
  const response = await instance.get<IResponse>('/users/me')
  return response.data
}

export const apiUpdateProfile = async (data: Record<string, unknown>): Promise<IResponse> => {
  const response = await instance.patch<IResponse>('/users/me', data)
  return response.data
}
