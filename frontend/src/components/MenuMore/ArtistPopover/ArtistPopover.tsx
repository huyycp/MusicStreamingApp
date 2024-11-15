import Box from '@mui/material/Box'
import MenuList from '@mui/material/MenuList'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Popover from '@mui/material/Popover'
import { ITrack } from '~/type/Tracks/ITrack'
import { useNavigate } from 'react-router-dom'

type Props = {
  anchorEl: HTMLElement | null
  onClose: () => void
  track: ITrack
}

export default function ArtistPopover({ anchorEl, onClose, track }: Props) {
  const navigate = useNavigate()
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
          {track.owners?.map((artist) => (
            <MenuItem key={artist._id} onClick={() => navigate(`/artist/${artist._id}`)}>
              <ListItemIcon>
                <Box
                  sx={{
                    '&:hover': {
                      textDecoration: 'underline'
                    }
                  }}
                >
                  {artist.name}
                </Box>
              </ListItemIcon>
            </MenuItem>
          ))}
        </MenuList>
      </Popover>
    </>
  )
}
