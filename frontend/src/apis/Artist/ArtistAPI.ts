import instance from '~/axiosConfig'
import { IResponse } from '~/type/IResponse'

export const apiGetArtists = async (limit: number, page: number): Promise<IResponse> => {
  const response = await instance.get<IResponse>(`/artists?limit=${limit}&page=${page}`)
  return response.data
}

export const apiGetArtistAlbums = async (artistId: string, limit: number, page: number): Promise<IResponse> => {
  const response = await instance.get<IResponse>(`/artists/${artistId}/albums?limit=${limit}&page=${page}`)
  return response.data
}
