import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import Box from '@mui/system/Box'
import { useMemo } from 'react'
import AlbumTag from '~/components/AlbumTag'
import useGetAlbums from '~/hooks/Album/useGetAlbums'
import { ILibrary } from '~/type/Library/ILibrary'

export default function SectionAlbum() {
  const { data, isPending, isLoading } = useGetAlbums(10, 1)

  const listAlbum = useMemo(() => (data?.result?.data as ILibrary[]) || [], [data])

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
        Album dành cho bạn
      </Typography>

      {isLoading || isPending ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            flexWrap: 'wrap', // Allow wrapping to new lines when the container width is exceeded
            inlineSize: '100%'
          }}
        >
          {[...Array(5)].map((_, index) => (
            <Skeleton key={index} variant='rectangular' width={180} height={180} sx={{ flexShrink: 0, marginRight: '8px', marginBottom: '8px' }} />
          ))}
        </Box>
      ) : listAlbum.length > 0 ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            flexWrap: 'wrap'
          }}
        >
          {listAlbum.map((album, index) => (
            <Box
              key={index}
              sx={{
                flexShrink: 0,
                flexBasis: 'auto',
                marginRight: '8px',
                marginBottom: '8px'
              }}
            >
              <AlbumTag album={album} />
            </Box>
          ))}
        </Box>
      ) : (
        <Typography variant='body1' sx={{ marginTop: 2 }}>
          Không có album nào để hiển thị.
        </Typography>
      )}
    </Box>
  )
}
