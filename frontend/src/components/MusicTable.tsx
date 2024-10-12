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

export default function MusicTable() {
  const { data, isPending } = useGetTracksByArtist()
  const listMusic = data?.result.data
  const theme = useTheme()
  const textColor = theme.palette.secondary4.main

  return (
    <TableContainer component={Paper} sx={{ minWidth: 150, maxWidth: '100%', overflow: 'auto', bgcolor: 'transparent' }}>
      <Table aria-label='music table' sx={{ tableLayout: 'fixed' }}>
        <TableHead sx={{ bgcolor: theme.palette.secondary5.main }}>
          <TableRow>
            <TableCell sx={{ color: textColor }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                Song <SortIcon sx={{ fontSize: 16 }} />
              </Box>
            </TableCell>
            <TableCell align='left' sx={{ color: textColor }}>
              Artist
            </TableCell>
            <TableCell align='right' sx={{ color: textColor, width: '60px' }}>
              Views
            </TableCell>
            <TableCell align='right' sx={{ color: textColor, width: '60px' }}>
              Release
            </TableCell>
            <TableCell align='right' sx={{ color: textColor, width: '60px' }}>
              Likes
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ bgcolor: theme.palette.neutral.neutral3 }}>
          {isPending
            ? // Hiển thị shimmer khi dữ liệu đang tải
            Array.from(new Array(5)).map((_, index) => (
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
                    sx={{ maxWidth: 250, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: textColor }}
                  >
                    {row.artistsName.join(', ')}
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
    </TableContainer>
  )
}
