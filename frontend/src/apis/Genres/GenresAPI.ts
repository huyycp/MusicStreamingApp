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

export const apiGetGenresDetail = async (genres: string): Promise<IResponse> => {
  const response = await instance.get<IResponse>(`/genres/${genres}`)
  return response.data
}

export const apiGetTracksByGenres = async (genres: string | undefined, limit: number, page: number): Promise<IResponse> => {
  const response = await instance.get<IResponse>(`/tracks?limit=${limit}&page=${page}&genre=${genres}`)
  return response.data
}
