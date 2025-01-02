import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

type Props = {
  imageSrc: string
  title: string
  isActive: boolean
  onClick: () => void
}

export default function GenresTag({ imageSrc, title, isActive, onClick }: Props) {
  return (
    <Box
      onClick={onClick}
      sx={{
        'position': 'relative',
        'display': 'flex',
        'alignItems': 'center',
        'justifyContent': 'center',
        'width': '120px',
        'height': '40px',
        'borderRadius': '20px',
        'overflow': 'hidden',
        'cursor': 'pointer',
        'boxShadow': isActive ? '0 4px 10px rgba(0,0,0,0.2)' : 'none',
        'border': isActive ? '2px solid #1976d2' : '2px solid transparent',
        'transition': '0.3s',
        '&:hover': {
          opacity: isActive ? 1 : 0.8
        }
      }}
    >
      <Box
        component='img'
        src={imageSrc}
        alt={title}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: isActive ? 1 : 0.5,
          transition: 'opacity 0.3s'
        }}
      />
      <Typography
        variant='h6'
        sx={{
          position: 'relative',
          color: '#fff',
          zIndex: 1,
          textShadow: '0px 0px 5px rgba(0,0,0,0.7)'
        }}
      >
        {title}
      </Typography>
    </Box>
  )
}
