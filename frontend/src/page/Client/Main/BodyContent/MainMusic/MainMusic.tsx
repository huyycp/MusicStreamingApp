import Box from '@mui/material/Box'
import { useEffect } from 'react'
import EditAlbumTracks from '~/components/AlbumDetail/EditAlbumTracks/EditAlbumTracks'
import AlbumDetail from '~/components/AlbumDetail/LibraryItemDetail'
import ArtistDetail from '~/components/Artist/ArtistDetail'
import PageArtistFollow from '~/components/Artist/PageArtistFollow/PageArtistFollow'
import HomeView from '~/components/HomeView'
import LikedMusic from '~/components/LikedMusic/LikedMusic'
import MyMusic from '~/components/MyMusic'
import ProfileForm from '~/components/ProfileForm/ProfileForm'
import { ReportList } from '~/components/Report/ReporList/ReportList'
import { ReportDetail } from '~/components/Report/ReportDetail/ReportDetail'
import AudioSearchResutl from '~/components/SearchResult/AudioSearchResult/AudioSearchResult'
import GenresTrack from '~/components/SearchResult/GenresTag/GenresTrack/GenresTrack'
import AlbumView from '~/components/TopView/AlbumView/AlbumView'
import ArtistView from '~/components/TopView/ArtistView/ArtistView'
import TrackDetail from '~/components/TrackDetail/TrackDetail'

type Props = {
  viewType?: string | ''
}

export default function MainMusic({ viewType }: Props) {
  useEffect(() => {
    if (viewType === 'search') document.title = 'Magic Music - Tìm kiếm'
    if (viewType === 'my-music') document.title = 'Magic Music - Nhạc của tôi'
    if (viewType === 'liked-music') document.title = 'Magic Music - Bài hát yêu thích'
    if (viewType === 'album') document.title = 'Magic Music - Album'
    if (viewType === 'artist') document.title = 'Magic Music - Nghệ sĩ'
    if (viewType === 'track') document.title = 'Magic Music - Bài hát'
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
        {viewType === 'album-detail' && <AlbumDetail />}
        {viewType === 'track' && <TrackDetail />}
        {viewType === 'artist' && <ArtistDetail />}
        {viewType === 'genres' && <GenresTrack />}
        {viewType === 'user' && <ProfileForm />}
        {viewType === 'report' && <ReportDetail />}
        {viewType === 'my-report' && <ReportList />}
        {viewType === 'artist-follow' && <PageArtistFollow />}
        {viewType === 'artist-view' && <ArtistView />}
        {viewType === 'album' && <AlbumView />}
        {viewType === 'album-edit' && <EditAlbumTracks />}
        {!viewType && <HomeView />}
      </>
    </Box>
  )
}
