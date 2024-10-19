import { Box } from '@mui/material'
import RecommendAlbum from './RecommendAlbum'
import ImageSlider from './ImageSlider/ImageSlider'


export default function HomeView() {

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2, width: '100%' }}>
      <ImageSlider />
      <RecommendAlbum />
    </Box>
  )
}
