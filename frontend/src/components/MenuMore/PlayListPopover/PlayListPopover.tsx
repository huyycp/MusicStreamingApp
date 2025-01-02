import { useState } from 'react'
import Box from '@mui/material/Box'
import MenuList from '@mui/material/MenuList'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import TextField from '@mui/material/TextField'
import Popover from '@mui/material/Popover'
import QueueMusicIcon from '@mui/icons-material/QueueMusic'
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic'
import PlayListModal from '~/components/PlayListModal/PlayListModal'
import useGetMyPlayList from '~/hooks/Album/useGetMyPlayList'
import { ILibrary } from '~/type/Library/ILibrary'
import useAddTrackToAlbum from '~/hooks/Album/useAddTrackToAlbum'
import { useSnackbar } from 'notistack'
import { ITrack } from '~/type/Tracks/ITrack'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'

type Props = {
  anchorEl: HTMLElement | null
  onClose: () => void
  track: ITrack
}

export default function PlaylistPopover({ anchorEl, onClose, track }: Props) {
  const [openPlayListModal, setOpenPlayListModal] = useState(false)
  const { data, isPending: playListPending } = useGetMyPlayList(10, 1)
  const { mutate } = useAddTrackToAlbum()
  const listPlayLists = data?.result.data as ILibrary[]
  const { enqueueSnackbar } = useSnackbar()

  const handleAddTrack = (playlist: ILibrary) => {
    mutate(
      { library_id: playlist._id, tracks: [track._id], type: 'add' },
      {
        onSuccess: () => {
          enqueueSnackbar('Thêm vào danh sách phát thành công!', { variant: 'success' })
          onClose()
        },
        onError: () => {
          enqueueSnackbar('Thêm vào danh sách phát thất bại', { variant: 'error' })
        }
      }
    )
  }

  return (
    <>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={onClose}
        disableRestoreFocus
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'right'
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
        <Box sx={{ padding: '10px' }}>
          <TextField
            id='outlined-search'
            placeholder='Tìm kiếm'
            type='text'
            size='small'
            value=''
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon sx={{ fontSize: '20px', color: 'white' }} />
                </InputAdornment>
              )
            }}
            sx={{
              'borderRadius': 1,
              'width': '100%',
              'bgcolor': (theme) => theme.palette.neutral.neutral2,
              'border': 'none',
              '& input': { color: 'white', height: '20px', cursor: 'pointer' },
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': { borderRadius: 1 },
                '&.Mui-focused fieldset': {
                  borderColor: 'white',
                  borderRadius: 1
                }
              }
            }}
          />
        </Box>
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
          <MenuItem onClick={() => setOpenPlayListModal(true)}>
            <ListItemIcon>
              <LibraryMusicIcon fontSize='small' sx={{ color: (theme) => theme.palette.primary.main }} />
              <Box>Thêm playlist mới</Box>
            </ListItemIcon>
          </MenuItem>
          {playListPending && <MenuItem>Loading...</MenuItem>}
          {listPlayLists?.map((playlist) => (
            <MenuItem key={playlist._id} onClick={() => handleAddTrack(playlist)}>
              <ListItemIcon>
                <QueueMusicIcon fontSize='small' />
                <Box>{playlist.name}</Box>
              </ListItemIcon>
            </MenuItem>
          ))}
        </MenuList>
      </Popover>
      <PlayListModal open={openPlayListModal} setOpen={setOpenPlayListModal} />
    </>
  )
}
