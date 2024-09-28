import instance from '~/axiosConfig'
import { ITrack } from '~/type/Tracks/ITrack'

export const apiGetTracks = async (): Promise<{ message: string; result: ITrack[] }> => {
  const response = await instance.get<{ message: string; result: ITrack[] }>('/tracks/get-list-track')
  return response.data
}
