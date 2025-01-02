import instance from '~/axiosConfig'
import { IResponse } from '~/type/IResponse'

export const apiUploadMusic = async (formData: FormData): Promise<IResponse> => {
  const response = await instance.post<IResponse>('/tracks', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data
}
