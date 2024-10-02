import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress'
import { styled } from '@mui/material/styles'
import { useEffect, useState } from 'react'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { useNavigate } from 'react-router-dom'
import CancelIcon from '@mui/icons-material/Cancel'
import IconButton from '@mui/material/IconButton'
import { useGetCreateAlbumData } from '~/hooks/useGetCreateAlbumData'

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

export default function CreateAlbumStep1() {
  const { name, setImageFile, imageFile } = useGetCreateAlbumData()
  const [imageUrl, setImageUrl] = useState<string>('')
  const navigate = useNavigate()

  useEffect(() => {
    if (!name) {
      navigate('/create-album')
    }
    setImageFile(null)
  }, [name, navigate, setImageFile])

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setImageUrl(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setImageFile(null)
    setImageUrl('')
  }

  const handleNext = () => {
    setImageFile(imageFile)
    navigate('/create-album/step2')
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
      <BorderLinearProgress variant='determinate' value={Math.floor((1 / 2) * 100)} sx={{ width: '100%', mt: 0.5 }} />
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
            navigate('/create-album/step2')
          }}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, fontSize: 14, pb: 3 }}>
          <Box sx={{ color: (theme) => theme.palette.neutral.neutral1 }}>Bước 1/2</Box>
          <Box sx={{ color: (theme) => theme.palette.secondary4.main, fontWeight: 'bold' }}>Tải hình ảnh cho album</Box>
        </Box>
      </Box>
      <Button variant='contained' component='label'>
        Upload Cover Image
        <input hidden accept='image/*' type='file' onChange={handleImageChange} />
      </Button>
      {imageFile && (
        <Box sx={{ position: 'relative', marginTop: 1 }}>
          <Box component='img' src={imageUrl} alt='Cover' sx={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }} />
          <IconButton
            onClick={handleRemoveImage}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: 'transparent'
            }}
          >
            <CancelIcon sx={{ color: (theme) => theme.palette.neutral.neutral1 }} />
          </IconButton>
        </Box>
      )}
      {imageFile && (
        <Button variant='contained' color='primary' onClick={handleNext}>
          Tiếp theo
        </Button>
      )}
    </Box>
  )
}
