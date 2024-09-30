import Box from '@mui/material/Box'
import { useEffect } from 'react'
import MusicAlbum from '~/components/MusicAlbum'
import MyMusic from '~/components/MyMusic'
import RecommendAlbum from '~/components/RecommendAlbum'
import useGetTracks from '~/hooks/Tracks/useGetTracks'

type Props = {
  viewType?: string | ''
}

export default function MainMusic({ viewType }: Props) {
  // const musicList = mockData.listMusics
  const { data } = useGetTracks()
  useEffect(() => {
    if (viewType === 'search') document.title = 'Magic Music - Search'
    if (viewType === 'my-music') document.title = 'Magic Music - My Music'
    if (viewType === 'liked-music') document.title = 'Magic Music - Collection'
    if (!viewType) document.title = 'Magic Music - Web Player'
  }, [viewType])

  const musicList = data?.result.data
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
      {viewType === 'liked-music' && <MusicAlbum />}
      {viewType === 'playlist' && <Box>PlayList</Box>}
      {viewType === 'my-music' && <MyMusic />}
      {!viewType && musicList && <RecommendAlbum musicList={musicList} />}
    </Box>
  )
}
