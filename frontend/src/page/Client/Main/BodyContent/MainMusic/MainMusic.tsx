import Box from '@mui/material/Box'
import MyMusic from '~/components/MyMusic'
import RecommendAlbum from '~/components/RecommendAlbum'
import useGetTracks from '~/hooks/Tracks/useGetTracks'

type Props = {
  viewType?: string | ''
}

export default function MainMusic({ viewType }: Props) {
  // const musicList = mockData.listMusics
  const { data, error, isLoading, isError } = useGetTracks()

  const musicList = data?.result
  return (
    <Box
      sx={{
        inlineSize: '100%',
        blockSize: '100%',
        maxBlockSize: 'auto',
        display: 'flex',
        justifyContent: 'start',
        padding: '0px 18px',
        bgcolor: (theme) => theme.palette.secondary2.main,
        borderRadius: '10px',
        color: (theme) => theme.palette.secondary4.main
      }}
    >
      {viewType === 'search' && <Box>Search</Box>}
      {viewType === 'liked-music' && <Box>Collection</Box>}
      {viewType === 'playlist' && <Box>PlayList</Box>}
      {viewType === 'my-music' && <MyMusic />}
      {!viewType && musicList && <RecommendAlbum musicList={musicList} />}
    </Box>
  )
}
