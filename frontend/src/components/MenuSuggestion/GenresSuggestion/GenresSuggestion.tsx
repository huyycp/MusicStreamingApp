import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import useGetGenres from '~/hooks/Genres/useGetGenres'
import { useUser } from '~/hooks/useUser'
import { IGenres } from '~/type/Genres/IGenres'
import { GenresList } from './GenresTag/GenresList'

export default function GenresSuggestion() {
  const { data } = useGetGenres()
  const { user } = useUser()

  const genres = data?.result as IGenres[]

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: 2 }}>
      <Typography variant='body2' fontWeight='bold'>
        Thể loại của bạn
      </Typography>
      {user?.genres ? (
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, width: '100%' }}>
          <GenresList genres={user.genres} />
        </Box>
      ) : (
        genres && (
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, width: '100%' }}>
            <GenresList genres={genres} />
          </Box>
        )
      )}
    </Box>
  )
}
