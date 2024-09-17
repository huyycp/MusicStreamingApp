import Box from '@mui/material/Box'
import { mockData } from '~/apis/data-mock'
import RecommendAlbum from '~/components/RecommendAlbum'

type Props = {
  viewType?: string | ''
}

export default function MainMusic({ viewType }: Props) {
  const musicList = mockData.listMusics
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
      {/* {!viewType && <Box>Home</Box>}
      {viewType === 'search' && <Box>Search</Box>}
      {viewType === 'collection' && <Box>Collection</Box>}
      {viewType === 'playlist' && <Box>PlayList</Box>} */}
      <RecommendAlbum musicList={musicList} />
    </Box>
  )
}
