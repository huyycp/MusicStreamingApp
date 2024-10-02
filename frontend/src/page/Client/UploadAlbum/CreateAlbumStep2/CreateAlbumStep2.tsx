import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress'
import { styled, useTheme } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Checkbox from '@mui/material/Checkbox'
import { useGetCreateAlbumData } from '~/hooks/useGetCreateAlbumData'
import useGetTracksByArtist from '~/hooks/Tracks/useGetTracksByArtist'
import Paper from '@mui/material/Paper'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 2,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.neutral.neutral1
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.primary.main
  }
}))

export default function UploadStep2() {
  const { data: myTrackListResponse, isPending } = useGetTracksByArtist()
  const myTrackList = myTrackListResponse?.result.data
  const theme = useTheme()
  const textColor = theme.palette.secondary4.main

  const { name, imageFile, setTrackList, setImageFile } = useGetCreateAlbumData()
  const navigate = useNavigate()

  // Trạng thái lưu trữ ID bài hát đã chọn (sử dụng string[])
  const [selectedTracks, setSelectedTracks] = useState<string[]>([])

  useEffect(() => {
    if (!name) {
      navigate('/create-album')
    } else if (!imageFile) {
      navigate('/create-album/step1')
    }
  }, [imageFile, name, navigate])

  // Hàm xử lý việc chọn hoặc bỏ chọn bài hát
  const handleToggleTrack = (id: string) => {
    setSelectedTracks((prev) => (prev.includes(id) ? prev.filter((trackId) => trackId !== id) : [...prev, id]))
  }

  // Hàm xử lý nút xóa các bài hát đã chọn
  const handleDeleteSelected = () => {
    setSelectedTracks([])
  }

  // Hàm xử lý nút tiếp theo
  const handleNext = () => {
    setTrackList(selectedTracks) // Thiết lập các ID bài hát đã chọn
  }

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 3
      }}
    >
      <BorderLinearProgress variant='determinate' value={Math.floor((2 / 2) * 100)} sx={{ width: '100%', mt: 0.5 }} />
      <Box sx={{ width: '100%', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'start', gap: 1 }}>
        <ArrowBackIosNewIcon
          sx={{
            'cursor': 'pointer',
            'height': '100%',
            'width': '56px',
            'padding': '16px',
            'color': (theme) => theme.palette.neutral.neutral2,
            '&:hover': {
              color: (theme) => theme.palette.secondary4.main
            }
          }}
          onClick={() => {
            setImageFile(null)
            navigate('/create-album/step1')
          }}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, fontSize: 14, pb: 3 }}>
          <Box sx={{ color: (theme) => theme.palette.neutral.neutral1 }}>Bước 2/2</Box>
          <Box sx={{ color: (theme) => theme.palette.secondary4.main, fontWeight: 'bold' }}>Chọn các bài hát</Box>
        </Box>
      </Box>

      {/* Bảng hiển thị bài hát */}
      {myTrackList && (
        <TableContainer component={Paper} sx={{ minWidth: 150, maxWidth: '300%', overflow: 'auto', bgcolor: 'transparent', width: '1000px' }}>
          <Table aria-label='music table' sx={{ tableLayout: 'fixed' }}>
            <TableHead sx={{ bgcolor: (theme) => theme.palette.secondary5.main }}>
              <TableRow>
                <TableCell padding='checkbox' sx={{ color: textColor }}>
                  <Checkbox
                    checked={selectedTracks.length === myTrackList.length}
                    onChange={() => {
                      if (selectedTracks.length === myTrackList.length) {
                        setSelectedTracks([])
                      } else {
                        setSelectedTracks(myTrackList.map((track) => track._id))
                      }
                    }}
                  />
                </TableCell>
                <TableCell align='left' sx={{ color: textColor }}>
                  Tên bài hát
                </TableCell>
                <TableCell align='left' sx={{ color: textColor }}>
                  Nghệ sĩ
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ bgcolor: theme.palette.neutral.neutral3 }}>
              {myTrackList.map((track) => (
                <TableRow key={track._id}>
                  <TableCell padding='checkbox'>
                    <Checkbox checked={selectedTracks.includes(track._id)} onChange={() => handleToggleTrack(track._id)} />
                  </TableCell>
                  <TableCell
                    component='th'
                    scope='row'
                    sx={{ color: textColor, maxWidth: 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                  >
                    <Box display='flex' alignItems='center'>
                      <img
                        alt={track?.name}
                        src={track?.image?.replace('{w}x{h}bb', '48x48bb')}
                        onError={(e) => {
                          e.currentTarget.src = 'https://res.cloudinary.com/dswj1rtvu/image/upload/v1727670619/no-image_vueuvs.avif' // Đường dẫn đến ảnh mặc định
                        }}
                        style={{
                          inlineSize: '48px',
                          blockSize: '48px',
                          objectFit: 'cover',
                          borderRadius: '10px',
                          marginRight: '10px'
                        }}
                      />
                      <Typography noWrap variant='body2'>
                        {track.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography
                      noWrap
                      variant='body2'
                      sx={{ maxWidth: 250, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: textColor }}
                    >
                      {track.artistsName.join(', ')}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {isPending && <CircularProgress sx={{ color: (theme) => theme.palette.primary.main }} />}

      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <Button variant='outlined' color='secondary' onClick={handleDeleteSelected}>
          Xóa hết
        </Button>
        <Button variant='contained' color='primary' onClick={handleNext}>
          Tiếp theo
        </Button>
      </Box>
    </Box>
  )
}
