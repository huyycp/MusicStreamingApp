import Box from '@mui/material/Box'
import AuthGenres from './MusicGenres/AuthGenres'
import { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import useGetProfile from '~/hooks/User/useGetProfile'

export default function GenresChose() {
  const { data } = useGetProfile()
  const [activeGenres, setActiveGenres] = useState<string[]>([])

  useEffect(() => {
    if (data) setActiveGenres(data.result.genres)
  }, [data])

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
      <Box>
        <Button variant='outlined' color='primary' sx={{ mr: 2 }} onClick={() => setActiveGenres([])}>
          Làm mới
        </Button>
        <Button variant='contained' color='primary'>
          Cập nhật
        </Button>
      </Box>
    </Box>
  )
}
