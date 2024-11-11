import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import CloseIcon from '@mui/icons-material/Close'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Tooltip from '@mui/material/Tooltip'
import SearchIcon from '@mui/icons-material/Search'
import { SetStateAction, useCallback, useState } from 'react'
import ListTracks from './ListTracks/ListTracks'
import useGetTracks from '~/hooks/Tracks/useGetTracks'
import { ITrack } from '~/type/Tracks/ITrack'
import { QueryObserverResult } from '@tanstack/react-query'
import { IResponse } from '~/type/IResponse'

type Props = {
  handleClose: () => void
  listTrackIds: string[]
  playlistId: string
  refetchAlbum: () => Promise<QueryObserverResult<IResponse, Error>>
}

export default function TrackForPlayList({ handleClose, listTrackIds, playlistId, refetchAlbum }: Props) {
  const [searchValue, setSearchValue] = useState<null | string>('')
  const { data, isPending } = useGetTracks()
  const listTracks = data?.result.data as ITrack[]

  const handleSearchChange = useCallback((e: { target: { value: SetStateAction<string | null> } }) => {
    setSearchValue(e.target.value)
  }, [])

  return (
    <Box sx={{ width: '100%', position: 'relative' }}>
      <IconButton
        onClick={handleClose}
        sx={{
          position: 'absolute',
          top: 8,
          right: 8
        }}
      >
        <CloseIcon sx={{ color: 'white' }} fontSize='large' />
      </IconButton>
      <TextField
        id='outlined-search'
        placeholder='Tìm kiếm bài hát và podcast'
        type='text'
        size='small'
        value={searchValue}
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Tooltip title='Tìm kiếm'>
                <SearchIcon
                  sx={{
                    'fontSize': 20,
                    'cursor': 'pointer',
                    'color': (theme) => theme.palette.neutral.neutral1,
                    '&:hover': {
                      color: (theme) => theme.palette.secondary4.main
                    }
                  }}
                />
              </Tooltip>
            </InputAdornment>
          )
        }}
        sx={{
          'borderRadius': 1,
          'minWidth': '300px',
          'maxWidth': '350px',
          'width': '70%',
          'bgcolor': (theme) => theme.palette.secondary5.main,
          'border': 'none',
          '& input': { color: 'white', height: '25px', cursor: 'pointer' },
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': { borderRadius: 1 },
            '&.Mui-focused fieldset': {
              borderColor: 'white',
              borderRadius: 1
            }
          }
        }}
      />
      {!isPending && <ListTracks listTracks={listTracks} listTrackIds={listTrackIds} playlistId={playlistId} refetchAlbum={refetchAlbum} />}
    </Box>
  )
}
