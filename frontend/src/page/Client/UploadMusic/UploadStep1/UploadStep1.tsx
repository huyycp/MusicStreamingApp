import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress'
import { styled } from '@mui/material/styles'
import { useEffect, useState, useRef } from 'react'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { useNavigate } from 'react-router-dom'
import { useGetUploadData } from '~/hooks/useGetUploadData'

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

export default function UploadStep1() {
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [error, setError] = useState('')
  const { setAudioFile: setAudio, name, setName, audioFile: audioData } = useGetUploadData()

  const navigate = useNavigate()

  useEffect(() => {
    if (!name) {
      navigate('/upload-music')
    }
    if (audioData) setAudio(null)
  }, [audioData, name, navigate, setAudio])

  useEffect(() => {
    if (audioFile) {
      const newAudioUrl = URL.createObjectURL(audioFile)
      setAudioUrl(newAudioUrl)

      // Giải phóng URL cũ khi file mới được chọn
      return () => {
        if (audioUrl) {
          URL.revokeObjectURL(audioUrl)
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioFile])

  useEffect(() => {
    if (audioRef.current && audioUrl) {
      audioRef.current.load() // Tải lại audio khi URL thay đổi
    }
  }, [audioUrl]) // Chỉ phụ thuộc vào audioUrl

  const handleAudioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null
    if (file) {
      setAudioFile(file)
    }
  }
  const handleNext = () => {
    setError('')
    if (!audioFile) setError('Chưa tải track lên')
    else if (error === '') {
      setAudio(audioFile)
      navigate('/upload-music/step2')
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
      <BorderLinearProgress variant='determinate' value={Math.floor((1 / 3) * 100)} sx={{ width: '100%', mt: 0.5 }} />
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
            setName('')
            navigate('/upload-music')
          }}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, fontSize: 14, pb: 3 }}>
          <Box sx={{ color: (theme) => theme.palette.neutral.neutral1 }}>Bước 1/3</Box>
          <Box sx={{ color: (theme) => theme.palette.secondary4.main, fontWeight: 'bold' }}>Điền tên bài hát và những người tham gia</Box>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 3, flexDirection: 'column' }}>
        <Button variant='contained' component='label' sx={{ width: '100%', p: 1.3 }}>
          Tải lên
          <input hidden accept='audio/*' type='file' onChange={handleAudioChange} />
        </Button>
      </Box>
      {audioUrl && (
        <audio ref={audioRef} controls>
          <source src={audioUrl} type={audioFile?.type} />
          Your browser does not support the audio element.
        </audio>
      )}
      {audioFile && (
        <Button sx={{ width: '100%', fontSize: 14, fontWeight: 'bold', mb: 2 }} variant='contained' onClick={handleNext}>
          Tiếp theo
        </Button>
      )}
    </Box>
  )
}
