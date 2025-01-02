import { IDetailTrack, IListTrack, IListTrackOfAlbum } from '../type/ITrackModeration'
import instance from '../utils/request'
import { IUpdate } from './UserCardAPI'

export const apiGetListTrack = async (limit: number, page: number, search: string): Promise<IListTrack> => {
  const response = await instance.get<IListTrack>(`/admin/tracks/pending?page=${page}&limit=${limit}&search=${search}`)
  return response.data
}

export const apiUpdateTrack = async (user_id: string, data: { status?: string }): Promise<IUpdate> => {
  const response = await instance.patch<IUpdate>(`/admin/tracks/${user_id}`, data)
  return response.data
}

export const apiGetDetailTrack = async (id: string): Promise<IDetailTrack> => {
  const response = await instance.get<IDetailTrack>(`/tracks/${id}`)
  return response.data
}

export const apiGetListTrackOfAlbum = async (id: string, limit: number, page: number, search: string): Promise<IListTrackOfAlbum> => {
  const response = await instance.get<IListTrackOfAlbum>(`/libraries/${id}/tracks?page=${page}&limit=${limit}&search=${search}`)
  return response.data
}
