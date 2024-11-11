import Box from '@mui/material/Box'
import AlbumInfo from './AlbumInfo/AlbumInfo'
import { Params, useParams } from 'react-router-dom'
import useGetAlbumDetail from '~/hooks/Album/useGetLibraryDetail'
import ListTracks from './ListTracks/ListTracks'

export default function LibraryItemDetail() {
  const { albumId } = useParams<Params>()
  const { data, isPending } = useGetAlbumDetail(albumId || null)
  const album = data?.result
  const listTracks = data?.result.list_of_tracks

  return (
    <Box sx={{ width: '100%', pt: '14px', overflowY: 'scroll' }} display='flex' flex='row' gap='2'>
      <Box sx={{ width: '30%' }}>
        <AlbumInfo album={album} />
      </Box>
      <Box sx={{ width: '70%', ml: 2 }}>{albumId && <ListTracks listTracks={listTracks} isPending={isPending} albumId={albumId} />}</Box>
    </Box>
  )
}
