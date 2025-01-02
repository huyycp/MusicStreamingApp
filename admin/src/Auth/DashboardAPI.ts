import IDashBoard, { ISearch, ITopAlbum, ITopArtist } from '../type/IDashBoard'
import instance from '../utils/request'

export const apiInfo = async (): Promise<IDashBoard> => {
  const response = await instance.get<IDashBoard>('/admin/dashboard')
  return response.data
}

export const apiGetTopAlbum = async (): Promise<ITopAlbum> => {
  const response = await instance.get<ITopAlbum>('/homes/top-albums-by-week')
  return response.data
}

export const apiGetTopArtist = async (): Promise<ITopArtist> => {
  const response = await instance.get<ITopArtist>('/homes/top-artists-all-time')
  return response.data
}

export const apiSearch = async (search: string): Promise<ISearch> => {
  const response = await instance.get<ISearch>(`/search?keyword=${search}`)
  return response.data
}
