import { Report as ReportIcon, Image as ImageIcon, AudioFile as AudioFileIcon } from '@mui/icons-material'
import useGetMyReports, { TrackStatus } from '~/hooks/Report/useGetMyReports'
import { useUser } from '~/hooks/useUser'
import { IReport } from '~/type/Report/IReport'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import { useState } from 'react'
import { CircularProgress } from '@mui/material'
import { getStatusColor, STATUS_OPTIONS, translateReason, translateStatus } from '~/type/Report/ReportData'

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export const ReportList = () => {
  const [selectedStatus, setSelectedStatus] = useState<TrackStatus>('all')
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } = useGetMyReports(2, selectedStatus)
  const { user } = useUser()
  const navigate = useNavigate()

  const handleStatusChange = (newStatus: TrackStatus) => {
    setSelectedStatus(newStatus)
  }

  const loadMoreReport = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }

  const reports = data?.pages.flatMap((page) => page.result.data) as IReport[]

  if (!user)
    return (
      <Box sx={{ width: '100%' }}>
        <Box sx={{ p: 2, color: (theme) => theme.palette.secondary4.main }}>
          <Typography variant='body1'>Vui lòng đăng nhập để xem báo cáo của bạn.</Typography>
        </Box>
      </Box>
    )

  if (!data && !isPending)
    return (
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box sx={{ p: 2, color: (theme) => theme.palette.secondary4.main }}>
          <Typography variant='h4'>Không có báo cáo nào.</Typography>
        </Box>
      </Box>
    )

  return (
    <Box sx={{ width: '100%', ml: '-18px', m: 'unset' }}>
      <Typography variant='h3' noWrap sx={{ p: 2 }}>
        Báo cáo của tôi
      </Typography>

      <Stack direction='row' spacing={1} sx={{ mb: 2, px: 2 }}>
        {STATUS_OPTIONS.map((status) => (
          <Chip
            key={status.value}
            label={status.label}
            color={selectedStatus === status.value ? getStatusColor(status.value) : 'default'}
            onClick={() => handleStatusChange(status.value)}
            variant={selectedStatus === status.value ? 'filled' : 'outlined'}
            sx={{
              color: (theme) => theme.palette.secondary4.main
            }}
          />
        ))}
      </Stack>
      {isPending && (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress size='24' color='success' />
        </Box>
      )}
      {reports?.map((report) => (
        <Card
          key={report._id}
          sx={{
            'mb': 2,
            'backgroundColor': 'inherit',
            'p': 'unset',
            '&:hover': {
              backgroundColor: (theme) => theme.palette.neutral.neutral3
            },
            'cursor': 'pointer'
          }}
          onClick={() => navigate(`/report/${report._id}`)}
        >
          <CardHeader
            sx={{
              'pb': 1,
              '& .MuiCardHeader-content': { width: '100%' }
            }}
            title={
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 1,
                      color: (theme) => theme.palette.secondary4.main
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                      }}
                    >
                      <ReportIcon sx={{ color: 'error.main' }} />
                      <Typography
                        variant='h6'
                        sx={{
                          color: (theme) => theme.palette.secondary4.main
                        }}
                      >
                        {report.subject}
                      </Typography>
                    </Box>
                    <Typography
                      variant='subtitle2'
                      sx={{
                        color: (theme) => theme.palette.neutral.neutral1
                      }}
                    >
                      Được tạo {formatDate(report.created_at)}
                    </Typography>
                  </Box>
                </Box>
                <Chip label={translateStatus(report.status)} color={getStatusColor(report.status)} sx={{ textTransform: 'capitalize' }} />
              </Box>
            }
          />

          <CardContent>
            <Stack spacing={2}>
              <Box>
                <Typography variant='subtitle2' sx={{ mb: 1, color: (theme) => theme.palette.secondary4.main }}>
                  Loại báo cáo
                </Typography>
                <Stack direction='row' spacing={1} flexWrap='wrap'>
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
                </Stack>
              </Box>

              <Box>
                <Typography color='text.secondary' variant='subtitle2' sx={{ mb: 1, color: (theme) => theme.palette.secondary4.main }}>
                  Nội dung
                </Typography>
                <Typography variant='body1' sx={{ color: (theme) => theme.palette.neutral.neutral1, fontSize: 14 }}>
                  {report.body}
                </Typography>
              </Box>

              <Stack direction='row' spacing={2}>
                {report.image && report.image.length > 0 && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: (theme) => theme.palette.secondary4.main }}>
                    <ImageIcon />
                    <Typography variant='body2'>{report.image.length} hình ảnh đính kèm</Typography>
                  </Box>
                )}

                {report.path_audio && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: (theme) => theme.palette.secondary4.main }}>
                    <AudioFileIcon />
                    <Typography variant='body2'>Audio đính kèm</Typography>
                  </Box>
                )}
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      ))}
      {hasNextPage && (
        <Box textAlign='center' py={1} color='gray'>
          <button
            onClick={loadMoreReport}
            disabled={isFetchingNextPage}
            style={{
              background: 'none',
              border: 'none',
              cursor: isFetchingNextPage ? 'not-allowed' : 'pointer',
              color: 'gray',
              fontSize: '14px'
            }}
          >
            {isFetchingNextPage ? 'Đang tải...' : 'Tải thêm'}
          </button>
        </Box>
      )}
    </Box>
  )
}
