import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useTheme } from '@mui/material/styles'
import { useNavigate, useParams } from 'react-router-dom'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Checkbox from '@mui/material/Checkbox'
import useGetTracksByArtist from '~/hooks/Tracks/useGetTracksByArtist'
import Paper from '@mui/material/Paper'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import useAddTrackToAlbum from '~/hooks/Album/useAddTrackToAlbum'

export default function AddTrackToAlbum() {
  const { data: myTrackListResponse, isPending } = useGetTracksByArtist(5, 1, 'pending')
  const { mutate: addTrackToAlbum, isPending: addTrackPending } = useAddTrackToAlbum()
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const theme = useTheme()
  const textColor = theme.palette.secondary4.main

  const myTrackList = myTrackListResponse?.result?.data ?? []

  useEffect(() => {
    if (!id) {
      navigate('/404')
    }
  }, [id, navigate])

  const [selectedTracks, setSelectedTracks] = useState<string[]>([])

  const handleToggleTrack = (id: string) => {
    setSelectedTracks((prev) => (prev.includes(id) ? prev.filter((trackId) => trackId !== id) : [...prev, id]))
  }

  const handleDeleteSelected = () => {
    setSelectedTracks([])
  }

  const handleNext = () => {
    if (id) {
      addTrackToAlbum(
        { tracks: selectedTracks, library_id: id, type: 'add' },
        {
          onSuccess: () => navigate('/my-music'),
          onError: () => navigate('/404')
        }
      )
    }
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
      <Box sx={{ width: '100%', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'start', gap: 1 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, fontSize: 14, pb: 3 }}>
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
                      {track.owners.map((artist) => artist.name).join(', ')}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {isPending && <CircularProgress color='success' />}

      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <Button variant='outlined' color='secondary' onClick={handleDeleteSelected}>
          Xóa hết
        </Button>
        {selectedTracks && !addTrackPending && (
          <Button variant='contained' color='primary' onClick={handleNext}>
            Thêm vào album
          </Button>
        )}
        {addTrackPending && <CircularProgress color='success' />}
      </Box>
    </Box>
  )
}
