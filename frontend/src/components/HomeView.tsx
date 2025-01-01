import { Box } from '@mui/material'
import ImageSlider from './ImageSlider/ImageSlider'
import ListArtist from './Artist/ListArtist'
import { useNavigate } from 'react-router-dom'
import MenuSuggetion from './MenuSuggestion/MenuSuggetion'
import GenresSuggestion from './MenuSuggestion/GenresSuggestion/GenresSuggestion'
import { useUser } from '~/hooks/useUser'
import useGetAlbumWeeklyTop from '~/hooks/Top/useGetAlbumWeeklyTop'
import ListAlbum from './SearchResult/ListAlbum/ListAlbum'
import useGetAlbumTop from '~/hooks/Top/useGetAlbumTop'
import useGetArtistWeeklyTop from '~/hooks/Top/useGetArtistWeeklyTop'
import useGetArtistTop from '~/hooks/Top/useGetArtistTop'

export default function HomeView() {
  const { data: artistWeekTop10, isPending: isPendingArtistWeekTop10 } = useGetArtistWeeklyTop()
  const { data: artistTop10, isPending: isPendingArtistTop10 } = useGetArtistTop()
  const { data: albumWeekTop10, isPending: isPendingAlbumWeekTop10 } = useGetAlbumWeeklyTop()
  const { data: albumTop10, isPending: isPendingAlbumTop10 } = useGetAlbumTop()
  const { user } = useUser()
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate('/artist-top/weekly/top10')
  }

  const handleNavigateArtist = () => {
    navigate('/artist-top/top10')
  }

  const handleNavigateTopAlbumWeekly = () => {
    navigate('/album/weekly/top10')
  }
  const handleNavigateTopAlbum = () => {
    navigate('/album/top10')
  }

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
      {user && <MenuSuggetion />}
      <GenresSuggestion />
      {albumWeekTop10 && (
        <ListAlbum
          listAlbum={albumWeekTop10?.result || []}
          isPending={isPendingAlbumWeekTop10}
          title='Top 10 Album tuần'
          handleNavigate={handleNavigateTopAlbumWeekly}
          tag='week-top10'
        />
      )}
      {artistWeekTop10 && (
        <ListArtist
          artists={artistWeekTop10?.result || []}
          title='Top 10 nghệ sĩ tuần'
          isPending={isPendingArtistWeekTop10}
          handleNavigate={handleNavigate}
          tag='week-top10'
        />
      )}
      {albumTop10 && (
        <ListAlbum
          listAlbum={albumTop10?.result || []}
          isPending={isPendingAlbumTop10}
          title='Top 10 Album'
          handleNavigate={handleNavigateTopAlbum}
          tag='top10'
        />
      )}
      {artistTop10 && (
        <ListArtist
          artists={artistTop10?.result || []}
          title='Top 10 nghệ sĩ'
          isPending={isPendingArtistTop10}
          handleNavigate={handleNavigateArtist}
          tag='top10'
        />
      )}
    </Box>
  )
}
