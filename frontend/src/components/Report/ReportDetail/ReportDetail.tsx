import { useRef } from 'react'
import { Card, CardContent, CardHeader, Typography, Box, Chip } from '@mui/material'
import { useParams } from 'react-router-dom'
import useGetReportDetail from '~/hooks/Report/useGetReportDetail'
import { IReport } from '~/type/Report/IReport'
import { getStatusColor, translateReason, translateStatus } from '~/type/Report/ReportData'

export const ReportDetail = () => {
  const { reportId } = useParams<{ reportId: string }>()
  const { data } = useGetReportDetail(reportId)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const report = data?.result as IReport

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (!report)
    return (
      <Card sx={{ width: '100%', mr: '-18px', bgcolor: 'inherit' }}>
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '300px',
              color: (theme) => theme.palette.secondary4.main
            }}
          >
            <Typography variant='h5'>Không tìm thấy báo cáo</Typography>
          </Box>
        </CardContent>
      </Card>
    )

  return (
    <Card sx={{ width: '100%', mr: '-18px', bgcolor: 'inherit' }}>
      <CardHeader
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
        action={<Chip label={translateStatus(report.status)} color={getStatusColor(report.status)} sx={{ textTransform: 'capitalize' }} />}
        title={
          <Typography
            variant='h5'
            fontWeight='bold'
            sx={{
              color: (theme) => theme.palette.secondary4.main
            }}
          >
            {report.subject}
          </Typography>
        }
      />
      <CardContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant='body2' color='textSecondary' sx={{ fontWeight: 'bold', color: (theme) => theme.palette.secondary4.main }}>
            Lý do báo cáo:
          </Typography>
          <Box sx={{ ml: 2, display: 'flex', gap: 1 }}>
            {report.reason.map((reason, index) => (
              <Chip
                key={index}
                label={translateReason(reason)}
                variant='outlined'
                size='small'
                sx={{
                  mb: 1,
                  bgcolor: (theme) => theme.palette.neutral.neutral2,
                  color: (theme) => theme.palette.secondary4.main,
                  borderColor: (theme) => theme.palette.neutral.neutral2
                }}
              />
            ))}
          </Box>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant='body2' sx={{ fontWeight: 'bold', color: (theme) => theme.palette.secondary4.main }}>
            Nội dung báo cáo:
          </Typography>
          <Typography variant='body2' color='textSecondary' sx={{ ml: 2, color: (theme) => theme.palette.neutral.neutral1 }}>
            {report.body}
          </Typography>
        </Box>

        {report.image && report.image.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography variant='body2' sx={{ fontWeight: 'bold', color: (theme) => theme.palette.secondary4.main, pb: 1 }}>
              Hình ảnh đính kèm:
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 2, height: 'auto' }}>
              {report.image.map((img, index) => (
                <Box key={index} sx={{ position: 'relative', paddingTop: '56.25%' }}>
                  <img
                    src={img}
                    alt={`Evidence ${index + 1}`}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100px', aspectRatio: 1 / 1, objectFit: 'fill', borderRadius: '8px' }}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        )}

        {report.path_audio && (
          <Box sx={{ mb: 3 }}>
            <Typography variant='body2' sx={{ fontWeight: 'bold', color: (theme) => theme.palette.secondary4.main }}>
              File âm thanh:
            </Typography>
            <Box sx={{ ml: 2 }}>
              <audio ref={audioRef} controls preload='auto' style={{ width: '100%', marginTop: '10px' }}>
                <source src={report.path_audio} />
                Trình duyệt của bạn không hỗ trợ thẻ audio.
              </audio>
            </Box>
          </Box>
        )}

        <Box sx={{ borderTop: 1, pt: 2, mt: 3, color: (theme) => theme.palette.secondary4.main }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
            <Typography sx={{ color: (theme) => theme.palette.secondary4.main }}>Ngày tạo: {formatDate(report.created_at)}</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}
