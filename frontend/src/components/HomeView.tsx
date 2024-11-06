import { Box } from '@mui/material'
import RecommendAlbum from './RecommendAlbum'
import ImageSlider from './ImageSlider/ImageSlider'
import ListArtist from './Artist/ListArtist'
import useGetArtist from '~/hooks/Artist/useGetArtist'
import { IArtist } from '~/type/Artist/IArtist'

export default function HomeView() {
  const { data, isPending } = useGetArtist(5, 1)

  const listArtist = data?.result.data as IArtist[]
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 2,
        width: '100%',
        paddingTop: 2.5
      }}
    >
      <ImageSlider />
      <RecommendAlbum />
      {listArtist && <ListArtist artists={listArtist} title='Nghệ sĩ nổi tiếng' isPending={isPending} />}
    </Box>
  )
}
