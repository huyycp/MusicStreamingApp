import Box from '@mui/material/Box'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import SearchIcon from '@mui/icons-material/Search'
import { useState } from 'react'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import MusicTable from './MusicTable'
import { useResize } from '~/hooks/useResize'
import { useNavigate } from 'react-router-dom'
import AlbumTable from './AlbumTable'

export default function MyMusic() {
  const navigate = useNavigate()
  const { widths } = useResize()

  const [selectedTab, setSelectedTab] = useState<'songs' | 'albums'>('songs')

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', pt: 2, width: '100%', gap: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant='h3' noWrap>
          {selectedTab === 'songs' ? 'My Music' : 'My Album'}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'end', gap: 1 }}>
          {widths[1] > 650 && (
            <TextField
              id='outlined-search'
              placeholder='Tìm kiếm'
              type='text'
              size='small'
              value=''
              // onChange={ }
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
                'borderRadius': 20,
                'minWidth': '200px',
                'maxWidth': '250px',
                'width': '50%',
                'bgcolor': (theme) => theme.palette.secondary5.main,
                'border': 'none',
                '& input': { color: 'white', height: '25px', cursor: 'pointer' },
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': { borderRadius: 20 },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white',
                    borderRadius: 20
                  }
                }
              }}
            />
          )}
          <Button variant='contained' startIcon={<AddIcon />} onClick={() => navigate('/upload-music')}>
            Tải nhạc lên
          </Button>
        </Box>
      </Box>

      {/* Thêm phần nút Songs và Albums */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start', gap: 2, pt: 2 }}>
        <Button
          onClick={() => setSelectedTab('songs')}
          sx={{
            'color': selectedTab === 'songs' ? 'white' : 'gray',
            'bgcolor': selectedTab === 'songs' ? 'primary.main' : 'transparent',
            'textDecoration': selectedTab === 'songs' ? 'underline' : 'none',
            '&:hover': {
              bgcolor: selectedTab === 'songs' ? 'primary.main' : 'transparent',
              color: 'white'
            }
          }}
        >
          Songs
        </Button>
        <Button
          onClick={() => setSelectedTab('albums')}
          sx={{
            'color': selectedTab === 'albums' ? 'white' : 'gray',
            'bgcolor': selectedTab === 'albums' ? 'primary.main' : 'transparent',
            'textDecoration': selectedTab === 'albums' ? 'underline' : 'none',
            '&:hover': {
              bgcolor: selectedTab === 'albums' ? 'primary.main' : 'transparent',
              color: 'white'
            }
          }}
        >
          Albums
        </Button>
        {selectedTab === 'albums' && (
          <Button
            startIcon={<AddIcon />}
            sx={{
              'color': selectedTab === 'albums' ? 'white' : 'gray',
              'bgcolor': selectedTab === 'albums' ? 'primary.main' : 'transparent',
              'textDecoration': selectedTab === 'albums' ? 'underline' : 'none',
              '&:hover': {
                bgcolor: selectedTab === 'albums' ? 'primary.main' : 'transparent',
                color: 'white'
              }
            }}
            onClick={() => {
              navigate('/create-album')
            }}
          >
            New Album
          </Button>
        )}
      </Box>

      {/* Hiển thị danh sách nhạc đã lọc */}
      <Box sx={{ width: '100%', overflowY: 'auto' }}>
        {selectedTab === 'songs' && <MusicTable />}
        {selectedTab === 'albums' && <AlbumTable />}
      </Box>
    </Box>
  )
}
