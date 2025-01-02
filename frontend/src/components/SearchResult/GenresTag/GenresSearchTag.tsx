import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia, { CardMediaProps } from '@mui/material/CardMedia'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import useGetGenres from '~/hooks/Genres/useGetGenres'

const StyledCard = styled(Card)(() => ({
  'height': '150px',
  'display': 'flex',
  'borderRadius': '8px',
  'position': 'relative',
  'overflow': 'hidden',
  'transition': 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.02)',
    cursor: 'pointer'
  }
}))

const StyledCardMedia = styled(CardMedia)<CardMediaProps>(() => ({
  position: 'absolute',
  top: 0,
  right: 0,
  height: '100%',
  width: '40%',
  objectFit: 'cover',
  zIndex: 0
}))

const StyledTypography = styled(Typography)(() => ({
  color: '#FFFFFF',
  fontWeight: 'bold',
  fontSize: '1.5rem',
  zIndex: 2
}))

const getColor = (index: number) => {
  const colors = [
    '#E91E63',
    '#9C27B0',
    '#673AB7',
    '#3F51B5',
    '#2196F3',
    '#00BCD4',
    '#009688',
    '#4CAF50',
    '#8BC34A',
    '#CDDC39',
    '#FFC107',
    '#FF9800',
    '#FF5722',
    '#795548',
    '#607D8B',
    '#D81B60',
    '#1976D2',
    '#388E3C',
    '#F57C00',
    '#283593'
  ]
  return colors[index % colors.length]
}

export default function GenresSearchTag() {
  const { data } = useGetGenres()
  const navigate = useNavigate()
  const genres = useMemo(() => {
    return Array.isArray(data?.result) ? data.result : []
  }, [data])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '100%',
        gap: '16px'
      }}
    >
      <Box
        sx={{
          width: '100%',
          flexShrink: 0
        }}
      >
        <Typography variant='h5' fontWeight='bold' sx={{ color: (theme) => theme.palette.secondary4.main, pt: 2 }}>
          Duyệt tìm tất cả
        </Typography>
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          width: '100%',
          overflow: 'auto'
        }}
      >
        <Grid container spacing={2}>
          {genres.map((genre, index) => (
            <Grid item xs={12} sm={6} md={4} key={genre._id} onClick={() => navigate(`/genres/${genre._id}`)}>
              <StyledCard sx={{ backgroundColor: getColor(index) }}>
                <CardContent
                  sx={{
                    flex: '1 0 auto',
                    p: 3,
                    zIndex: 2
                  }}
                >
                  <StyledTypography variant='h5'>{genre.name}</StyledTypography>
                </CardContent>
                <StyledCardMedia component='img' src={genre.image} />
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}
