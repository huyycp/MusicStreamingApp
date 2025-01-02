import { IDetailAlbum, IUserAlbums } from '../type/IUserAlbums'
import { IUserCard } from '../type/IUserCard'
import instance from '../utils/request'

export interface IUpdate {
  message: string
}

export const apiGetUserCard = async (user_id: string): Promise<IUserCard> => {
  const response = await instance.get<IUserCard>(`/admin/users/${user_id}`)
  return response.data
}

export const apiGetUserAlbums = async (user_id: string, limit: number, page: number, search: string): Promise<IUserAlbums> => {
  const response = await instance.get<IUserAlbums>(`/admin/users/${user_id}/albums?page=${page}&limit=${limit}&search=${search}`)
  return response.data
}

export const apiUpdateUser = async (user_id: string, data: { role?: string; verify?: string }): Promise<IUpdate> => {
  const response = await instance.patch<IUpdate>(`/admin/users/${user_id}`, data)
  return response.data
}

export const apiGetDetailAlbum = async (libraries: string): Promise<IDetailAlbum> => {
  const response = await instance.get<IDetailAlbum>(`/libraries/${libraries}`)
  return response.data
}
