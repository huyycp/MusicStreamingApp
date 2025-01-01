import { ListItemIcon } from '@mui/material'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import Popover from '@mui/material/Popover'
import { ILibrary } from '~/type/Library/ILibrary'
import DeleteIcon from '@mui/icons-material/Delete'
import useDeletePlayListItem from '~/hooks/Album/useDeletePlayListItem'
import { useNavigate } from 'react-router-dom'

type Props = {
  playlist: ILibrary
  open: boolean
  anchorEl: HTMLElement
  onClose: () => void
}

export default function MenuPlayList({ playlist, open, anchorEl, onClose }: Props) {
  const { deletePlayListItem } = useDeletePlayListItem()
  const navigate = useNavigate()

  const handleDeletePlayListItem = () => {
    deletePlayListItem(playlist._id)
    onClose()
    navigate('/')
  }

  return (
    <Box sx={{ position: 'relative' }}>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left'
        }}
        slotProps={{
          paper: {
            sx: {
              backgroundColor: (theme) => theme.palette.neutral.neutral3,
              borderRadius: 1,
              boxShadow: 3,
              color: (theme) => theme.palette.secondary4.main,
              width: '250px',
              pointerEvents: 'auto'
            }
          }
        }}
      >
        <MenuList
          sx={{
            'width': '100%',
            'padding': 1,
            '& .MuiMenuItem-root': {
              'display': 'flex',
              'justifyContent': 'space-between',
              'alignItems': 'center',
              'width': '100%',
              'p': 1,
              '&:hover': {
                backgroundColor: (theme) => theme.palette.neutral.neutral2
              }
            },
            '& .MuiListItemIcon-root': {
              color: (theme) => theme.palette.secondary4.main,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '0.875rem'
            }
          }}
        >
          <MenuItem onClick={handleDeletePlayListItem}>
            <ListItemIcon sx={{ gap: 1 }}>
              <DeleteIcon fontSize='small' />
              <Box>Xóa danh sách phát này</Box>
            </ListItemIcon>
          </MenuItem>
        </MenuList>
      </Popover>
    </Box>
  )
}
