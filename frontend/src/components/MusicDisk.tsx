import { Tooltip } from '@mui/material'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import MusicDiskSVG from '~/assets/icon/MusicDisk.svg?react'
import PlayIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import { useEffect, useRef, useState } from 'react'
import { useGetUploadData } from '~/hooks/useGetUploadData'

const RotatingAlbumIcon = styled(MusicDiskSVG)(() => ({
  'width': '75px',
  'height': '75px',
  'fill': 'gray',
  'animation': 'spin 5s linear infinite',
  'cursor': 'pointer',
  '&:hover': {
    opacity: 0.78
  },
  '@keyframes spin': {
    '0%': {
      transform: 'rotate(0deg)'
    },
    '100%': {
      transform: 'rotate(360deg)'
    }
  }
}))

const StyledRotatingDisk = styled('div')<{ image?: string }>(({ image }) => ({
  'cursor': 'pointer',
  'width': '75px',
  'height': '75px',
  'borderRadius': '50%',
  'backgroundColor': '#ccc',
  'backgroundImage': image ? `url(${image})` : 'none',
  'backgroundSize': 'cover',
  'backgroundPosition': 'center',
  'border': '5px solid #000',
  'position': 'relative',
  'animation': 'spin 5s linear infinite',
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  '&:hover': {
    opacity: 0.78
  },
  '@keyframes spin': {
    '0%': {
      transform: 'rotate(0deg)'
    },
    '100%': {
      transform: 'rotate(360deg)'
    }
  }
}))

const CenterCircle = styled('div')(() => ({
  width: '20px',
  height: '20px',
  backgroundColor: '#000',
  borderRadius: '50%',
  zIndex: 1
}))

const MusicDisk = () => {
  const { name: songName, audioFile, imageFile, artistName } = useGetUploadData()
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [image, setImage] = useState<string | null>(null)

  useEffect(() => {
    if (imageFile) {
      const url = URL.createObjectURL(imageFile)
      setImage(url)

      // Giải phóng URL khi component unmount
      return () => URL.revokeObjectURL(url)
    } else setImage(null)
  }, [imageFile])

  const handleTogglePlay = () => {
    if (!audioRef.current && audioFile) {
      audioRef.current = new Audio(URL.createObjectURL(audioFile))
      audioRef.current.onended = () => setIsPlaying(false) // Dừng khi phát xong
    }

    if (isPlaying) {
      audioRef.current?.pause()
    } else {
      audioRef.current?.play()
    }

    setIsPlaying(!isPlaying)
  }

  return (
    <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
      {image ? (
        <Tooltip title={songName || 'Bài hát'} placement='top'>
          <StyledRotatingDisk image={image} onClick={handleTogglePlay}>
            <CenterCircle />
            {isPlaying ? <PauseIcon sx={{ color: 'white', position: 'absolute' }} /> : <PlayIcon sx={{ color: 'white', position: 'absolute' }} />}
          </StyledRotatingDisk>
        </Tooltip>
      ) : (
        <Box onClick={handleTogglePlay}>
          <RotatingAlbumIcon />
        </Box>
      )}
      <Typography variant='h6' sx={{ marginTop: '16px', textAlign: 'center', color: (theme) => theme.palette.neutral.neutral2 }}>
        {songName || 'Bài hát'}
      </Typography>
      <Typography variant='body2' sx={{ textAlign: 'center', color: (theme) => theme.palette.neutral.neutral1 }}>
        {artistName || 'Người tham gia'}
      </Typography>
      {/* Ẩn audio */}
      {audioFile && (
        <audio ref={audioRef} controls style={{ display: 'none' }}>
          <source src={URL.createObjectURL(audioFile)} type={audioFile?.type} />
          Your browser does not support the audio element.
        </audio>
      )}
    </Box>
  )
}

export default MusicDisk
