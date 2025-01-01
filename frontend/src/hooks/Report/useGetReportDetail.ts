import { useQuery } from '@tanstack/react-query'
import { apiGetReportDetail } from '~/apis/Report/ReportAPI'

const useGetReportDetail = (reportId: string | undefined) =>
  useQuery({
    queryKey: ['report', reportId],
    queryFn: () => apiGetReportDetail(reportId as string),
    enabled: !!reportId
  })

export default useGetReportDetail
