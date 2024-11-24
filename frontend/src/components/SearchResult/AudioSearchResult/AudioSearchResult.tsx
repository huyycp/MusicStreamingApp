import Box from '@mui/material/Box'
import TrackItem from '../TrackItem/TrackItem'
import Typography from '@mui/material/Typography'
import { useAudioContext } from '~/hooks/useGetAudio'
import useSearchByAudio from '~/hooks/Search/useSearchByAudio'
import { CircularProgress } from '@mui/material'
import { ITrack } from '~/type/Tracks/ITrack'
import GenresSearchTag from '../GenresTag/GenresSearchTag'

export default function AudioSearchResutl() {
  const { audioFile } = useAudioContext()

  const { data, isLoading } = useSearchByAudio(audioFile)

  return (
    <Box sx={{ width: '100%', pt: 2 }}>
      {isLoading && (
        <Box sx={{ width: '100%', height: 'auto', minHeight: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CircularProgress size={36} />
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
      {!data && !isLoading && (
        <GenresSearchTag />
      )}
    </Box>
  )
}
