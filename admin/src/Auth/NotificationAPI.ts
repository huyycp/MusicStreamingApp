import { INotification, IReadNoti } from '../type/INotification'
import instance from '../utils/request'

export const apiGetNoti = async (limit: number, page: number): Promise<INotification> => {
  const response = await instance.get<INotification>(`/notifications?limit=${limit}&page=${page}`)
  return response.data
}

export const apiPatchReadNoti = async (id: string): Promise<IReadNoti> => {
  const response = await instance.patch<IReadNoti>(`/notifications/${id}`)
  return response.data
}
