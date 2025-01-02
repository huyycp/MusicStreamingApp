import { IDetailReport, IReportTrack, ITrackInfo, ITrackReport } from '../type/IReportTrack'
import instance from '../utils/request'
import { IUpdate } from './UserCardAPI'

// export interface IReportTrack {
//   message: string
//   result: {
//     data: [IDataReportTrack]
//     meta: {
//       items_per_page: number
//       total_items: number
//       current_page: number
//       total_pages: number
//     }
//   }
// }

export interface IDetailReportTrack {
  message: string
  result: {
    data: [ITrackReport]
    meta: {
      items_per_page: number
      total_items: number
      current_page: number
      total_pages: number
    }
  }
}

export interface ITrackReportInfo {
  message: string
  result: ITrackInfo
}

export const apiGetReportTrack = async (limit: number, page: number, search: string): Promise<IReportTrack> => {
  const response = await instance.get<IReportTrack>(`/admin/reports/tracks?page=${page}&limit=${limit}&search=${search}`)
  return response.data
}

export const apiGetDetailReportTrack = async (id: string, limit: number, page: number, search: string): Promise<IDetailReportTrack> => {
  const response = await instance.get<IDetailReportTrack>(`/admin/reports/tracks/${id}?limit=${limit}&page=${page}&search=${search}`)
  return response.data
}

export const apiGetInfoTrack = async (id: string): Promise<ITrackReportInfo> => {
  const response = await instance.get<ITrackReportInfo>(`/tracks/${id}`)
  return response.data
}

export const apiGetDetailReport = async (id: string): Promise<IDetailReport> => {
  const response = await instance.get<IDetailReport>(`/admin/reports/${id}`)
  return response.data
}

export const apiUpdateReport = async (id: string, data: { status?: string; rejection_reason?: string }): Promise<IUpdate> => {
  const response = await instance.patch<IUpdate>(`/admin/reports/${id}`, data)
  return response.data
}
