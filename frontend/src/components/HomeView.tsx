import { Box } from '@mui/material'
import useGetTracks from '~/hooks/Tracks/useGetTracks'
import RecommendAlbum from './RecommendAlbum'
import ImageSlider from './ImageSlider/ImageSlider'


export default function HomeView() {
  const { data } = useGetTracks()

  const musicList = data?.result.data

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2, width: '100%' }}>
      <ImageSlider />
      {musicList && <RecommendAlbum musicList={musicList} />}
    </Box>
  )
}
