import React, { useState } from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import HeadphonesIcon from '@mui/icons-material/Headphones'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { ITrack } from '~/type/Tracks/ITrack'
import Box from '@mui/material/Box'
import MenuList from '@mui/material/MenuList'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Popover from '@mui/material/Popover'
import TextField from '@mui/material/TextField'
import QueueMusicIcon from '@mui/icons-material/QueueMusic'
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic'
import PlayListModal from '../PlayListModal/PlayListModal'
import useGetMyPlayList from '~/hooks/Album/useGetMyPlayList'
import { ILibrary } from '~/type/Library/ILibrary'
import useAddTrackToAlbum from '~/hooks/Album/useAddTrackToAlbum'
import { useSnackbar } from 'notistack'

type Props = {
  track: ITrack
  open: boolean
  anchorEl: HTMLElement
  onClose: () => void
}

export default function MenuTrack({ track, open, anchorEl, onClose }: Props) {
  const [popoverAnchorEl, setPopoverAnchorEl] = useState<HTMLElement | null>(null)
  const [openPlayListModal, setOpenPlayListModal] = useState(false)
  const { data, isPending: playListPending } = useGetMyPlayList(10, 1)
  const { mutate } = useAddTrackToAlbum()
  const listPlayLists = data?.result.data as ILibrary[]
  const { enqueueSnackbar } = useSnackbar()

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setPopoverAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setPopoverAnchorEl(null)
  }

  const handleAddTrack = (playlist: ILibrary) => {
    mutate(
      { library_id: playlist._id, tracks: [track._id] },
      {
        onSuccess: () => {
          enqueueSnackbar('Add track to playlist successfully!', { variant: 'success' })
          onClose()
        },
        onError: () => {
          enqueueSnackbar('Failed to add track to playlist!', { variant: 'error' })
        }
      }
    )
  }

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
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
          sx: {
            backgroundColor: (theme) => theme.palette.neutral.neutral3,
            borderRadius: 1,
            boxShadow: 3,
            color: (theme) => theme.palette.secondary4.main,
            width: '250px'
          }
        }
      }}
    >
      <Box sx={{ bgcolor: (theme) => theme.palette.neutral.neutral3, width: '100%' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, padding: '15px' }}>
          <img
            alt={track?.name}
            src={track?.image || 'https://res.cloudinary.com/dswj1rtvu/image/upload/v1727670619/no-image_vueuvs.avif'}
            style={{
              inlineSize: '40px',
              blockSize: '40px',
              objectFit: 'cover',
              borderRadius: 2
            }}
          />
          <Box>
            <Box sx={{ fontSize: '12px', fontWeight: 'bold' }}>{track.name}</Box>
            <Box display='flex' gap={1}>
              <Box display='flex' alignItems='center'>
                <FavoriteBorderIcon sx={{ fontSize: '16px' }} />
                <Box sx={{ fontSize: '11px' }}>18k</Box>
              </Box>
              <Box display='flex' alignItems='center'>
                <HeadphonesIcon sx={{ fontSize: '16px' }} />
                <Box sx={{ fontSize: '11px' }}>180</Box>
              </Box>
            </Box>
          </Box>
        </Box>
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
            gap: 1
          }
        }}
      >
        <MenuItem onMouseEnter={handlePopoverOpen}>
          <ListItemIcon>
            <AddCircleOutlineIcon fontSize='small' />
            <Box>Thêm vào playlist</Box>
          </ListItemIcon>
          <ListItemIcon sx={{ paddingLeft: '15px' }}>
            <ArrowForwardIosIcon fontSize='small' />
          </ListItemIcon>
        </MenuItem>
        <MenuItem>
          <ListItemText>Copy</ListItemText>
        </MenuItem>
      </MenuList>

      <Popover
        open={Boolean(popoverAnchorEl)}
        anchorEl={popoverAnchorEl}
        onClose={handlePopoverClose}
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
            sx: {
              backgroundColor: (theme) => theme.palette.neutral.neutral3,
              borderRadius: 2,
              boxShadow: 3,
              color: (theme) => theme.palette.secondary4.main,
              width: '200px',
              transition: 'opacity 0.3s ease'
            }
          }
        }}
      >
        <Box
          sx={{
            padding: '10px'
          }}
        >
          <TextField
            id='outlined-search'
            placeholder='Tìm kiếm'
            type='text'
            size='small'
            value=''
            sx={{
              'borderRadius': 20,
              'width': '100%',
              'bgcolor': (theme) => theme.palette.neutral.neutral2,
              'border': 'none',
              '& input': { color: 'white', height: '20px', cursor: 'pointer' },
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': { borderRadius: 20 },
                '&.Mui-focused fieldset': {
                  borderColor: 'white',
                  borderRadius: 20
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
              gap: 1
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
    </Popover>
  )
}
