import instance from '~/axiosConfig'
import { IResponse } from '~/type/IResponse'

export const apiGetAlbumWeeklyTopView = async (): Promise<IResponse> => {
  const response = await instance.get<IResponse>('/homes/top-albums-by-week')
  return response.data
}

export const apiGetTrackWeeklyTopView = async (): Promise<IResponse> => {
  const response = await instance.get<IResponse>('/homes/top-tracks-by-week')
  return response.data
}

export const apiGetArtistWeeklyTopView = async (): Promise<IResponse> => {
  const response = await instance.get<IResponse>('/homes/top-artists-by-week')
  return response.data
}

export const apiGetAlbumTopView = async (): Promise<IResponse> => {
  const response = await instance.get<IResponse>('/homes/top-albums-all-time')
  return response.data
}

export const apiGetArtistTopView = async (): Promise<IResponse> => {
  const response = await instance.get<IResponse>('/homes/top-artists-all-time')
  return response.data
}

export const apiGetTopFollowedArtist = async (): Promise<IResponse> => {
  const response = await instance.get<IResponse>('/homes/top-artists-by-followers')
  return response.data
}
