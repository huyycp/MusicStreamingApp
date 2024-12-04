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
import { useRef, useState } from 'react'
import Button from '@mui/material/Button'
import Popover from '@mui/material/Popover'
import { useNavigate } from 'react-router-dom'

export default function LibraryHeaderNoUser() {
  const { widths, maxWidths, defaultWidths, setWidth, minWidths } = useResize()
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const navigate = useNavigate()
  const buttonRef = useRef<HTMLButtonElement | null>(null)

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

  const handlePopover = () => {
    if (buttonRef.current) {
      setAnchorEl(buttonRef.current)
    }
  }

  const handleLogin = () => {
    navigate('/login')
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
        padding: '0px 0px 0px 12px'
      }}
    >
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
              <Tooltip title='Tạo danh sách phát' placement='top' onClick={handlePopover}>
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
      </Box>
      <Box
        sx={{
          width: widths[0],
          display: 'flex-1',
          alignItems: 'center',
          p: 1,
          gap: 1,
          overflowY: 'hidden',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            width: '95%',
            borderRadius: '5px',
            p: '16px 20px',
            gap: 1,
            bgcolor: (theme) => theme.palette.neutral.neutral3
          }}
        >
          <Typography variant='body2' fontWeight='bold' sx={{ color: (theme) => theme.palette.secondary4.main, pb: 2 }}>
            Đăng nhập để tối ưu hóa trải nghiệm
          </Typography>
          <Button variant='contained' color='secondary' onClick={handleLogin} ref={buttonRef}>
            Đăng nhập
          </Button>
        </Box>
      </Box>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left'
        }}
        sx={{
          '& .MuiPaper-root': {
            backgroundColor: '#2196f3',
            color: '#fff',
            marginLeft: '16px',
            padding: '16px',
            borderRadius: '8px',
            width: '300px'
          }
        }}
      >
        <Box sx={{ fontSize: '18px', fontWeight: 'bold' }}>Đăng nhập</Box>
        <Box sx={{ marginTop: '4px' }}>Đăng nhập để tối ưu hóa trải nghiệm</Box>
        <Box
          sx={{
            marginTop: '16px',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '8px'
          }}
        >
          <Button
            sx={{
              backgroundColor: 'transparent',
              color: '#fff',
              border: 'none',
              padding: '8px',
              cursor: 'pointer'
            }}
            onClick={() => setAnchorEl(null)}
          >
            Để sau
          </Button>
          <Button
            sx={{
              backgroundColor: '#fff',
              color: '#000',
              padding: '8px 16px',
              borderRadius: '20px',
              border: 'none',
              cursor: 'pointer'
            }}
            onClick={handleLogin}
          >
            Đăng nhập
          </Button>
        </Box>
      </Popover>
    </Box>
  )
}
