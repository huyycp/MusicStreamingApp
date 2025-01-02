import instance from '~/axiosConfig'
import { IResponse } from '~/type/IResponse'

export const apiGetProfile = async (): Promise<IResponse> => {
  const response = await instance.get<IResponse>('/users/me')
  return response.data
}

interface UpdateProfileData {
  name?: string
  image?: File | ''
  gender?: 'Male' | 'Female'
  premium?: boolean
}

export const apiUpdateProfile = async (data: UpdateProfileData): Promise<IResponse> => {
  const response = await instance.patch<IResponse>('/users/me', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data
}

export const apiGetListFollow = async (limit: number, page: number): Promise<IResponse> => {
  const response = await instance.get<IResponse>('/users/follow', {
    params: {
      limit,
      page
    }
  })
  return response.data
}

export const apiFollowUser = async (userId: string): Promise<IResponse> => {
  const response = await instance.post<IResponse>(`/users/follow/${userId}`)
  return response.data
}

export const apiUnFollowUser = async (userId: string): Promise<IResponse> => {
  const response = await instance.delete<IResponse>(`/users/follow/${userId}`)
  return response.data
}

export const apiCheckUploadLimit = async (): Promise<IResponse> => {
  const response = await instance.get<IResponse>('/users/upload-limit')
  return response.data
}

export const apiGetUserDetail = async (userId: string): Promise<IResponse> => {
  const response = await instance.get<IResponse>(`/users/${userId}`)
  return response.data
}
