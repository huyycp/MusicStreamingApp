import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ArtistTag from '~/components/Artist/ArtistTag'
import useGetArtistWeeklyTop from '~/hooks/Top/useGetArtistWeeklyTop'
import { IArtist } from '~/type/Artist/IArtist'

export const ArtistViewWeeklyTop = () => {
  const { data } = useGetArtistWeeklyTop()

  const listArtist = data?.result as IArtist[]

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
        Top 10 nghệ sĩ có lượt nghe nhiều nhất tuần
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '10px',
          width: '100%'
        }}
      >
        {listArtist && listArtist.map((artist) => {
          return <ArtistTag key={artist._id} artist={artist} tag='week-top10' />
        })}
      </Box>
    </Box>
  )
}
