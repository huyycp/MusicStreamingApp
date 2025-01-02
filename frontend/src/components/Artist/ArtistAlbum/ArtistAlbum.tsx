import Box from '@mui/system/Box'
import ListTracks from '../ListAlbum'
import useGetAlbumWithArtist from '~/hooks/Artist/useGetAlbumWithArtist'
import { ILibrary } from '~/type/Library/ILibrary'
import Typography from '@mui/material/Typography'
import { IArtist } from '~/type/Artist/IArtist'

type Props = {
  artist: IArtist
}

export default function ArtistAlbum({ artist }: Props) {
  const { data, isPending } = useGetAlbumWithArtist(artist._id || null, 5, 0)
  const albums = data?.result.data as ILibrary[]
  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography
        variant='body2'
        sx={{
          color: (theme) => theme.palette.neutral.neutral2,
          fontWeight: 'bold'
        }}
      >
        Các album của
      </Typography>
      <Typography
        variant='h6'
        sx={{
          color: (theme) => theme.palette.secondary4.main,
          fontWeight: 'bold'
        }}
      >
        {artist.name}
      </Typography>
      <ListTracks listAlbums={albums} isPending={isPending} />
    </Box>
  )
}
