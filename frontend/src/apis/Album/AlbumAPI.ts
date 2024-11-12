import instance from '~/axiosConfig'
import { IResponse } from '~/type/IResponse'

export const apiCreateAlbum = async (formData: FormData): Promise<IResponse> => {
  const response = await instance.post<IResponse>('/libraries/albums', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data
}

export const apiGetMyLibrary = async (limit: number, page: number): Promise<IResponse> => {
  const response = await instance.get<IResponse>(`/libraries/my-libraries?limit=${limit}&page=${page}`)
  return response.data
}

export const apiGetMyPlaylists = async (limit: number, page: number): Promise<IResponse> => {
  const response = await instance.get<IResponse>(`/libraries/my-libraries?type=playlist&limit=${limit}&page=${page}`)
  return response.data
}

export const getAlbumDetail = async (albumId: string): Promise<IResponse> => {
  const response = await instance.get<IResponse>(`/albums/${albumId}`)
  return response.data
}

export const apiAddTrackToLibrary = async (data: { tracks: string[]; library_id: string }): Promise<IResponse> => {
  const response = await instance.patch<IResponse>(`/libraries/${data.library_id}/tracks`, { track_list: JSON.stringify(data.tracks) })
  return response.data
}

export const apiGetAlbumsByArtist = async (limit: number, page: number): Promise<IResponse> => {
  const response = await instance.get<IResponse>(`/libraries/my-libraries?type=album&limit=${limit}&page=${page}`)
  return response.data
}

export const apiGetAlbums = async (limit: number, page: number): Promise<IResponse> => {
  const response = await instance.get<IResponse>(`/libraries/albums?limit=${limit}&page=${page}`)
  return response.data
}

export const apiGetLibraryItem = async (libraryId: string): Promise<IResponse> => {
  const response = await instance.get<IResponse>(`/libraries/${libraryId}`)
  return response.data
}

export const apiCreatePlaylist = async (data: { name: string }): Promise<IResponse> => {
  const response = await instance.post<IResponse>('/libraries/playlists', data)
  return response.data
}
