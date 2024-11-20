import instance from '~/axiosConfig'

export const apiReportTrack = async (trackId: string, data: { reason: string; subject: string; body: string }) => {
  const response = await instance.post(`/reports/tracks/${trackId}`, data)
  return response.data
}
