import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useResize } from '~/hooks/useResize'
import { useEffect, useState, useMemo } from 'react'
import { IAlbum } from '~/type/Album/IAlbum'
import AlbumTag from './AlbumTag'
import useGetAlbums from '~/hooks/Album/useGetAlbums'
import Skeleton from '@mui/material/Skeleton'

export default function RecommendAlbum() {
  const { data, isPending } = useGetAlbums(5, 1)

  const listAlbum = useMemo(() => (data?.result?.data as IAlbum[]) || [], [data])

  const { widths } = useResize()
  const [albumList, setAlbumList] = useState<IAlbum[]>([])

  useEffect(() => {
    const numberOfVisibleItems = Math.floor((widths[1] || 0) / 185)
    setAlbumList(listAlbum.slice(0, numberOfVisibleItems))
  }, [listAlbum, widths])

  return (
    <Box sx={{ inlineSize: '100%', blockSize: 'auto' }}>
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
            cursor: 'pointer',
            '&:hover': {
              textDecoration: 'underline'
            }
          }}
        >
          Album 1
        </Typography>
        <Typography
          variant='body2'
          sx={{
            cursor: 'pointer',
            color: (theme) => theme.palette.neutral.neutral1,
            '&:hover': {
              textDecoration: 'underline'
            }
          }}
        >
          Hiện tất cả
        </Typography>
      </Box>

      <Box
        sx={{
          inlineSize: '100%',
          blockSize: 'auto',
          display: 'flex',
          justifyContent: 'flex-start',
          overflow: 'hidden'
        }}
      >
        {isPending ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              flexWrap: 'nowrap',
              inlineSize: '100%'
            }}
          >
            {[...Array(5)].map((_, index) => (
              <Skeleton
                key={index}
                variant="rectangular"
                width={180}
                height={180}
                sx={{ flexShrink: 0, marginRight: '8px' }}
              />
            ))}
          </Box>
        ) : albumList.length > 0 ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              flexWrap: 'nowrap'
            }}
          >
            {albumList.map((album, index) => (
              <Box
                key={index}
                sx={{
                  flexShrink: 0,
                  flexBasis: 'auto',
                  marginRight: '8px'
                }}
              >
                <AlbumTag album={album} />
              </Box>
            ))}
          </Box>
        ) : (
          <Typography variant="body1" sx={{ marginTop: 2 }}>
            Không có album nào để hiển thị.
          </Typography>
        )}
      </Box>
    </Box>
  )
}
