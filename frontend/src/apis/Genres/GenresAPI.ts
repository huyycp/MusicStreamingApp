import instance from '~/axiosConfig'
import { IResponse } from '~/type/IResponse'

export const apiGetGenres = async (): Promise<IResponse> => {
  const response = await instance.get<IResponse>('/genres')
  return response.data
}
