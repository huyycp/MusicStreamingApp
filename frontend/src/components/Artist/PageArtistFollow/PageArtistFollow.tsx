import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useUser } from '~/hooks/useUser'
import { useFavorite } from '~/hooks/useFavorite'
import ArtistTag from '../ArtistTag'

const PageArtistFollow = () => {
  const { user } = useUser()
  const { followUsers } = useFavorite()

  if (!user) {
    window.location.href = '/login'
  }

  return (
    <Box sx={{ inlineSize: '100%' }}>
      <Typography
        variant='h4'
        fontWeight='bold'
        sx={{
          'paddingTop': 3,
          'paddingBottom': 2,
          'cursor': 'pointer',
          '&:hover': {
            textDecoration: 'underline'
          }
        }}
      >
        Nghệ sĩ đang theo dõi
      </Typography>

      {followUsers.length > 0 ? (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%' }}>
          {followUsers.map((artist) => {
            return <ArtistTag key={artist._id} artist={artist} />
          })}
        </Box>
      ) : (
        <Typography variant='body1' sx={{ marginTop: 2 }}>
          Bạn chưa theo dõi bất kỳ nghệ sĩ nào.
        </Typography>
      )}
    </Box>
  )
}

export default PageArtistFollow
