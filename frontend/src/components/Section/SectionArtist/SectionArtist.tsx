import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import Box from '@mui/system/Box'
import { useRef, useEffect } from 'react'
import ArtistTag from '~/components/Artist/ArtistTag'
import useGetInfiniteArtist from '~/hooks/Artist/useGetInfiniteArtist'
export default function SectionArtist() {
  const { data, isPending, hasNextPage, fetchNextPage, isFetchingNextPage } = useGetInfiniteArtist(8)
  const observerRef = useRef<HTMLDivElement | null>(null)

  const listArtist = data?.pages?.flatMap((page) => page.result.data)

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
        Nghệ sĩ nổi tiếng
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
            <Skeleton key={index} variant='circular' width={138} height={138} sx={{ flexShrink: 0, marginRight: '8px' }} />
          ))}
        </Box>
      ) : (
        <>
          {listArtist && listArtist.length > 0 ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                flexWrap: 'wrap'
              }}
            >
              {listArtist.map((artist, index) => (
                <Box
                  key={index}
                  sx={{
                    flexShrink: 0,
                    flexBasis: 'auto',
                    marginRight: '8px',
                    marginBottom: '8px'
                  }}
                >
                  <ArtistTag key={artist._id} artist={artist} />
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
