import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import FormControl from '@mui/material/FormControl'
import Input from '@mui/material/Input'
import FormHelperText from '@mui/material/FormHelperText'
// import useUpdatePlayList from '~/hooks/Album/useUpdatePlayList'
import { useState } from 'react'
// import { VariantType, useSnackbar } from 'notistack'
import { ILibrary } from '~/type/Library/ILibrary'

type Props = {
  open: boolean
  playList: ILibrary
  // eslint-disable-next-line no-unused-vars
  setOpen: (open: boolean) => void
}

export default function UpdatePlayListModal({ open, setOpen, playList }: Props) {
  //   const { mutate, isPending } = useUpdatePlayList()

  const handleClose = () => setOpen(false)
  //   const { enqueueSnackbar } = useSnackbar()

  const [name, setName] = useState(playList.name)
  const [error, setError] = useState('')
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setName(value)
    if (value === '') setError('Không để trống')
    else setError('')
  }

  const handleUpdate = () => {
    setError('')
    if (name.trim() === '') {
      setError('Không để trống')
    }
    // else if (error === '') {
    //   mutate(
    //     { name },
    //     {
    //       onSuccess: () => {
    //         enqueueSnackbar('Update playlist successfully!', { variant: 'success' as VariantType })
    //         handleClose()
    //       },
    //       onError: () => {
    //         enqueueSnackbar('Failed to update playlist!', { variant: 'error' as VariantType })
    //       }
    //     }
    //   )
    // }
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: (theme) => theme.palette.neutral.neutral3,
          color: (theme) => theme.palette.secondary4.main,
          borderRadius: 2,
          boxShadow: 24,
          p: '12px 24px 24px 24px'
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8
            }}
          >
            <CloseIcon sx={{ color: 'white' }} />
          </IconButton>

          <Typography variant='h6' align='center' sx={{ mb: 2 }}>
            Chỉnh sửa playlist
          </Typography>
        </Box>

        <Box
          sx={{
            'width': '100%',
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
            <Box sx={{ fontSize: 14, fontWeight: 'bold' }}>Tên của Playlist</Box>
            <Input
              id='my-input'
              aria-describedby='my-helper-text'
              placeholder='Tên playlist'
              value={name}
              onChange={handleChange}
              autoFocus
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
                sx={{
                  fontSize: 12,
                  m: 'unset',
                  display: 'flex',
                  alignItems: 'start',
                  justifyContent: 'start',
                  gap: 0.5,
                  pt: 1
                }}
              >
                <ErrorOutlineIcon sx={{ color: 'red', fontSize: 20 }} />
                {error}
              </FormHelperText>
            )}
          </FormControl>
        </Box>
        <Button
          variant='contained'
          fullWidth
          onClick={handleUpdate}
          sx={{
            '&:disabled': {
              backgroundColor: 'grey.500',
              color: 'white',
              opacity: 0.7
            }
          }}
          //   disabled={isPending || error !== ''}
          disabled={error !== ''}
        >
          LƯU
        </Button>
      </Box>
    </Modal>
  )
}
