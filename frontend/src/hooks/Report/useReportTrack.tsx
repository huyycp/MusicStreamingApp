import { useMutation } from '@tanstack/react-query'
import { apiReportTrack } from '~/apis/Report/ReportAPI'

const useReportTrack = () => {
  return useMutation({
    mutationFn: ({ trackId, data }: { trackId: string; data: { reason: string; subject: string; body: string } }) => apiReportTrack(trackId, data)
  })
}

export default useReportTrack
