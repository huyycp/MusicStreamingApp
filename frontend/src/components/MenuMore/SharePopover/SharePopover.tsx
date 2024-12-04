import Box from '@mui/material/Box'
import MenuList from '@mui/material/MenuList'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Popover from '@mui/material/Popover'
import { ITrack } from '~/type/Tracks/ITrack'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import { useSnackbar } from 'notistack'
import { FacebookShareButton, TwitterShareButton } from 'react-share'
import { capitalizeFirstLetterOfEachWord } from '~/utils/capitalizeFirstLetterOfEachWord'

type Props = {
  anchorEl: HTMLElement | null
  onClose: () => void
  track: ITrack
}

export default function SharePopover({ anchorEl, onClose, track }: Props) {
  const { enqueueSnackbar } = useSnackbar()

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/track/${track?._id}`)
      .then(() => {
        enqueueSnackbar('Sao chép đường dẫn thành công', { variant: 'success' })
      })
      .catch(() => {
        enqueueSnackbar('Sao chép đường dẫn thất bại', { variant: 'error' })
      })
  }


  return (
    <>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={onClose}
        disableRestoreFocus
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        slotProps={{
          paper: {
            onMouseLeave: onClose,
            sx: {
              backgroundColor: (theme) => theme.palette.neutral.neutral3,
              borderRadius: 1,
              boxShadow: 3,
              color: (theme) => theme.palette.secondary4.main,
              width: '250px',
              transition: 'opacity 0.3s ease',
              zIndex: 1301
            }
          }
        }}
      >
        <MenuList
          sx={{
            'width': '100%',
            '& .MuiMenuItem-root': {
              'display': 'flex',
              'justifyContent': 'space-between',
              'alignItems': 'center',
              'width': '100%',
              '&:hover': {
                backgroundColor: (theme) => theme.palette.neutral.neutral2
              }
            },
            '& .MuiListItemIcon-root': {
              color: (theme) => theme.palette.secondary4.main,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 1,
              fontSize: '0.875rem'
            }
          }}
        >
          <MenuItem onClick={handleCopyLink}>
            <ListItemIcon>
              <ContentCopyIcon fontSize='small' sx={{ color: (theme) => theme.palette.secondary4.main }} />
              <Box>Sao chép liên kết bài hát</Box>
            </ListItemIcon>
          </MenuItem>
          <MenuItem>
            <FacebookShareButton
              url={`https://magic-music-dut.vercel.app/track/${track?._id}`}
              hashtag={`Cùng tận hưởng âm nhạc cùng Magic Music với bài hát ${capitalizeFirstLetterOfEachWord(track?.name)}`}
            >
              <ListItemIcon>
                <FacebookIcon fontSize='small' sx={{ color: (theme) => theme.palette.secondary4.main }} />
                <Box>Chia sẻ bài hát lên facebook</Box>
              </ListItemIcon>
            </FacebookShareButton>
          </MenuItem>
          <MenuItem>
            <TwitterShareButton
              url={`https://magic-music-dut.vercel.app/track/${track?._id}`}
              title={`Cùng thưởng thức bài hát ${capitalizeFirstLetterOfEachWord(track?.name)} trên Magic Music!`}
              hashtags={['MagicMusic', 'EnjoyMusic']}
            >
              <ListItemIcon>
                <TwitterIcon fontSize='small' sx={{ color: (theme) => theme.palette.secondary4.main }} />
                <Box>Chia sẻ bài hát lên Twitter</Box>
              </ListItemIcon>
            </TwitterShareButton>
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  )
}
