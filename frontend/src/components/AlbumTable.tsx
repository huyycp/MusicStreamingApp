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
import useGetAlbumByArtist from '~/hooks/Album/useGetAlbumByArtist'
import Skeleton from '@mui/material/Skeleton'
import { ILibrary } from '~/type/Library/ILibrary'
import { useEffect, useRef } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import IconButton from '@mui/material/IconButton'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { useNavigate } from 'react-router-dom'

export default function AlbumTable() {
  const { data, isPending, hasNextPage, fetchNextPage, isFetchingNextPage } = useGetAlbumByArtist(5)
  const listAlbum = data?.pages?.flatMap((page) => page.result.data) as ILibrary[]
  const theme = useTheme()
  const textColor = theme.palette.secondary4.main
  const loader = useRef(null)
  const navigate = useNavigate()

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
      <TableContainer component={Paper} sx={{ minWidth: 150, maxWidth: '100%', height: '100%', overflow: 'auto', bgcolor: 'transparent' }}>
        <Table aria-label='album table' sx={{ tableLayout: 'fixed' }}>
          <TableHead sx={{ bgcolor: theme.palette.secondary5.main }}>
            <TableRow>
              <TableCell sx={{ color: textColor }}>Album</TableCell>
              <TableCell align='left' sx={{ color: textColor }}>
                Artist
              </TableCell>
              <TableCell align='right' sx={{ color: textColor, width: '120px' }}>
                Số bài hát
              </TableCell>
              <TableCell align='right' sx={{ color: textColor, width: '120px' }}>
                Lượt nghe
              </TableCell>
              <TableCell align='right' sx={{ color: textColor, width: '120px' }}>
                Thêm bài hát
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
              : listAlbum?.map((row) => (
                <TableRow key={row._id}>
                  <TableCell
                    component='th'
                    scope='row'
                    sx={{ color: textColor, maxWidth: 300, minWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                  >
                    <Box display='flex' alignItems='center'>
                      <img
                        alt={row?.name}
                        src={row?.image?.replace('{w}x{h}bb', '48x48bb')}
                        onError={(e) => {
                          e.currentTarget.src = 'https://res.cloudinary.com/dswj1rtvu/image/upload/v1727670619/no-image_vueuvs.avif' // Đường dẫn đến ảnh mặc định
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
                      sx={{ maxWidth: 250, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: textColor }}
                    >
                      {row.owners?.map((artist) => artist.name).join(', ') || 'Unknown Artist'}
                    </Typography>
                  </TableCell>
                  <TableCell align='right' sx={{ color: textColor }}>
                    {row.number_of_tracks}
                  </TableCell>
                  <TableCell align='right' sx={{ color: textColor }}>
                      N/A
                  </TableCell>
                  <TableCell align='center' sx={{ color: textColor }}>
                    <IconButton
                      sx={{
                        'height': '24px',
                        'width': '24px',
                        'color': (theme) => theme.palette.primary.main,
                        '&:hover': {
                          color: (theme) => theme.palette.secondary4.main
                        }
                      }}
                      onClick={() => {
                        navigate(`/create-album/${row._id}/add-track`)
                      }}
                    >
                      <AddCircleOutlineIcon />
                    </IconButton>
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
