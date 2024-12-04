import instance from '~/axiosConfig'

export const apiReportTrack = async (trackId: string, data: { reason: string[]; subject: string; body: string; image: File[]; audio: File }) => {
  const formData = new FormData()
  formData.append('subject', data.subject)
  formData.append('body', data.body)
  data.reason.forEach((reason) => {
    formData.append('reason', reason)
  })
  data.image.forEach((image) => {
    formData.append('image', image)
  })
  formData.append('audio', data.audio)

  const response = await instance.post(`/reports/tracks/${trackId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data
}
