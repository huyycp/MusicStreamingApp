import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'
import { useMusic } from '~/hooks/useMusic'

export default function DescArtist() {
  const navigate = useNavigate()
  const { music } = useMusic()

  return (
    <Card
      sx={{
        width: '100%',
        bgcolor: 'transparent',
        cursor: 'pointer',
        padding: '12px',
        color: (theme) => theme.palette.secondary4.main
      }}
    >
      <CardMedia
        sx={{ height: 180, borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}
        image={music?.owners[0].avatar || 'https://res.cloudinary.com/dswj1rtvu/image/upload/v1727670619/no-image_vueuvs.avif'}
        title='avatar'
      />
      <CardContent
        sx={{
          bgcolor: (theme) => theme.palette.neutral.neutral3,
          borderBottomLeftRadius: '10px',
          borderBottomRightRadius: '10px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 1 // thêm padding nếu cần để tránh chữ và nút bị dính nhau
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, overflow: 'hidden' }}>
          <Typography
            gutterBottom
            variant='h5'
            component='div'
            onClick={() => navigate(`/artist/${music?.owners[0]._id}`)}
            sx={{
              'cursor': 'pointer',
              '&:hover': {
                textDecoration: 'underline'
              }
            }}
          >
            {music?.owners[0].name}
          </Typography>
          <Typography
            noWrap
            gutterBottom
            variant='body2'
            component='div'
            onClick={() => navigate(`/artist/${music?.owners[0]._id}`)}
            sx={{
              cursor: 'pointer',
              color: (theme) => theme.palette.neutral.neutral1,
              overflow: 'hidden', // Đảm bảo phần chữ bị ẩn đi khi hết không gian
              textOverflow: 'ellipsis', // Chữ sẽ bị cắt với dấu ba chấm
              whiteSpace: 'nowrap' // Ngừng xuống dòng
            }}
          >
            1.000.000 người theo dõi
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', flexShrink: 0, flexGrow: 0, whiteSpace: 'nowrap' }}>
          <Button variant='outlined'>Theo dõi</Button>
        </Box>
      </CardContent>
    </Card>
  )
}
