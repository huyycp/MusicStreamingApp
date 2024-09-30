import instance from '~/axiosConfig'
import { ITrack } from '~/type/Tracks/ITrack'

export interface ITrackResponse {
  message: string
  result: {
    data: ITrack[]
  }
}

export const apiGetTracks = async (limit: number, page: number): Promise<ITrackResponse> => {
  const response = await instance.get<ITrackResponse>(`/tracks/get-list-tracks?limit=${limit}&page=${page}`)
  return response.data
}
