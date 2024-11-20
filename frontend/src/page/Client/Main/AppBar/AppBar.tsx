import { SetStateAction, useCallback, useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import HomeIcon from '@mui/icons-material/Home'
import MusicIcon from '~/assets/icon/MusicIcon2.svg?react'
import SvgIcon from '@mui/material/SvgIcon'
import TextField from '@mui/material/TextField'
import { useLocation, useNavigate } from 'react-router-dom'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import Tooltip from '@mui/material/Tooltip'
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded'
import Divider from '@mui/material/Divider'
import Profile from './Profile/Profile'
import AudioRecognition from '~/components/Microphone/AudioRecognition'
import AudioRecorder from '~/components/Microphone/AudioRecorder'

export default function AppBar() {
  const [searchValue, setSearchValue] = useState<null | string>('')
  const [isSearch, setIsSearch] = useState<boolean>(false)
  const navigate = useNavigate()
  const location = useLocation()
  const textFieldRef = useRef<HTMLInputElement>(null)

  const handleTranscriptChange = (newTranscript: string) => {
    setSearchValue(newTranscript)
  }

  useEffect(() => {
    if (isSearch && textFieldRef.current) {
      textFieldRef.current.focus()
    }
  }, [isSearch])

  useEffect(() => {
    setIsSearch(location.pathname === '/search')
  }, [location.pathname])

  const handleSearchChange = useCallback((e: { target: { value: SetStateAction<string | null> } }) => {
    setSearchValue(e.target.value)
  }, [])

  const handleSearchClick = useCallback(() => {
    navigate('/search')
  }, [navigate])

  const handleClearSearch = useCallback(() => {
    setSearchValue('')
  }, [])

  return (
    <Box
      sx={{
        width: '100%',
        height: (theme) => theme.music.appBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        pb: 1
      }}
    >
      <Tooltip title='Magic Music'>
        <Box
          sx={{
            width: '72px',
            height: '72px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pr: 2,
            pl: 2
          }}
        >
          <SvgIcon component={MusicIcon} inheritViewBox sx={{ height: '32px', width: '32px', cursor: 'pointer' }} onClick={() => navigate('/')} />
        </Box>
      </Tooltip>
      <Box
        sx={{
          color: (theme) => theme.palette.secondary4.main,
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}
      >
        <Tooltip title='Trang chủ'>
          <HomeIcon
            sx={{
              height: '48px',
              width: '48px',
              cursor: 'pointer',
              borderRadius: '50%',
              p: 1,
              bgcolor: (theme) => theme.palette.secondary5.main
            }}
            onClick={() => navigate('/')}
          />
        </Tooltip>
        <TextField
          id='outlined-search'
          placeholder='Bạn muốn phát nội dung gì?'
          type='text'
          size='small'
          value={searchValue}
          onChange={handleSearchChange}
          inputRef={textFieldRef}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Tooltip title='Tìm kiếm'>
                  <SearchIcon
                    sx={{
                      'fontSize': 30,
                      'cursor': 'pointer',
                      'color': (theme) => theme.palette.neutral.neutral1,
                      '&:hover': {
                        color: (theme) => theme.palette.secondary4.main
                      }
                    }}
                    onClick={handleSearchClick}
                  />
                </Tooltip>
              </InputAdornment>
            ),
            endAdornment: (
              <Tooltip title='Duyệt tìm'>
                <InputAdornment position='end'>
                  {searchValue && (
                    <CloseIcon
                      sx={{
                        'fontSize': 30,
                        'color': (theme) => theme.palette.neutral.neutral1,
                        '&:hover': {
                          color: (theme) => theme.palette.secondary4.main
                        },
                        'cursor': 'pointer'
                      }}
                      onClick={handleClearSearch}
                    />
                  )}
                  {!searchValue && isSearch && (
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <AudioRecognition mode='transcribe' onTranscriptChange={handleTranscriptChange} />
                      <Divider
                        orientation='vertical'
                        flexItem
                        sx={{
                          bgcolor: (theme) => theme.palette.secondary4.main
                        }}
                      />
                      <AudioRecorder />
                    </Box>
                  )}
                  {!searchValue && !isSearch && (
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <AudioRecognition mode='transcribe' onTranscriptChange={handleTranscriptChange} />
                      <Divider
                        orientation='vertical'
                        flexItem
                        sx={{
                          bgcolor: (theme) => theme.palette.secondary4.main
                        }}
                      />
                      <AudioRecorder />
                    </Box>
                  )}
                </InputAdornment>
              </Tooltip>
            )
          }}
          sx={{
            'borderRadius': 20,
            'minWidth': '380px',
            'maxWidth': '520px',
            'width': '520px',
            'bgcolor': (theme) => theme.palette.secondary5.main,
            'border': 'none',
            '& input': { color: 'white', height: '30px', cursor: 'pointer' },
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
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Tooltip title='Thông tin mới'>
          <NotificationsNoneRoundedIcon
            sx={{
              'fontSize': 30,
              'cursor': 'pointer',
              'color': (theme) => theme.palette.neutral.neutral1,
              '&:hover': {
                color: (theme) => theme.palette.secondary4.main
              }
            }}
          />
        </Tooltip>
        <Profile />
      </Box>
    </Box>
  )
}
