import instance from '~/axiosConfig'
import { IResponse } from '~/type/IResponse'

export const apiGetNotifications = async (limit: number, page: number): Promise<IResponse> => {
  const response = await instance.get<IResponse>('/notifications', {
    params: {
      limit,
      page
    }
  })
  return response.data
}

export const apiReadNotification = async (notificationId: string): Promise<IResponse> => {
  const response = await instance.patch<IResponse>(`/notifications/${notificationId}`)
  return response.data
}

export const apiReadAllNotification = async (): Promise<IResponse> => {
  const response = await instance.patch<IResponse>('/notifications')
  return response.data
}

export const apiCountUnreadNotification = async (): Promise<IResponse> => {
  const response = await instance.get<IResponse>('/notifications/count')
  return response.data
}
