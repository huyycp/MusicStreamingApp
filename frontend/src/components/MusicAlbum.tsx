import { Tooltip } from '@mui/material'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import MusicDiskSVG from '~/assets/icon/MusicDisk.svg?react'

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
  //   const { name: songName, imageFile, artistName } = useGetUploadData()
  //   const [image, setImage] = useState<string | null>(null)
  //   const songName = '2123123213'

  //   useEffect(() => {
  //     if (imageFile) {
  //       const url = URL.createObjectURL(imageFile)
  //       setImage(url)

  //       // Giải phóng URL khi component unmount
  //       return () => URL.revokeObjectURL(url)
  //     } else setImage(null)
  //   }, [imageFile])

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
          {
            <StyledAlbumContainer style={{ backgroundSize: 'cover' }}>
              <Typography variant='body2' sx={{ color: 'white', bottom: '8px' }}>
                {'Bài hát'}
              </Typography>
            </StyledAlbumContainer>
          }
          <RotatingAlbumIcon />
          {/* {image && (
            <StyledAlbumContainer style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover' }}>
              <Typography variant='h6' sx={{ color: 'white', bottom: '8px' }}>
                {'Bài hát'}
              </Typography>
              <Typography variant='body2' sx={{ color: 'white', bottom: '20px' }}>
                {'Người tham gia'}
              </Typography>
            </StyledAlbumContainer>
          )} */}
        </Box>
      </Tooltip>
    </Box>
  )
}

export default MusicAlbum
