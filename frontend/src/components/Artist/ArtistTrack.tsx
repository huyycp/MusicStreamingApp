import Typography from '@mui/material/Typography'
import Box from '@mui/system/Box'
import { useNavigate } from 'react-router-dom'
import { IArtist } from '~/type/Artist/IArtist'

type Props = {
  artist: IArtist
}
export default function ArtistTrack({ artist }: Props) {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        'width': '100%',
        'cursor': 'pointer',
        'height': '96px',
        'display': 'flex',
        'flexDirection': 'row',
        'borderRadius': '5px',
        'padding': 1,
        '&:hover': {
          bgcolor: (theme) => theme.palette.neutral.neutral3
        }
      }}
      onClick={() => navigate(`/artist/${artist._id}`)}
    >
      <img
        alt={artist.name}
        src={artist.avatar || 'https://res.cloudinary.com/dswj1rtvu/image/upload/v1727670619/no-image_vueuvs.avif'}
        onError={(e) => {
          e.currentTarget.src = 'https://res.cloudinary.com/dswj1rtvu/image/upload/v1727670619/no-image_vueuvs.avif' // Đường dẫn đến ảnh mặc định
        }}
        style={{
          inlineSize: '80px',
          blockSize: '80px',
          objectFit: 'cover',
          borderRadius: '100%',
          marginRight: '10px'
        }}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          justifyContent: 'center',
          paddingLeft: 1
        }}
      >
        <Typography variant='body1' fontWeight='bold'>Nghệ sĩ</Typography>
        <Typography
          variant='body1'
          fontWeight='bold'
          sx={{
            '&:hover': {
              textDecoration: 'underline'
            }
          }}
        >
          {artist.name}
        </Typography>
      </Box>
    </Box>
  )
}
