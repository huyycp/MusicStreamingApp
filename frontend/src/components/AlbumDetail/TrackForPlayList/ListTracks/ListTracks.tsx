import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { useTheme } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import { Fragment, useState } from 'react'
import { ITrack } from '~/type/Tracks/ITrack'
import Button from '@mui/material/Button'
import useAddTrackToAlbum from '~/hooks/Album/useAddTrackToAlbum'
import { useSnackbar } from 'notistack'
import { QueryObserverResult } from '@tanstack/react-query'
import { IResponse } from '~/type/IResponse'

type Props = {
  listTrackIds: string[]
  listTracks: ITrack[]
  playlistId: string
  refetchAlbum: () => Promise<QueryObserverResult<IResponse, Error>>
}

export default function ListTracks({ listTracks, listTrackIds, playlistId, refetchAlbum }: Props) {
  const theme = useTheme()
  const textColor = theme.palette.secondary4.main
  const borderColor = theme.palette.neutral.neutral3
  const hoverBackgroundColor = theme.palette.neutral.neutral3
  const [hoveredRow, setHoveredRow] = useState<string | null>(null)
  const { enqueueSnackbar } = useSnackbar()
  const { mutate } = useAddTrackToAlbum()

  const handleAddTrack = (playlistId: string, trackId: string, type: 'add' | 'del') => {
    mutate(
      { library_id: playlistId, tracks: [trackId], type: type },
      {
        onSuccess: () => {
          refetchAlbum()
          if (type === 'add') enqueueSnackbar('Thêm vào danh sách phát thành công!', { variant: 'success' })
          if (type === 'del') enqueueSnackbar('Xóa khỏi danh sách phát thành công!', { variant: 'success' })
        },
        onError: () => {
          enqueueSnackbar('Thêm vào danh sách phát thất bại', { variant: 'error' })
        }
      }
    )
  }

  return (
    <TableContainer component={Paper} sx={{ minWidth: 150, maxWidth: '100%', overflow: 'auto', bgcolor: 'transparent', paddingTop: '20px' }}>
      <Table aria-label='music table' sx={{ tableLayout: 'fixed' }}>
        <TableBody>
          {listTracks.map((row, index) => (
            <TableRow
              key={index}
              onMouseEnter={() => setHoveredRow(row._id)}
              onMouseLeave={() => setHoveredRow(null)}
              sx={{
                '&:hover': {
                  backgroundColor: hoverBackgroundColor
                },
                'cursor': 'pointer'
              }}
            >
              <TableCell
                component='th'
                scope='row'
                sx={{
                  borderColor: borderColor,
                  color: textColor,
                  maxWidth: 400,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  position: 'relative'
                }}
              >
                <Box display='flex' alignItems='center'>
                  <Box display='flex' alignItems='center' justifyContent='center' position='relative' width='36px' height='36px' marginRight='10px'>
                    <img
                      alt={row.name}
                      src={row.image?.replace('{w}x{h}bb', '36x36bb')}
                      onError={(e) => {
                        e.currentTarget.src = 'https://res.cloudinary.com/dswj1rtvu/image/upload/v1727670619/no-image_vueuvs.avif'
                      }}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '10px',
                        opacity: hoveredRow === row._id ? 0.5 : 1,
                        transition: 'opacity 0.3s ease'
                      }}
                    />
                  </Box>
                  <Box display='flex' flexDirection='column'>
                    <Typography noWrap variant='body2'>
                      {row.name}
                    </Typography>
                    {row.owners && (
                      <Typography
                        sx={{
                          fontSize: 12,
                          cursor: 'pointer',
                          color: (theme) => theme.palette.neutral.neutral1,
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: 0.3
                        }}
                      >
                        {row.owners.map((artist, index) => (
                          <Fragment key={artist._id}>
                            <Typography
                              component='span'
                              sx={{
                                'fontSize': 12,
                                'cursor': 'pointer',
                                'color': (theme) => theme.palette.neutral.neutral1,
                                '&:hover': {
                                  color: (theme) => theme.palette.secondary4.main,
                                  textDecoration: 'underline'
                                }
                              }}
                            >
                              {artist.name}
                            </Typography>
                            {index < row.owners.length - 1 && ','}
                          </Fragment>
                        ))}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </TableCell>
              <TableCell align='right' sx={{ color: textColor, borderColor: borderColor }}>
                {listTrackIds?.includes(row._id) ? (
                  <Button variant='outlined' onClick={() => handleAddTrack(playlistId, row._id, 'del')}>
                    Xóa
                  </Button>
                ) : (
                  <Button variant='outlined' onClick={() => handleAddTrack(playlistId, row._id, 'add')}>
                    Thêm
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
