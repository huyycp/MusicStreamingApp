import instance from '~/axiosConfig'
import { IResponse } from '~/type/IResponse'

export const apiLogout = async (data: { refresh_token: string }): Promise<IResponse> => {
  const response = await instance.post<IResponse>('/auth/logout', data)
  return response.data
}
