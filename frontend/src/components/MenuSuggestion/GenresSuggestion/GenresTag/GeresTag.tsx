import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'
import { IGenres } from '~/type/Genres/IGenres'

type Props = {
  genres: IGenres
}

export default function GeresTag({ genres }: Props) {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        'width': '150px',
        'aspectRatio': '1/2',
        'backgroundImage': `url(${genres.image})`,
        'backgroundSize': 'cover',
        'backgroundPosition': 'center',
        'backgroundRepeat': 'no-repeat',
        'borderRadius': '4px',
        'cursor': 'pointer',
        'overflow': 'hidden',
        '&:hover': {
          transform: 'scale(1.05)',
          transition: 'all 0.3s ease-in-out'
        }
      }}
      onClick={() => navigate(`/genres/${genres._id}`)}
    >
      <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant='body1' fontWeight='bold'>
          {genres.name}
        </Typography>
      </Box>
    </Box>
  )
}
