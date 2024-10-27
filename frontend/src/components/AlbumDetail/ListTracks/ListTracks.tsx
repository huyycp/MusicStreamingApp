import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Skeleton from '@mui/material/Skeleton'
import { useTheme } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import MicExternalOnOutlinedIcon from '@mui/icons-material/MicExternalOnOutlined'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import { Fragment, useState } from 'react'
import { ITrack } from '~/type/Tracks/ITrack'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { useMusic } from '~/hooks/useMusic'

type Props = {
  albumId: string
  listTracks: ITrack[]
  isPending: boolean
}

export default function ListTracks({ listTracks, isPending, albumId }: Props) {
  const theme = useTheme()
  const textColor = theme.palette.secondary4.main
  const borderColor = theme.palette.neutral.neutral3
  const hoverBackgroundColor = theme.palette.neutral.neutral3
  const [hoveredRow, setHoveredRow] = useState<string | null>(null)
  const { currentAlbumIndex, addAlbum, pause, setPause, music } = useMusic()

  const handlePlay = (index: number, musicId: string) => {
    if (albumId === currentAlbumIndex && musicId === music?._id) {
      setPause(!pause)
    } else {
      addAlbum(albumId, index)
    }
  }

  return (
    <TableContainer component={Paper} sx={{ minWidth: 150, maxWidth: '100%', overflow: 'auto', bgcolor: 'transparent' }}>
      <Table aria-label='music table' sx={{ tableLayout: 'fixed' }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: textColor, borderColor: borderColor }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>Bài hát</Box>
            </TableCell>
            <TableCell align='right' sx={{ color: textColor, width: '100px', borderColor: borderColor }}>
              Thời gian
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isPending
            ? Array.from(new Array(5)).map((_, index) => (
              <TableRow key={index}>
                <TableCell
                  component='th'
                  scope='row'
                  sx={{
                    color: 'text.secondary',
                    maxWidth: 400,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    border: borderColor,
                    position: 'relative'
                  }}
                >
                  <Box display='flex' alignItems='center' position='relative'>
                    <Skeleton variant='rectangular' width={48} height={48} sx={{ borderRadius: '10px', marginRight: '10px' }} />
                    <Skeleton variant='text' width='60%' height={24} />
                  </Box>
                </TableCell>
                <TableCell align='right' sx={{ color: 'text.secondary', border: borderColor }}>
                  <Skeleton variant='text' width={30} height={24} />
                </TableCell>
              </TableRow>
            ))
            : listTracks.map((row, index) => (
              <TableRow
                key={row._id}
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
                    <Box
                      display='flex'
                      alignItems='center'
                      justifyContent='center'
                      position='relative'
                      width='48px'
                      height='48px'
                      marginRight='10px'
                      onClick={() => handlePlay(index, row._id)}
                    >
                      <img
                        alt={row.name}
                        src={row.image?.replace('{w}x{h}bb', '48x48bb')}
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
                      {hoveredRow === row._id && (
                        <PlayArrowIcon
                          sx={{
                            fontSize: 30,
                            color: 'white',
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            zIndex: 1
                          }}
                        />
                      )}
                    </Box>
                    <Box display='flex' flexDirection='column'>
                      <Typography noWrap variant='body2'>
                        {row.name}
                      </Typography>
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
                        {row.artistsName.map((artist, index) => (
                          <Fragment key={artist}>
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
                              {artist}
                            </Typography>
                            {index < row.artistsName.length - 1 && ','}
                          </Fragment>
                        ))}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell align='right' sx={{ color: textColor, borderColor: borderColor }}>
                  {hoveredRow !== row._id ? (
                    'N/A'
                  ) : (
                    <Box
                      className='icon-actions'
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: 1,
                        alignItems: 'center'
                      }}
                    >
                      <Tooltip title='Phát cùng lời bài hát' placement='top'>
                        <IconButton
                          sx={{
                            '&:hover': {
                              backgroundColor: theme.palette.neutral.neutral2
                            }
                          }}
                        >
                          <MicExternalOnOutlinedIcon sx={{ color: theme.palette.neutral.neutral1, fontSize: 17 }} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title='Thêm vào thư viện' placement='top'>
                        <IconButton
                          sx={{
                            '&:hover': {
                              backgroundColor: theme.palette.neutral.neutral2
                            }
                          }}
                        >
                          <FavoriteBorderOutlinedIcon sx={{ color: theme.palette.neutral.neutral1, fontSize: 17 }} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title='Khác' placement='top'>
                        <IconButton
                          sx={{
                            '&:hover': {
                              backgroundColor: theme.palette.neutral.neutral2
                            }
                          }}
                        >
                          <MoreHorizIcon sx={{ color: theme.palette.neutral.neutral1, fontSize: 17 }} />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
