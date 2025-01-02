import Box from '@mui/material/Box'
import AlbumInfo from './AlbumInfo/AlbumInfo'
import { Params, useParams } from 'react-router-dom'
import useGetAlbumDetail from '~/hooks/Album/useGetLibraryDetail'
import ListTracks from './ListTracks/ListTracks'
import TrackForPlayList from './TrackForPlayList/TrackForPlayList'
import { ITrack } from '~/type/Tracks/ITrack'
import { ILibrary } from '~/type/Library/ILibrary'
import { useState } from 'react'
import useGetAlbumWithArtist from '~/hooks/Artist/useGetAlbumWithArtist'
import ListAlbum from '../SearchResult/ListAlbum/ListAlbum'

export default function LibraryItemDetail() {
  const { albumId } = useParams<Params>()
  const [close, setClose] = useState(false)
  const { data, isPending, refetch } = useGetAlbumDetail(albumId || null)
  const album = data?.result as ILibrary
  const { data: recommendData, isPending: recommendPending } = useGetAlbumWithArtist(album?.owners?.[0]?._id || null, 5, 1)
  const listTracks = data?.result.list_of_tracks as ITrack[]
  const listTrackIds = listTracks?.map((track) => track._id)
  const handleClose = () => {
    setClose(true)
  }
  const refetchAlbum = () => refetch()

  return (
    <Box sx={{ width: '100%', pt: '14px', overflowY: 'auto', transform: 'translateX(18px)' }} display='flex' flexDirection='column'>
      <Box display='flex' flexDirection='row' gap='2'>
        <Box sx={{ width: '30%', padding: 0 }}>
          <AlbumInfo album={album} firstImage={listTracks?.[0]?.image || ''} />
        </Box>
        <Box sx={{ width: '70%', ml: 2, padding: 0 }}>
          {albumId && <ListTracks listTracks={listTracks} isPending={isPending} albumId={albumId} type={album?.type} />}
        </Box>
      </Box>
      {album?.type === 'playlist' && (
        <Box sx={{ mt: 2, padding: 0 }}>
          {!close && <TrackForPlayList handleClose={handleClose} listTrackIds={listTrackIds} playlistId={album._id} refetchAlbum={refetchAlbum} />}
          {close && (
            <Box
              sx={{
                'width': '100%',
                'textAlign': 'right',
                'paddingRight': '18px',
                'color': (theme) => theme.palette.secondary4.main,
                'fontSize': '13px',
                '&:hover': {
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }
              }}
              onClick={() => setClose(false)}
            >
              Tìm thêm
            </Box>
          )}
        </Box>
      )}

      {recommendData?.result.data && (
        <ListAlbum
          listAlbum={recommendData?.result.data}
          title={`Các album khác của ${album?.owners?.[0]?.name}`}
          isPending={recommendPending}
        />
      )}
    </Box>
  )
}
