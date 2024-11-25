import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import SortIcon from '@mui/icons-material/Sort'
import Skeleton from '@mui/material/Skeleton'
import useGetTracksByArtist from '~/hooks/Tracks/useGetTracksByArtist'
import { useEffect, useRef } from 'react'
import CircularProgress from '@mui/material/CircularProgress'

export default function MusicTable() {
  const { data, isPending, hasNextPage, fetchNextPage, isFetchingNextPage } = useGetTracksByArtist(5, 'all')
  const listMusic = data?.pages?.flatMap((page) => page.result.data)
  const theme = useTheme()
  const textColor = theme.palette.secondary4.main
  const loader = useRef(null)

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0
    }

    const observer = new IntersectionObserver(handleObserver, options)
    const currentLoader = loader.current
    if (currentLoader) {
      observer.observe(currentLoader)
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasNextPage])

  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    const target = entries[0]
    if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }

  return (
    <Box sx={{ position: 'relative', height: '100%' }}>
      <TableContainer
        component={Paper}
        sx={{
          minWidth: 150,
          maxWidth: '100%',
          height: '100%',
          overflow: 'auto',
          bgcolor: 'transparent'
        }}
      >
        <Table aria-label='music table' sx={{ tableLayout: 'fixed' }}>
          <TableHead sx={{ bgcolor: theme.palette.secondary5.main }}>
            <TableRow>
              <TableCell sx={{ color: textColor }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  Bài hát <SortIcon sx={{ fontSize: 16 }} />
                </Box>
              </TableCell>
              <TableCell align='left' sx={{ color: textColor }}>
                Nghệ sĩ
              </TableCell>
              <TableCell align='right' sx={{ color: textColor, width: '100px' }}>
                Lượt nghe
              </TableCell>
              <TableCell align='right' sx={{ color: textColor, width: '80px' }}>
                Ra mắt
              </TableCell>
              <TableCell align='right' sx={{ color: textColor, width: '100px' }}>
                Lượt thích
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ bgcolor: theme.palette.neutral.neutral3 }}>
            {isPending
              ? Array.from(new Array(5)).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Box display='flex' alignItems='center'>
                      <Skeleton variant='rectangular' width={48} height={48} sx={{ borderRadius: '10px', marginRight: '10px' }} />
                      <Skeleton variant='text' width={150} height={24} />
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Skeleton variant='text' width={200} height={24} />
                  </TableCell>
                  <TableCell align='right'>
                    <Skeleton variant='text' width={50} height={24} />
                  </TableCell>
                  <TableCell align='right'>
                    <Skeleton variant='text' width={50} height={24} />
                  </TableCell>
                  <TableCell align='right'>
                    <Skeleton variant='text' width={50} height={24} />
                  </TableCell>
                </TableRow>
              ))
              : listMusic?.map((row) => (
                <TableRow key={row._id}>
                  <TableCell
                    component='th'
                    scope='row'
                    sx={{ color: textColor, maxWidth: 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                  >
                    <Box display='flex' alignItems='center'>
                      <img
                        alt={row?.name}
                        src={row?.image?.replace('{w}x{h}bb', '48x48bb')}
                        onError={(e) => {
                          e.currentTarget.src = 'https://res.cloudinary.com/dswj1rtvu/image/upload/v1727670619/no-image_vueuvs.avif'
                        }}
                        style={{
                          inlineSize: '48px',
                          blockSize: '48px',
                          objectFit: 'cover',
                          borderRadius: '10px',
                          marginRight: '10px'
                        }}
                      />
                      <Typography noWrap variant='body2'>
                        {row.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align='left'>
                    <Typography
                      noWrap
                      variant='body2'
                      sx={{
                        maxWidth: 250,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        color: textColor
                      }}
                    >
                      {row.owners.map((artist) => artist.name).join(', ')}
                    </Typography>
                  </TableCell>
                  <TableCell align='right' sx={{ color: textColor }}>
                      N/A
                  </TableCell>
                  <TableCell align='right' sx={{ color: textColor }}>
                      N/A
                  </TableCell>
                  <TableCell align='right' sx={{ color: textColor }}>
                      N/A
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {hasNextPage && (
          <Box
            ref={loader}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              padding: 2,
              width: '100%'
            }}
          >
            {isFetchingNextPage && <CircularProgress size={24} />}
          </Box>
        )}
      </TableContainer>
    </Box>
  )
}
