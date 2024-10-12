import instance from '~/axiosConfig'
import { IResponse } from '~/type/IResponse'

export const apiCreateAlbum = async (formData: FormData): Promise<IResponse> => {
  const response = await instance.post<IResponse>('/albums', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data
}

export const getAlbumDetail = async (albumId: string): Promise<IResponse> => {
  const response = await instance.get<IResponse>(`/albums/${albumId}`)
  return response.data
}

export const apiGetAlbumsByArtist = async (limit: number, page: number): Promise<IResponse> => {
  const response = await instance.get<IResponse>(`/albums/my-albums?limit=${limit}&page=${page}`)
  return response.data
}

export const apiAddTrackToAlbum = async (data: { tracks: string[]; album_id: string }): Promise<IResponse> => {
  const response = await instance.patch<IResponse>(`/albums/${data.album_id}/tracks`, { track_list: JSON.stringify(data.tracks) })
  return response.data
}
