import Box from '@mui/material/Box'
import AuthGenres from './MusicGenres/AuthGenres'
import { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import useGetProfile from '~/hooks/User/useGetProfile'
import useChangeGenres from '~/hooks/Genres/useChangeGenres'
import { useNavigate } from 'react-router-dom'
import Typography from '@mui/material/Typography'

export default function GenresChose() {
  const { data } = useGetProfile()
  const { mutate, isError, isPending } = useChangeGenres()
  const [activeGenres, setActiveGenres] = useState<string[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    if (data) {
      const genresIds = data.result.genres.map((genre: { _id: string }) => genre._id)
      setActiveGenres(genresIds)
    }
  }, [data])

  const handleUpdateGenres = () => {
    mutate(activeGenres, {
      onSuccess: () => {
        navigate('/')
      }
    })
  }

  return (
    <Box
      sx={{
        width: '50%',
        bgcolor: (theme) => theme.palette.secondary2.main,
        borderRadius: '20px',
        pl: '20px',
        pr: '20px',
        pb: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <Box sx={{ fontSize: 32, fontWeight: 'bold', pt: 2, color: (theme) => theme.palette.primary.main }}>Sở thích</Box>
      <Box sx={{ fontSize: 13, pb: 1, color: (theme) => theme.palette.neutral.neutral1 }}>
        Thể loại bạn thích giúp chúng tôi cung cấp các sản phẩm phù hợp cho bạn.
      </Box>
      <AuthGenres activeGenres={activeGenres} setActiveGenres={setActiveGenres} />
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Button variant='outlined' color='primary' sx={{ mr: 2 }} onClick={() => setActiveGenres([])}>
          Làm mới
        </Button>
        <Button
          variant='contained'
          color='primary'
          onClick={handleUpdateGenres}
          disabled={isPending}
          startIcon={isPending ? <CircularProgress color='inherit' size={20} /> : null}
        >
          {isPending ? <CircularProgress color='inherit' size={20} /> : 'Cập nhật'}
        </Button>
      </Box>
      {isError && (
        <Typography color='error' sx={{ mt: 2 }}>
          Đã xảy ra lỗi khi cập nhật. Vui lòng thử lại!
        </Typography>
      )}
    </Box>
  )
}
