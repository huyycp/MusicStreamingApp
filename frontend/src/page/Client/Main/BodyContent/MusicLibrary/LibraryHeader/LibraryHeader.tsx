import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import SvgIcon from '@mui/material/SvgIcon'
import Tooltip from '@mui/material/Tooltip'
import LibraryIcon from '~/assets/icon/LibraryIcon.svg?react'
import OpenLibraryIcon from '~/assets/icon/OpenLibraryIcon.svg?react'
import AddIcon from '@mui/icons-material/Add'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useResize } from '~/hooks/useResize'
import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import SearchIcon from '@mui/icons-material/Search'
import { ILibrary } from '~/type/Library/ILibrary'
import PlayListModal from '~/components/PlayListModal/PlayListModal'
import TextField from '@mui/material/TextField'
import { InputAdornment } from '@mui/material'

type Props = {
  listAlbums: ILibrary[] | []
  // eslint-disable-next-line no-unused-vars
  setPlaylistSelect: (selectedAlbums: ILibrary[]) => void
  setAlbum: React.Dispatch<React.SetStateAction<number>>
  originalPlaylist: ILibrary[] | []
  album: number
  searchData: string
  setSearchData: React.Dispatch<React.SetStateAction<string>>
}

export default function LibraryHeader({ listAlbums, setPlaylistSelect, setAlbum, album, originalPlaylist, searchData, setSearchData }: Props) {
  const { widths, maxWidths, defaultWidths, setWidth, minWidths } = useResize()
  const [openPlayList, setOpenPlayList] = useState(false)
  const [openPlayListModal, setOpenPlayListModal] = useState(false)
  const [search, setSearch] = useState<boolean>(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchData(e.target.value)
  }

  const handleClick = () => {
    if (widths[0] === maxWidths[0]) {
      setWidth(0, defaultWidths[0])
    } else setWidth(0, maxWidths[0])
  }
  const handleMini = () => {
    if (widths[0] === minWidths[0]) {
      setWidth(0, defaultWidths[0] + 10)
    } else setWidth(0, minWidths[0])
  }
  const handleOpenList = () => {
    if (openPlayList === true) {
      setPlaylistSelect(originalPlaylist)
      // setChosePlaylist('')
      setAlbum(0)
    } else {
      const selectedAlbums = listAlbums.filter((album) => album.type === 'playlist')
      setPlaylistSelect(selectedAlbums)
    }
    setOpenPlayList(!openPlayList)
  }

  const handleOpenAlbum = () => {
    if (album === 1) {
      setPlaylistSelect(originalPlaylist)
      setAlbum(0)
    } else {
      const selectedAlbums = listAlbums.filter((album) => album.type === 'album')
      setPlaylistSelect(selectedAlbums)
      setAlbum(1)
    }
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: 'auto',
        maxHeight: 'auto',
        display: 'flex-1',
        justifyContent: 'space-between'
      }}
    >
      <Box
        sx={{
          'display': 'flex',
          'justifyContent': 'space-between',
          'alignItems': 'center',
          'padding': '12px 16px 8px 16px',
          'height': '60px',
          '& .MuiIconButton-root': {
            'fontSize': 32,
            'color': (theme) => theme.palette.neutral.neutral1,
            '&:hover': {
              color: (theme) => theme.palette.secondary4.main
            }
          }
        }}
      >
        <Tooltip title='Thu gọn thư viện' placement='top'>
          {widths[0] !== minWidths[0] ? (
            <IconButton sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', gap: 1, padding: '4px 8px' }} onClick={handleMini}>
              <SvgIcon component={LibraryIcon} inheritViewBox sx={{ height: '24px', width: '24px', cursor: 'pointer' }} />
              <Typography variant='body1'>Thư viện</Typography>
            </IconButton>
          ) : (
            <IconButton sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', gap: 1, padding: '4px 8px' }} onClick={handleMini}>
              <SvgIcon component={OpenLibraryIcon} inheritViewBox sx={{ height: '24px', width: '24px', cursor: 'pointer' }} />
            </IconButton>
          )}
        </Tooltip>
        {widths[0] !== minWidths[0] && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title='Tạo danh sách phát' placement='top' onClick={() => setOpenPlayListModal(true)}>
              <IconButton
                sx={{
                  'padding': '8px',
                  'borderRadius': '50%',
                  '&:hover': {
                    bgcolor: (theme) => theme.palette.neutral.neutral2
                  }
                }}
              >
                <AddIcon />
              </IconButton>
            </Tooltip>
            <PlayListModal open={openPlayListModal} setOpen={setOpenPlayListModal} />
            <Tooltip title={widths[0] !== maxWidths[0] ? 'Xem thêm' : 'Ẩn bớt'} placement='top'>
              <IconButton
                sx={{
                  'padding': '8px',
                  'borderRadius': '50%',
                  '&:hover': {
                    bgcolor: (theme) => theme.palette.neutral.neutral2
                  }
                }}
                onClick={handleClick}
              >
                {widths[0] !== maxWidths[0] ? <ArrowForwardIcon /> : <ArrowBackIcon />}
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </Box>
      {widths[0] !== minWidths[0] && (
        <Box
          sx={{
            height: '32px',
            m: '8px 16px',
            display: 'flex',
            gap: 1,
            overflow: 'hidden',
            whiteSpace: 'nowrap'
          }}
        >
          <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            {album === 1 && (
              <IconButton
                sx={{
                  'position': 'absolute',
                  'left': 0,
                  'zIndex': 1,
                  'padding': '2px',
                  'borderRadius': '100%',
                  '&:hover': {
                    bgcolor: (theme) => theme.palette.neutral.neutral2
                  },
                  'bgcolor': (theme) => theme.palette.neutral.neutral3,
                  'color': (theme) => theme.palette.secondary4.main
                }}
                onClick={handleOpenAlbum}
              >
                <CloseIcon />
              </IconButton>
            )}
          </Box>
          {!openPlayList && album === 0 && (
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
              <Chip
                label='Danh sách phát'
                onClick={handleOpenList}
                sx={{
                  'bgcolor': (theme) => theme.palette.neutral.neutral3,
                  'color': (theme) => theme.palette.secondary4.main,
                  '&:hover': {
                    bgcolor: (theme) => theme.palette.neutral.neutral2
                  }
                }}
              />
              <Chip
                label='Album'
                onClick={handleOpenAlbum}
                sx={{
                  'bgcolor': (theme) => theme.palette.neutral.neutral3,
                  'color': (theme) => theme.palette.secondary4.main,
                  '&:hover': {
                    bgcolor: (theme) => theme.palette.neutral.neutral2
                  }
                }}
              />
            </Box>
          )}
          <Box
            sx={{
              width: '20px',
              bgcolor: 'transparent'
            }}
          ></Box>
          <Box
            sx={{
              overflow: 'hidden',
              display: 'flex',
              justifyContent: 'start',
              alignItems: 'center',
              whiteSpace: 'nowrap',
              flexGrow: 1
            }}
          >
            {openPlayList && (
              <IconButton
                sx={{
                  'position': 'absolute',
                  'left': 15,
                  'zIndex': 1,
                  'padding': '2px',
                  'borderRadius': '100%',
                  '&:hover': {
                    bgcolor: (theme) => theme.palette.neutral.neutral2
                  },
                  'bgcolor': (theme) => theme.palette.neutral.neutral3,
                  'color': (theme) => theme.palette.secondary4.main
                }}
                onClick={handleOpenList}
              >
                <CloseIcon />
              </IconButton>
            )}
            {openPlayList && (
              <Box
                sx={{
                  'display': 'flex',
                  'transition': 'transform 0.3s ease',
                  'flexGrow': 1,
                  'whiteSpace': 'nowrap',
                  'overflow': 'hidden',
                  'flexShrink': 0,
                  '& .MuiChip-root': {
                    margin: '0 4px',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                    cursor: 'pointer'
                  }
                }}
              >
                <Chip
                  label='Danh sách phát'
                  sx={{
                    'bgcolor': (theme) => theme.palette.neutral.neutral1,
                    'color': (theme) => theme.palette.secondary1.main,
                    '&:hover': {
                      bgcolor: (theme) => theme.palette.neutral.neutral2
                    }
                  }}
                  onClick={handleOpenList}
                />
              </Box>
            )}
            {album === 1 && (
              <Box
                sx={{
                  'display': 'flex',
                  'transition': 'transform 0.3s ease',
                  'flexGrow': 1,
                  'whiteSpace': 'nowrap',
                  'overflow': 'hidden',
                  'flexShrink': 0,
                  '& .MuiChip-root': {
                    margin: '0 4px',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                    cursor: 'pointer'
                  }
                }}
              >
                <Chip
                  label='Album'
                  sx={{
                    'bgcolor': (theme) => theme.palette.neutral.neutral1,
                    'color': (theme) => theme.palette.secondary1.main,
                    '&:hover': {
                      bgcolor: (theme) => theme.palette.neutral.neutral2
                    }
                  }}
                  onClick={handleOpenAlbum}
                />
              </Box>
            )}
          </Box>
        </Box>
      )}
      {widths[0] !== minWidths[0] && (
        <Box sx={{ m: '2px 16px 0px 16px', height: '45px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ fontSize: 12, fontWeight: 450, color: (theme) => theme.palette.neutral.neutral1, pt: '12px', pb: '12px' }}>Tiêu đề</Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
              {!search && (
                <Tooltip title='Tìm kiếm trong Danh sách phát'>
                  <IconButton
                    sx={{
                      'borderRadius': '100%',
                      'padding': '2px',
                      '&:hover': {
                        bgcolor: (theme) => theme.palette.neutral.neutral2
                      },
                      'bgcolor': 'transparent',
                      'color': (theme) => theme.palette.secondary4.main
                    }}
                    onClick={() => setSearch(true)}
                  >
                    <SearchIcon />
                  </IconButton>
                </Tooltip>
              )}
              {search && (
                <TextField
                  id='outlined-search'
                  placeholder='Tìm kiếm'
                  type='text'
                  size='small'
                  autoComplete='off'
                  value={searchData}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <Tooltip title='Tìm kiếm'>
                          <SearchIcon
                            sx={{
                              'cursor': 'pointer',
                              'color': (theme) => theme.palette.neutral.neutral1,
                              '&:hover': {
                                color: (theme) => theme.palette.secondary4.main
                              }
                            }}
                          />
                        </Tooltip>
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position='end'>
                        <Tooltip title='Hủy'>
                          <IconButton
                            sx={{
                              'borderRadius': '100%',
                              '&:hover': {
                                bgcolor: (theme) => theme.palette.neutral.neutral2
                              },
                              'bgcolor': 'transparent',
                              'color': (theme) => theme.palette.secondary4.main
                            }}
                            onClick={() => setSearch(false)}
                          >
                            <CloseIcon sx={{}} />
                          </IconButton>
                        </Tooltip>
                      </InputAdornment>
                    )
                  }}
                  sx={{
                    'p': 'unset',
                    'minWidth': '200px',
                    'maxWidth': '250px',
                    'width': '50%',
                    'bgcolor': (theme) => theme.palette.secondary5.main,
                    'border': 'none',
                    '& input': { color: 'white', height: '25px', cursor: 'pointer' },
                    '& .MuiOutlinedInput-root': {
                      '&.Mui-focused fieldset': {
                        borderColor: 'white'
                      }
                    }
                  }}
                />
              )}
            </Box>
          </Box>
          <Divider variant='fullWidth' sx={{ bgcolor: (theme) => theme.palette.neutral.neutral1 }} />
        </Box>
      )}
    </Box>
  )
}
