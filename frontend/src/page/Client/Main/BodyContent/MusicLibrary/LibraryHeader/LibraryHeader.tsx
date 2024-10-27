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
import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import SearchIcon from '@mui/icons-material/Search'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import { IAlbum } from '~/type/Album/IAlbum'

type Props = {
  listAlbums: IAlbum[] | []
  // eslint-disable-next-line no-unused-vars
  setPlaylistSelect: (selectedAlbums: IAlbum[]) => void
  setAlbum: React.Dispatch<React.SetStateAction<number>>
  album: number
}

export default function LibraryHeader({ listAlbums, setPlaylistSelect, setAlbum, album }: Props) {
  const { widths, maxWidths, defaultWidths, setWidth, minWidths } = useResize()
  const [openPlayList, setOpenPlayList] = useState(false)
  const [currentOffset, setCurrentOffset] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const containerRef2 = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)
  const [totalWidth, setTotalWidth] = useState(0)
  const [chosePlaylist, setChosePlaylist] = useState<string | ''>('')

  // Sample chip data
  const chipData = useMemo(() => ['Do MagicMusic tạo', 'Của bạn'], [])

  useLayoutEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [widths[0]])
  useLayoutEffect(() => {
    if (openPlayList && containerRef2.current) {
      const children = Array.from(containerRef2.current.children)
      const totalWidth = children.reduce((acc, child) => acc + (child as HTMLElement).offsetWidth, 0)
      setTotalWidth(totalWidth + 65)
    } else {
      setTotalWidth(0)
    }
  }, [openPlayList, chipData, chosePlaylist])

  const handlePrev = () => {
    setCurrentOffset((prevOffset) => Math.max(prevOffset - containerWidth / 2, 0))
  }

  const handleNext = () => {
    setCurrentOffset((prevOffset) => Math.min(prevOffset + containerWidth / 2, totalWidth - containerWidth))
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
      setPlaylistSelect([])
      setAlbum(0)
    } else {
      const selectedAlbums = listAlbums.slice(0, 2)
      setPlaylistSelect(selectedAlbums)
    }
    setOpenPlayList(!openPlayList)
  }
  const handleChosePlayList = (index: string) => {
    setChosePlaylist(index)

    const selectedAlbums = listAlbums.slice(0, 1)
    setPlaylistSelect(selectedAlbums)
  }

  const handleOpenAlbum = () => {
    if (album === 1) setAlbum(0)
    else setAlbum(1)
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
            <Tooltip title='Tạo danh sách phát hoạt thư mục' placement='top'>
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
          ref={containerRef}
        >
          <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            {openPlayList && totalWidth > containerWidth && totalWidth > widths[0] && (
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
                onClick={currentOffset > 0 ? handlePrev : handleOpenList}
              >
                {currentOffset > 0 ? <ArrowBackIcon /> : <CloseIcon />}
              </IconButton>
            )}
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
            ref={containerRef2}
          >
            {openPlayList && chosePlaylist !== '' && (
              <Box
                sx={{
                  'display': 'flex',
                  'alignItems': 'center',
                  'position': 'relative',
                  'width': 'auto',
                  '& .MuiChip-root': {
                    'boxShadow': 2,
                    'cursor': 'pointer',
                    'bgcolor': (theme) => theme.palette.neutral.neutral1,
                    'color': (theme) => theme.palette.secondary1.main,
                    '&:hover': {
                      bgcolor: (theme) => theme.palette.neutral.neutral2
                    }
                  }
                }}
              >
                <Chip
                  label='Danh sách phát'
                  sx={{
                    bgcolor: (theme) => theme.palette.primary.main,
                    color: (theme) => theme.palette.primary.contrastText,
                    position: 'relative',
                    zIndex: 99
                  }}
                  onClick={() => setChosePlaylist('')}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: 'calc(100% - 50px)',
                    transform: 'translateY(-50%)',
                    zIndex: 1
                  }}
                >
                  <Chip
                    label={chosePlaylist}
                    sx={{
                      bgcolor: (theme) => theme.palette.secondary.main,
                      color: (theme) => theme.palette.secondary.contrastText,
                      paddingLeft: '45px'
                    }}
                    onClick={() => setChosePlaylist('')}
                  />
                </Box>
              </Box>
            )}
            {openPlayList && chosePlaylist === '' && (
              <Box
                sx={{
                  'display': 'flex',
                  'transition': 'transform 0.3s ease',
                  'transform': `translateX(-${currentOffset}px)`,
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
                {chipData.map((data, index) => (
                  <Chip
                    label={data}
                    key={index}
                    sx={{
                      'bgcolor': (theme) => theme.palette.neutral.neutral3,
                      'color': (theme) => theme.palette.secondary4.main,
                      '&:hover': {
                        bgcolor: (theme) => theme.palette.neutral.neutral2
                      }
                    }}
                    onClick={() => handleChosePlayList(data)}
                  />
                ))}
              </Box>
            )}
            {album === 1 && (
              <Box
                sx={{
                  'display': 'flex',
                  'transition': 'transform 0.3s ease',
                  'transform': `translateX(-${currentOffset}px)`,
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
          <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            {openPlayList && totalWidth > containerWidth && totalWidth > widths[0] && (
              <IconButton
                sx={{
                  'position': 'absolute',
                  'right': 0,
                  'zIndex': 1,
                  'borderRadius': '100%',
                  'padding': '2px',
                  '&:hover': {
                    bgcolor: (theme) => theme.palette.neutral.neutral2
                  },
                  'bgcolor': (theme) => theme.palette.neutral.neutral3,
                  'color': (theme) => theme.palette.secondary4.main
                }}
                onClick={handleNext}
              >
                <ArrowForwardIcon />
              </IconButton>
            )}
          </Box>
        </Box>
      )}
      {widths[0] !== minWidths[0] && (
        <Box sx={{ m: '2px 16px 0px 16px', height: '32px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ fontSize: 12, fontWeight: 450, color: (theme) => theme.palette.neutral.neutral1 }}>Tiêu đề</Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
                  // onClick={handleNext}
                >
                  <SearchIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title='Thu gọn thư viện' placement='top'>
                <IconButton
                  sx={{
                    'display': 'flex',
                    'justifyContent': 'start',
                    'alignItems': 'center',
                    'gap': 1,
                    'padding': '4px 8px',
                    'color': (theme) => theme.palette.neutral.neutral1,
                    '&:hover': {
                      color: (theme) => theme.palette.secondary4.main
                    }
                  }}
                  onClick={handleMini}
                >
                  <Typography variant='body2'>Gần đây</Typography>
                  <SvgIcon component={FormatListBulletedIcon} inheritViewBox sx={{ height: '24px', width: '24px', cursor: 'pointer' }} />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
          <Divider variant='fullWidth' sx={{ bgcolor: (theme) => theme.palette.neutral.neutral1 }} />
        </Box>
      )}
    </Box>
  )
}
