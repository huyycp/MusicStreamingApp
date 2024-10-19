import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress'
import { styled } from '@mui/material/styles'
import { useEffect } from 'react'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { useNavigate } from 'react-router-dom'
import { useGetUploadData } from '~/hooks/useGetUploadData'
import useUploadMusic from '~/hooks/Upload/useUploadMusic'
import CircularProgress from '@mui/material/CircularProgress'
import MusicGenres from '~/components/MusicGenres/MusicGenres'

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

export default function UploadStep4() {
  const { setLyrics, name, audioFile, imageFile, lyrics, clearData, activeGenres, setActiveGenres } = useGetUploadData()
  const { mutate: uploadMusic, isPending } = useUploadMusic()
  const navigate = useNavigate()

  useEffect(() => {
    if (!name) {
      navigate('/upload-music')
    } else if (!audioFile) {
      navigate('/upload-music/step2')
    } else if (!imageFile) {
      navigate('/upload-music/step3')
    }
  }, [audioFile, imageFile, name, navigate])
  const handleNext = () => {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('audio', audioFile as File)
    formData.append('image', imageFile as File)
    formData.append('lyrics', lyrics)
    formData.append('genre', activeGenres)
    // navigate('/upload-music/final')
    uploadMusic(formData, {
      onSuccess: () => {
        clearData()
        navigate('/')
      }
    })
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
      <BorderLinearProgress variant='determinate' value={Math.floor((4 / 4) * 100)} sx={{ width: '100%', mt: 0.5 }} />
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
            setLyrics('')
            setActiveGenres('')
            navigate('/upload-music/step3')
          }}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, fontSize: 14, pb: 3 }}>
          <Box sx={{ color: (theme) => theme.palette.neutral.neutral1 }}>Bước 4/4</Box>
          <Box sx={{ color: (theme) => theme.palette.secondary4.main, fontWeight: 'bold' }}>Chọn loại nhạc</Box>
        </Box>
      </Box>
      <MusicGenres activeGenres={activeGenres} setActiveGenres={setActiveGenres} />
      {activeGenres !== '' && !isPending && (
        <Button variant='contained' color='primary' onClick={handleNext}>
          Tải lên
        </Button>
      )}
      {isPending && <CircularProgress color='success' />}
    </Box>
  )
}
