import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { useTheme } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { Fragment, useState } from 'react'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { ITrack } from '~/type/Tracks/ITrack'
import { useMusic } from '~/hooks/useMusic'

type Props = {
  nextMusic: ITrack
}

export default function DescNext({ nextMusic }: Props) {
  const theme = useTheme()
  const textColor = theme.palette.secondary4.main
  const borderColor = theme.palette.neutral.neutral3
  const hoverBackgroundColor = theme.palette.neutral.neutral3
  const [hoveredRow, setHoveredRow] = useState<string | null>(null)
  const { addAlbum, album, currentTrackIndex } = useMusic()
  return (
    <Box
      sx={{
        width: '100%',
        bgcolor: 'transparent',
        cursor: 'pointer',
        padding: '12px',
        color: (theme) => theme.palette.secondary4.main
      }}
    >
      <Box sx={{ bgcolor: (theme) => theme.palette.neutral.neutral3, borderRadius: '10px' }}>
        <Typography variant='body1' sx={{ padding: '10px' }}>
          Tiếp theo trong danh sách
        </Typography>
        <TableContainer component={Paper} sx={{ minWidth: 150, maxWidth: '100%', overflow: 'auto', bgcolor: 'transparent' }}>
          <Table aria-label='album table' sx={{ tableLayout: 'fixed' }}>
            <TableBody>
              <TableRow
                key={nextMusic._id}
                onMouseEnter={() => setHoveredRow(nextMusic._id)}
                onMouseLeave={() => setHoveredRow(null)}
                sx={{
                  '&:hover': {
                    backgroundColor: hoverBackgroundColor
                  },
                  'cursor': 'pointer'
                }}
                onClick={() => {
                  addAlbum(album?._id, currentTrackIndex + 1)
                }}
              >
                <TableCell
                  component='th'
                  scope='nextMusic'
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
                      //   onClick={() => handlePlay(index, nextMusic._id)}
                    >
                      <img
                        alt={nextMusic.name}
                        src={nextMusic.image?.replace('{w}x{h}bb', '48x48bb')}
                        onError={(e) => {
                          e.currentTarget.src = 'https://res.cloudinary.com/dswj1rtvu/image/upload/v1727670619/no-image_vueuvs.avif'
                        }}
                        style={{
                          width: '48px',
                          height: '48px',
                          objectFit: 'cover',
                          borderRadius: '10px',
                          opacity: hoveredRow === nextMusic._id ? 0.5 : 1,
                          transition: 'opacity 0.3s ease'
                        }}
                      />
                      {hoveredRow === nextMusic._id && (
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
                        {nextMusic.name}
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
                        {nextMusic.owners?.map((artist, index) => (
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
                            {index < (nextMusic.owners?.length ?? 0) - 1 && ','}
                          </Fragment>
                        ))}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell align='right' sx={{ color: textColor, borderColor: borderColor }}>
                  <Box
                    className='icon-actions'
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      gap: 1,
                      alignItems: 'center'
                    }}
                  >
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
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  )
}
