import Box from '@mui/material/Box'
import { IArtist } from '~/type/Artist/IArtist'
import { useResize } from '~/hooks/useResize'
import ArtistTag from './ArtistTag'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import Skeleton from '@mui/material/Skeleton'

type Props = {
  title: string
  artists: IArtist[]
  isPending: boolean
}

export default function ListArtist({ title, artists, isPending }: Props) {
  const { widths } = useResize()
  const [listArtist, setListArtist] = useState<IArtist[]>([])

  useEffect(() => {
    const numberOfVisibleItems = Math.floor((widths[1] || 0) / 185)
    setListArtist(artists.slice(0, numberOfVisibleItems))
  }, [artists, widths])
  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'end',
          justifyContent: 'space-between',
          blockSize: '60px',
          inlineSize: '100%',
          pl: '12px'
        }}
      >
        <Typography
          variant='h5'
          sx={{
            'cursor': 'pointer',
            '&:hover': {
              textDecoration: 'underline'
            }
          }}
        >
          {title}
        </Typography>
        <Typography
          variant='body2'
          sx={{
            'cursor': 'pointer',
            'color': (theme) => theme.palette.neutral.neutral1,
            '&:hover': {
              textDecoration: 'underline'
            }
          }}
        >
          Hiện tất cả
        </Typography>
      </Box>
      {isPending && (
        <Box sx={{ display: 'flex', gap: '10px', width: '100%' }}>
          {[...Array(5)].map((_, index) => (
            <Skeleton key={index} variant='circular' width={138} height={138} sx={{ flexShrink: 0, marginRight: '8px' }} />
          ))}
        </Box>
      )}
      {!isPending && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%' }}>
          {listArtist.map((artist) => {
            return <ArtistTag key={artist._id} artist={artist} />
          })}
        </Box>
      )}
    </Box>
  )
}
