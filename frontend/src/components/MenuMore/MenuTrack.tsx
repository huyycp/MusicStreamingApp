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
import LinkIcon from '@mui/icons-material/Link'
import Popover from '@mui/material/Popover'
import { useSnackbar } from 'notistack'
import PlaylistPopover from './PlayListPopover/PlayListPopover'
import ArtistIcon from '~/assets/icon/ArtistIcon.svg?react'
import SvgIcon from '@mui/material/SvgIcon'
import ArtistPopover from './ArtistPopover/ArtistPopover'

type Props = {
  track: ITrack
  open: boolean
  anchorEl: HTMLElement
  onClose: () => void
}

export default function MenuTrack({ track, open, anchorEl, onClose }: Props) {
  const [playlistPopoverAnchorEl, setPlaylistPopoverAnchorEl] = useState<HTMLElement | null>(null)
  const [artistPopoverAnchorEl, setArtistPopoverAnchorEl] = useState<HTMLElement | null>(null)
  const { enqueueSnackbar } = useSnackbar()

  const handlePlaylistPopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setPlaylistPopoverAnchorEl(event.currentTarget)
  }

  const handleArtistPopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setArtistPopoverAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setPlaylistPopoverAnchorEl(null)
    setArtistPopoverAnchorEl(null)
  }

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
    <Box sx={{ position: 'relative' }}>
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
              width: '250px',
              pointerEvents: 'auto'
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
                borderRadius: 1
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
              fontSize: '0.875rem'
            }
          }}
        >
          <MenuItem
            onMouseEnter={handlePlaylistPopoverOpen}
            onMouseLeave={() => {
              const popoverElement = document.querySelector('[role="presentation"].MuiPopover-root:last-child')
              if (popoverElement && !popoverElement.matches(':hover')) {
                handlePopoverClose()
              }
            }}
          >
            <ListItemIcon sx={{ gap: 1 }}>
              <AddCircleOutlineIcon fontSize='small' />
              <Box>Thêm vào playlist</Box>
            </ListItemIcon>
            <ListItemIcon sx={{ paddingLeft: '15px' }}>
              <ArrowForwardIosIcon fontSize='small' />
            </ListItemIcon>
          </MenuItem>
          <MenuItem onClick={handleCopyLink}>
            <ListItemIcon sx={{ gap: 1 }}>
              <LinkIcon fontSize='small' />
              <Box>Sao chép liên kết</Box>
            </ListItemIcon>
          </MenuItem>
          <MenuItem
            onMouseEnter={handleArtistPopoverOpen}
            onMouseLeave={() => {
              const popoverElement = document.querySelector('[role="presentation"].MuiPopover-root:last-child')
              if (popoverElement && !popoverElement.matches(':hover')) {
                handlePopoverClose()
              }
            }}
          >
            <ListItemIcon>
              <SvgIcon component={ArtistIcon} sx={{ height: '20px', cursor: 'pointer', mr: '4px' }} />
              <Box>Chuyển tới nghệ sĩ</Box>
            </ListItemIcon>
            <ListItemIcon sx={{ paddingLeft: '15px' }}>
              <ArrowForwardIosIcon fontSize='small' />
            </ListItemIcon>
          </MenuItem>
        </MenuList>

        <PlaylistPopover anchorEl={playlistPopoverAnchorEl} onClose={handlePopoverClose} track={track} />
        <ArtistPopover anchorEl={artistPopoverAnchorEl} onClose={handlePopoverClose} track={track} />
      </Popover>
    </Box>
  )
}
