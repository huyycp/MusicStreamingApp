import instance from '~/axiosConfig'
import { IResponse } from '~/type/IResponse'

export const apiGetProfile = async (): Promise<IResponse> => {
  const response = await instance.get<IResponse>('/users/me')
  return response.data
}