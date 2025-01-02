import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import CloseIcon from '@mui/icons-material/Close'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Tooltip from '@mui/material/Tooltip'
import SearchIcon from '@mui/icons-material/Search'
import CircularProgress from '@mui/material/CircularProgress'
import { useCallback, useEffect, useState } from 'react'
import ListTracks from './ListTracks/ListTracks'
import { ITrack } from '~/type/Tracks/ITrack'
import { QueryObserverResult } from '@tanstack/react-query'
import { IResponse } from '~/type/IResponse'
import { useSearchWithParam } from '~/hooks/Search/useSearchWithParam'
import useGetTracks from '~/hooks/Tracks/useGetTracks'

type Props = {
  handleClose: () => void
  listTrackIds: string[]
  playlistId: string
  refetchAlbum: () => Promise<QueryObserverResult<IResponse, Error>>
}

export default function TrackForPlayList({ handleClose, listTrackIds, playlistId, refetchAlbum }: Props) {
  const [searchValue, setSearchValue] = useState<string>('')
  const { data: searchData, isPending: isSearching } = useSearchWithParam(searchValue, 'tracks')
  const { data: tracksData, isPending: isLoadingTracks } = useGetTracks()
  const [listTracks, setListTracks] = useState<ITrack[]>([])

  const handleSearchChange = useCallback((e: { target: { value: string } }) => {
    if (e.target.value.trim().length <= 50) {
      setSearchValue(e.target.value)
    }
  }, [])

  useEffect(() => {
    if (searchValue.trim() === '') {
      setListTracks(tracksData?.result.data || [])
    } else {
      setListTracks(searchData?.result.tracks || [])
    }
  }, [searchValue, searchData?.result.tracks, tracksData?.result.data])

  const isLoading = (isSearching && searchValue !== '') || isLoadingTracks

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
        placeholder='Tìm kiếm bài hát'
        type='text'
        size='small'
        value={searchValue}
        autoComplete='off'
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
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <CircularProgress />
        </Box>
      ) : (
        <ListTracks listTracks={listTracks} listTrackIds={listTrackIds} playlistId={playlistId} refetchAlbum={refetchAlbum} />
      )}
    </Box>
  )
}
