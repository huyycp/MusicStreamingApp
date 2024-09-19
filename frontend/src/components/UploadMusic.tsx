import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import CancelIcon from '@mui/icons-material/Cancel'
import { SetStateAction, useState } from 'react'

type Props = {
  open: boolean
  setOpen: React.Dispatch<SetStateAction<boolean>>
}

export default function UploadMusic({ open, setOpen }: Props) {
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [textFile, setTextFile] = useState<File | null>(null)
  const [textContent, setTextContent] = useState<string>('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string>('')

  const handleClose = () => {
    setOpen(false)
  }

  const handleAudioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null
    if (file) {
      setAudioFile(file)
    }
  }

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null
    if (file) {
      setTextFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setTextContent(e.target.result as string)
        }
      }
      reader.readAsText(file)
    }
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setImageUrl(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setImageFile(null)
    setImageUrl('')
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll='body'
      maxWidth='md'
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          bgcolor: (theme) => theme.palette.neutral.neutral3,
          color: (theme) => theme.palette.secondary4.main
        }
      }}
    >
      <DialogTitle>Upload Music</DialogTitle>
      <DialogContent>
        <Box component='form' sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 3 }}>
            <Button variant='contained' component='label' sx={{ width: '100%', p: 1.3 }}>
              Upload Audio
              <input hidden accept='audio/*' type='file' onChange={handleAudioChange} />
            </Button>
            {audioFile && (
              <audio controls>
                <source src={URL.createObjectURL(audioFile)} type={audioFile.type} />
                Your browser does not support the audio element.
              </audio>
            )}
          </Box>
          <Box
            sx={{
              'display': 'flex',
              'flexDirection': 'row',
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
            <TextField
              placeholder='Tên nhạc'
              variant='outlined'
              fullWidth
              sx={{
                '& input::placeholder': {
                  color: (theme) => theme.palette.neutral.neutral1
                },
                '& input': {
                  color: (theme) => theme.palette.secondary4.main
                }
              }}
            />
            <TextField
              placeholder='Tên các người tham gia'
              variant='outlined'
              fullWidth
              sx={{
                '& input::placeholder': {
                  color: (theme) => theme.palette.neutral.neutral1
                },
                '& input': {
                  color: (theme) => theme.palette.secondary4.main
                }
              }}
            />
          </Box>

          <Button variant='contained' component='label'>
            Upload Lyrics (Text File)
            <input hidden accept='.txt' type='file' onChange={handleTextChange} />
          </Button>
          <TextField
            placeholder='Lời bài hát'
            multiline
            rows={10}
            variant='outlined'
            fullWidth
            value={textContent}
            onChange={(e) => setTextContent(e.target.value)}
            sx={{
              'color': 'white',
              'border': 'none',
              '& .MuiInputBase-input': {
                color: 'white'
              },
              '& .MuiInputBase-input::placeholder': {
                color: 'white'
              },
              '& input': { color: 'white', height: '25px', cursor: 'pointer' },
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: 'white'
                },
                '& fieldset': {
                  borderColor: 'white'
                },
                '&:hover fieldset': {
                  borderColor: 'white'
                }
              }
            }}
          />
          <Button variant='contained' component='label'>
            Upload Cover Image
            <input hidden accept='image/*' type='file' onChange={handleImageChange} />
          </Button>
          {imageFile && (
            <Box sx={{ position: 'relative', marginTop: 1 }}>
              <Box component='img' src={imageUrl} alt='Cover' sx={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }} />
              <IconButton
                onClick={handleRemoveImage}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  backgroundColor: 'transparent'
                }}
              >
                <CancelIcon sx={{ color: 'white' }} />
              </IconButton>
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='secondary' variant='outlined'>
          Cancel
        </Button>
        <Button variant='contained' color='primary'>
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  )
}
