/* eslint-disable no-unused-vars */
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { useTheme } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { Fragment, useEffect, useState } from 'react'
import { ITrack } from '~/type/Tracks/ITrack'
import { getAudioDuration } from '~/utils/getAudioDuration'
import { formatDuration } from '~/utils/formatDuration'
import Tooltip from '@mui/material/Tooltip'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

type Props = {
  listTracks: ITrack[]
  isPending: boolean
  onDeleteTrack?: (trackId: string) => void
  onAddTrack?: (trackId: string) => void
}

const ListTracks = ({ listTracks, isPending, onDeleteTrack, onAddTrack }: Props) => {
  const theme = useTheme()
  const textColor = theme.palette.secondary4.main
  const borderColor = theme.palette.neutral.neutral3
  const hoverBackgroundColor = theme.palette.neutral.neutral3
  const [trackDurations, setTrackDurations] = useState<{ [key: string]: number }>({})

  useEffect(() => {
    const fetchDurations = async () => {
      const durations: { [key: string]: number } = {}
      for (const track of listTracks) {
        const duration = await getAudioDuration(track.path_audio)
        durations[track._id] = duration
      }
      setTrackDurations(durations)
    }
    fetchDurations()
  }, [listTracks])

  return (
    <TableContainer
      component={Paper}
      sx={{
        minWidth: 150,
        maxWidth: '100%',
        overflow: 'hidden',
        bgcolor: 'transparent',
        p: 'unset'
      }}
    >
      <Table aria-label='music table' sx={{ tableLayout: 'fixed' }}>
        <TableBody>
          {!isPending &&
            listTracks.map((row) => (
              <TableRow
                key={row._id}
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
                    <Box display='flex' alignItems='center' justifyContent='center' position='relative' width='48px' height='48px' marginRight='10px'>
                      <img
                        alt={row.name}
                        src={row.image?.replace('{w}x{h}bb', '48x48bb')}
                        onError={(e) => {
                          e.currentTarget.src = 'https://res.cloudinary.com/dswj1rtvu/image/upload/v1727670619/no-image_vueuvs.avif'
                        }}
                        style={{
                          width: '48px',
                          height: '48px',
                          objectFit: 'cover',
                          borderRadius: '10px',
                          opacity: 1,
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
                <TableCell
                  align='right'
                  sx={{
                    color: textColor,
                    borderColor: borderColor,
                    width: '150px',
                    pr: 1
                  }}
                >
                  <Box display='flex' alignItems='center' justifyContent='flex-end' gap={2}>
                    <Typography variant='body2'>{formatDuration(trackDurations[row._id] || 0)}</Typography>
                    <IconButton
                      size='small'
                      onClick={(e) => {
                        e.stopPropagation()
                        onDeleteTrack?.(row._id)
                        onAddTrack?.(row._id)
                      }}
                      sx={{
                        opacity: 1,
                        transition: 'opacity 0.2s ease',
                        color: (theme) => theme.palette.secondary4.main
                      }}
                    >
                      {onDeleteTrack && (
                        <Tooltip title='Xóa bài hát khỏi album' placement='top'>
                          <DeleteIcon sx={{ fontSize: 20 }} />
                        </Tooltip>
                      )}
                      {onAddTrack && (
                        <Tooltip title='Thêm bài hát vào album' placement='top'>
                          <AddCircleOutlineIcon sx={{ fontSize: 20 }} />
                        </Tooltip>
                      )}
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ListTracks
