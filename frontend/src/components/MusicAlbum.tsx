import { Tooltip } from '@mui/material'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import MusicDiskSVG from '~/assets/icon/MusicDisk.svg?react'
import { useGetCreateAlbumData } from '~/hooks/useGetCreateAlbumData'

const RotatingAlbumIcon = styled(MusicDiskSVG)(() => ({
  'width': '75px',
  'height': '75px',
  'fill': 'gray',
  'animation': 'spin 5s linear infinite',
  'position': 'absolute',
  'bottom': '8%',
  'left': '60%',
  '@keyframes spin': {
    '0%': {
      transform: 'rotate(0deg)'
    },
    '100%': {
      transform: 'rotate(360deg)'
    }
  }
}))

const StyledAlbumContainer = styled('div')(({ theme }) => ({
  width: '85px',
  height: '85px',
  borderRadius: '3px',
  backgroundColor: theme.palette.neutral.neutral2,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  alignItems: 'center',
  overflow: 'hidden',
  zIndex: '1'
}))

const MusicAlbum = () => {
  const { name, imageFile, artistName, imageUrl } = useGetCreateAlbumData()
  const [image, setImage] = useState<string | null>(null)

  useEffect(() => {
    if (imageFile) {
      const url = URL.createObjectURL(imageFile)
      setImage(url)

      return () => URL.revokeObjectURL(url)
    } else if (imageUrl) {
      setImage(imageUrl)
    } else {
      setImage(null)
    }
  }, [imageFile, imageUrl])

  return (
    <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
      <Tooltip title={'Album'} placement='top'>
        <Box
          position='relative'
          display='flex'
          justifyContent='space-between'
          alignItems='flex-end'
          gap='10'
          sx={{
            'cursor': 'pointer',
            '&:hover': {
              opacity: 0.78
            }
          }}
        >
          {!image && (
            <StyledAlbumContainer style={{ backgroundSize: 'cover' }}>
              <Typography variant='body2' sx={{ color: 'white', bottom: '8px' }}>
                {name || 'Album'}
              </Typography>
              <Typography variant='body2' sx={{ color: 'white', bottom: '20px' }}>
                {artistName || 'Người tham gia'}
              </Typography>
            </StyledAlbumContainer>
          )}
          <RotatingAlbumIcon />
          {image && (
            <StyledAlbumContainer style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover' }}>
              <Typography variant='h6' sx={{ color: 'white', bottom: '8px' }}>
                {name || 'Album'}
              </Typography>
              <Typography variant='body2' sx={{ color: 'white', bottom: '20px' }}>
                {artistName || 'Người tham gia'}
              </Typography>
            </StyledAlbumContainer>
          )}
        </Box>
      </Tooltip>
    </Box>
  )
}

export default MusicAlbum
