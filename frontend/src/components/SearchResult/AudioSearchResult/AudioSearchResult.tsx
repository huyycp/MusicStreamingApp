import Box from '@mui/material/Box'
import TrackItem from '../TrackItem/TrackItem'
import Typography from '@mui/material/Typography'
import { useAudioContext } from '~/hooks/useGetAudio'
import useSearchByAudio from '~/hooks/Search/useSearchByAudio'
import { CircularProgress } from '@mui/material'
import { ITrack } from '~/type/Tracks/ITrack'
import GenresSearchTag from '../GenresTag/GenresSearchTag'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import useSearch from '~/hooks/Search/useSearch'
import ListArtist from '~/components/Artist/ListArtist'
import ListAlbum from '../ListAlbum/ListAlbum'
import SearchResults from '../SearchTracks/SearchTracks'

export default function AudioSearchResutl() {
  const { audioFile, clearSearch, searchKeyword } = useAudioContext()

  const queryClient = useQueryClient()

  const { data, isLoading } = useSearchByAudio(audioFile)
  const { data: searchData, isLoading: searchLoading } = useSearch(searchKeyword)

  useEffect(() => {
    return () => {
      clearSearch()
      queryClient.removeQueries({ queryKey: ['searchByAudio'] })
      queryClient.removeQueries({ queryKey: ['search'] })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box sx={{ width: '100%', pt: 2 }}>
      {(isLoading || searchLoading) && (
        <Box sx={{ width: '100%', height: 'auto', minHeight: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CircularProgress size={36} />
        </Box>
      )}
      {searchData && (
        <Box>
          {searchData.result && searchData.result.tracks && searchData.result.tracks.length > 0 && (
            <SearchResults tracks={searchData.result.tracks} />
          )}

          {searchData.result && searchData.result.albums && searchData.result.albums.length > 0 && (
            <ListAlbum listAlbum={searchData.result.albums} title='Album' isPending={searchLoading} />
          )}

          {searchData.result && searchData.result.artists && searchData.result.artists.length > 0 && (
            <ListArtist artists={searchData.result.artists} title='Nghệ sĩ' isPending={searchLoading} />
          )}
        </Box>
      )}
      {data && data.result.length > 0 && (
        <Box>
          <Typography variant='h5' fontWeight='bold' sx={{ color: (theme) => theme.palette.secondary4.main }}>
            Kết quả tìm kiếm
          </Typography>

          {data.result.map((track: ITrack) => (
            <TrackItem key={track._id} track={track} />
          ))}
        </Box>
      )}
      {data && data.result.length === 0 && (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <Typography variant='h5' fontWeight='bold' sx={{ color: (theme) => theme.palette.secondary4.main }}>
            Không tìm thấy kết quả
          </Typography>
        </Box>
      )}
      {!isLoading && !searchLoading && <GenresSearchTag />}
    </Box>
  )
}
