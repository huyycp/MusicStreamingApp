import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress'
import { styled } from '@mui/material/styles'
import { useEffect, useState } from 'react'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField'
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

export default function UploadStep2() {
  const [textContent, setTextContent] = useState<string>('')

  const { setLyrics, name, audioFile, setAudioFile } = useGetUploadData()
  const navigate = useNavigate()

  useEffect(() => {
    if (!name) {
      navigate('/upload-music')
    } else if (!audioFile) {
      navigate('/upload-music/step1')
    }
  }, [audioFile, name, navigate])

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setTextContent(e.target.result as string)
        }
      }
      reader.readAsText(file)
    }
  }

  const handleClear = () => {
    setTextContent('')
  }
  const handleNext = () => {
    setLyrics(textContent)
    navigate('/upload-music/step3')
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
      <BorderLinearProgress variant='determinate' value={Math.floor((2 / 3) * 100)} sx={{ width: '100%', mt: 0.5 }} />
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
            setAudioFile(null)
            navigate('/upload-music/step1')
          }}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, fontSize: 14, pb: 3 }}>
          <Box sx={{ color: (theme) => theme.palette.neutral.neutral1 }}>Bước 2/3</Box>
          <Box sx={{ color: (theme) => theme.palette.secondary4.main, fontWeight: 'bold' }}>Nhập hoặc tải lên lời bài hát</Box>
        </Box>
      </Box>
      <Button variant='contained' component='label'>
        Upload Lyrics (Text File)
        <input hidden accept='.txt' type='file' onChange={handleTextChange} />
      </Button>
      <TextField
        placeholder='Lời bài hát'
        multiline
        rows={10}
        variant='outlined'
        fullWidth
        value={textContent}
        onChange={(e) => setTextContent(e.target.value)}
        sx={{
          'color': 'white',
          'border': 'none',
          '& .MuiInputBase-input': {
            color: 'white'
          },
          '& .MuiInputBase-input::placeholder': {
            color: 'white'
          },
          '& input': { color: 'white', height: '25px', cursor: 'pointer' },
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: 'white'
            },
            '& fieldset': {
              borderColor: 'white'
            },
            '&:hover fieldset': {
              borderColor: 'white'
            }
          }
        }}
      />
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button onClick={handleClear} color='secondary' variant='outlined'>
          Làm sạch
        </Button>
        <Button variant='contained' color='primary' onClick={handleNext}>
          Tiếp theo
        </Button>
      </Box>
    </Box>
  )
}
