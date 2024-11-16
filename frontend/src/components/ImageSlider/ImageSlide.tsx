import { Tooltip } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'
import { capitalizeFirstLetterOfEachWord } from '~/utils/capitalizeFirstLetterOfEachWord'

interface ImageSlideProps {
  src: string
  index: number
  isActive: boolean
  artistsName: string[]
  albumName: string
  albumId: string
}

const ImageSlide = ({ src, index, isActive, artistsName, albumName, albumId }: ImageSlideProps) => {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        'cursor': 'pointer',
        'flex': '0 0 auto',
        'width': 'calc(33.33% - 20px)',
        'margin': '0 10px',
        'position': 'relative',
        'opacity': isActive ? 1 : 0.8,
        'transition': 'opacity 0.5s ease',
        '&:hover': {
          opacity: 1
        }
      }}
      onClick={() => navigate(`/library/${albumId}`)}
    >
      <Tooltip title={albumName}>
        <img src={src} alt={`Slide ${index + 1}`} style={{ width: '100%', height: '190px', borderRadius: '10px' }} />
      </Tooltip>
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '50px',
          background: 'linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent)',
          borderRadius: '0 0 10px 10px',
          display: 'flex',
          alignItems: 'start',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 10px'
        }}
      >
        <Typography variant='body1' sx={{ color: '#fff', textAlign: 'center' }}>
          {capitalizeFirstLetterOfEachWord(albumName)}
        </Typography>
        <Typography variant='body2' sx={{ color: '#fff', textAlign: 'center' }}>
          {artistsName.join(', ')}
        </Typography>
      </Box>
    </Box>
  )
}

export default ImageSlide
