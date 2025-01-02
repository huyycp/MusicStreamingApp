import { IconButton, Tooltip } from '@mui/material'
import Box from '@mui/material/Box'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { useMusic } from '~/hooks/useMusic'
import CloseIcon from '@mui/icons-material/Close'
import { useResize } from '~/hooks/useResize'
import { useNavigate } from 'react-router-dom'

export default function DescTitle() {
  const { music, album } = useMusic()
  const { setOpenList, setIsBox2Visible } = useResize()
  const navigate = useNavigate()

  return (
    <Box sx={{ width: '100%', height: '64px', bgcolor: (theme) => theme.palette.secondary2.main, display: 'flex', flexDirection: 'row' }}>
      <Box
        sx={{
          'fontSize': '18px',
          'color': (theme) => theme.palette.secondary4.main,
          'width': '100%',
          'padding': '20px 5px 20px 20px',
          '&:hover': {
            cursor: 'pointer',
            textDecoration: 'underline'
          }
        }}
        onClick={() => {
          if (music?.album) navigate(`/library/${music?.album?._id}`)
          else if (!music?.album && album?._id) navigate(`/library/${album._id}`)
          else navigate(`/track/${music?._id}`)
        }}
      >
        {music?.album?.name || album?.name || music?.name}
      </Box>

      <Tooltip title='Khác' placement='top'>
        <IconButton>
          <MoreHorizIcon
            sx={{
              'color': (theme) => theme.palette.neutral.neutral1,
              'fontSize': 24,
              '&:hover': {
                color: (theme) => theme.palette.secondary4.main
              }
            }}
          />
        </IconButton>
      </Tooltip>

      <Tooltip title='Đóng' placement='top'>
        <IconButton
          onClick={() => {
            setOpenList(false)
            setIsBox2Visible(true)
          }}
        >
          <CloseIcon
            sx={{
              'color': (theme) => theme.palette.neutral.neutral1,
              'fontSize': 24,
              '&:hover': {
                color: (theme) => theme.palette.secondary4.main
              }
            }}
          />
        </IconButton>
      </Tooltip>
    </Box>
  )
}
