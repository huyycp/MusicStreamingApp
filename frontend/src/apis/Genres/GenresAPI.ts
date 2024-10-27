import instance from '~/axiosConfig'
import { IResponse } from '~/type/IResponse'

export const apiGetGenres = async (): Promise<IResponse> => {
  const response = await instance.get<IResponse>('/genres')
  return response.data
}

export const apiChangeGenres = async (genres: string[]): Promise<IResponse> => {
  const response = await instance.patch<IResponse>('/genres/favorite', { genres: JSON.stringify(genres) })
  return response.data
}
