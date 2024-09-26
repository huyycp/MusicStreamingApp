import Box from '@mui/material/Box'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import SearchIcon from '@mui/icons-material/Search'
import { SetStateAction, useCallback, useState } from 'react'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import MusicTable from './MusicTable'
import { mockData } from '~/apis/data-mock'
import { useResize } from '~/hooks/useResize'
import { useNavigate } from 'react-router-dom'

export default function MyMusic() {
  const [searchValue, setSearchValue] = useState<null | string>('')
  const navigate = useNavigate()
  const { widths } = useResize()

  const listMusic = mockData.listMusics

  const handleSearchChange = useCallback((e: { target: { value: SetStateAction<string | null> } }) => {
    setSearchValue(e.target.value)
  }, [])
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', pt: 2, width: '100%', gap: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant='h3' noWrap>
          My Music
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'end', gap: 1 }}>
          {widths[1] > 650 && (
            <TextField
              id='outlined-search'
              placeholder='Tìm kiếm'
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
                        //   onClick={handleSearchClick}
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
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}></Box>
      <Box sx={{ width: '100%' }}>
        <MusicTable listMusic={listMusic} />
      </Box>
    </Box>
  )
}
