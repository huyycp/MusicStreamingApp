import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Input from '@mui/material/Input'
import Typography from '@mui/material/Typography'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetCreateAlbumData } from '~/hooks/useGetCreateAlbumData'
import MusicAlbum from '~/components/MusicAlbum'

export default function CreateAlbumBody() {
  const [error, setError] = useState('')

  const { name, setName } = useGetCreateAlbumData()

  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Magic Music - Create Album'
  }, [])

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setName(value)
    if (value === '') setError('Không để trống')
    else setError('')
  }

  const handleNext = () => {
    setError('')
    if (name.trim() === '') setError('Không để trống')
    else if (error === '') {
      setName(name)
      navigate('/create-album/final')
    }
  }

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        height: '100%',
        gap: 1,
        color: (theme) => theme.palette.secondary4.main
      }}
    >
      <MusicAlbum />
      <Typography variant='h3' fontWeight='bold' sx={{ textAlign: 'center', mb: '20px' }}>
        Nhập tên album
      </Typography>
      <Box
        sx={{
          'width': '80%',
          'display': 'flex',
          'flexDirection': 'column',
          'gap': 1,
          '& .MuiTextField-root': {
            cursor: 'pointer'
          },
          '& .MuiOutlinedInput-root': {
            'borderRadius': '30px',
            '& fieldset': {
              borderColor: 'white'
            },
            '&:hover fieldset': {
              borderColor: 'white'
            },
            '&.Mui-focused fieldset': {
              borderColor: 'white'
            }
          }
        }}
      >
        <FormControl sx={{ width: '100%', pb: 2 }} error={!!error}>
          <Box sx={{ fontSize: 14, fontWeight: 'bold' }}>Tên của album</Box>
          <Input
            id='my-input'
            aria-describedby='my-helper-text'
            placeholder='Tên album'
            value={name}
            onChange={handleChange}
            sx={{
              'borderColor': error !== '' ? 'red' : '',
              '&:hover': {
                borderColor: error !== '' ? 'red' : ''
              },
              '&.Mui-focused': {
                borderColor: error !== '' ? 'red' : ''
              }
            }}
          />
          {error && (
            <FormHelperText
              id='my-helper-text'
              sx={{ fontSize: 12, m: 'unset', display: 'flex', alignItems: 'start', justifyContent: 'start', gap: 0.5, pt: 1 }}
            >
              <ErrorOutlineIcon sx={{ color: 'red', fontSize: 20 }} />
              {error}
            </FormHelperText>
          )}
        </FormControl>
        {/* {!isPending && ( */}
        <Button sx={{ width: '100%', fontSize: 14, fontWeight: 'bold', mb: 2 }} variant='contained' onClick={handleNext}>
          Tiếp theo
        </Button>
        {/* )} */}
        {/* {isPending && <CircularProgress color='success' />} */}
      </Box>
    </Box>
  )
}
