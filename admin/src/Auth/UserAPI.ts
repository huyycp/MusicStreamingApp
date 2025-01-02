import instance from '../utils/request'
import { IUser } from '../type/IUser'
import { IPagination } from '../type/IPagination'

export interface ITrackResponse {
  message: string
  result: {
    data: IUser[]
    meta: IPagination
  }
}

export const apiGetUsers = async (limit: number, page: number, role_type: string, search: string): Promise<ITrackResponse> => {
  let url = `/admin/users?limit=${limit}&page=${page}&search=${search}`
  if (role_type) {
    url += `&role_type=${role_type}`
  }

  const response = await instance.get<ITrackResponse>(url)
  return response.data
}
