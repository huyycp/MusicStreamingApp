import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import Box from '@mui/system/Box'
import { useRef, useEffect } from 'react'
import AlbumTag from '~/components/AlbumTag'
import useGetInfiniteAlbum from '~/hooks/Album/useGetInfiniteAlbum'

export default function SectionAlbum() {
  const { data, isPending, hasNextPage, fetchNextPage, isFetchingNextPage } = useGetInfiniteAlbum(8)
  const observerRef = useRef<HTMLDivElement | null>(null)

  const listAlbum = data?.pages?.flatMap((page) => page.result.data)

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage()
        }
      },
      { root: null, rootMargin: '0px', threshold: 1.0 }
    )

    if (observerRef.current) observer.observe(observerRef.current)

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (observerRef.current) observer.unobserve(observerRef.current)
    }
  }, [hasNextPage, fetchNextPage, isFetchingNextPage])

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

      {isPending ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            flexWrap: 'wrap',
            inlineSize: '100%'
          }}
        >
          {[...Array(5)].map((_, index) => (
            <Skeleton key={index} variant='rectangular' width={180} height={180} sx={{ flexShrink: 0, marginRight: '8px', marginBottom: '8px' }} />
          ))}
        </Box>
      ) : (
        <>
          {listAlbum && listAlbum.length > 0 ? (
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

          {isFetchingNextPage && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                flexWrap: 'wrap',
                inlineSize: '100%'
              }}
            >
              {[...Array(5)].map((_, index) => (
                <Skeleton
                  key={`loading-${index}`}
                  variant='rectangular'
                  width={180}
                  height={180}
                  sx={{ flexShrink: 0, marginRight: '8px', marginBottom: '8px' }}
                />
              ))}
            </Box>
          )}
        </>
      )}

      <Box ref={observerRef} sx={{ height: '1px' }} />
    </Box>
  )
}
