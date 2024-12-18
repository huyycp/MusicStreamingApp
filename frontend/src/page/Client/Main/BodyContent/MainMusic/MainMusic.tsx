import Box from '@mui/material/Box'
import { useEffect } from 'react'
import AlbumDetail from '~/components/AlbumDetail/LibraryItemDetail'
import ArtistDetail from '~/components/Artist/ArtistDetail'
import HomeView from '~/components/HomeView'
import LikedMusic from '~/components/LikedMusic/LikedMusic'
import MyMusic from '~/components/MyMusic'
import ProfileForm from '~/components/ProfileForm/ProfileForm'
import AudioSearchResutl from '~/components/SearchResult/AudioSearchResult/AudioSearchResult'
import GenresTrack from '~/components/SearchResult/GenresTag/GenresTrack/GenresTrack'
import SectionAlbum from '~/components/Section/SectionAlbum/SectionAlbum'
import TrackDetail from '~/components/TrackDetail/TrackDetail'

type Props = {
  viewType?: string | ''
}

export default function MainMusic({ viewType }: Props) {
  useEffect(() => {
    if (viewType === 'search') document.title = 'Magic Music - Search'
    if (viewType === 'my-music') document.title = 'Magic Music - My Music'
    if (viewType === 'liked-music') document.title = 'Magic Music - Collection'
    if (viewType === 'album') document.title = 'Magic Music - Album'
    if (viewType === 'artist') document.title = 'Magic Music - Artist'
    if (viewType === 'track') document.title = 'Magic Music - Track'
    if (!viewType) document.title = 'Magic Music - Web Player'
  }, [viewType])

  return (
    <Box
      sx={{
        inlineSize: '100%',
        blockSize: '100%',
        maxBlockSize: 'auto',
        display: 'flex',
        justifyContent: 'start',
        padding: '0px 18px',
        overflowY: 'auto',
        bgcolor: (theme) => theme.palette.secondary2.main,
        borderRadius: '10px',
        color: (theme) => theme.palette.secondary4.main
      }}
    >
      <>
        {viewType === 'search' && <AudioSearchResutl />}
        {viewType === 'liked-music' && <LikedMusic />}
        {viewType === 'playlist' && <Box>PlayList</Box>}
        {viewType === 'my-music' && <MyMusic />}
        {viewType === 'album' && <AlbumDetail />}
        {viewType === 'track' && <TrackDetail />}
        {viewType === 'artist' && <ArtistDetail />}
        {viewType === 'genres' && <GenresTrack />}
        {viewType === 'section' && <SectionAlbum />}
        {viewType === 'user' && <ProfileForm />}
        {!viewType && <HomeView />}
      </>
    </Box>
  )
}
