import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import CloseIcon from '@mui/icons-material/Close'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined'
import { useEffect, useRef, useState } from 'react'
import { Typography } from '@mui/material'
import { IUser } from '~/type/User/IUser'
import useUpdateProfile from '~/hooks/User/useUpdateProfile'

type Props = {
  open: boolean
  onClose: () => void
  initialValue?: string
  user: IUser
}

const ProfileModal = ({ open, onClose, initialValue = '', user }: Props) => {
  const [name, setName] = useState(initialValue)
  const [error, setError] = useState(false)
  const { updateProfile, isPending } = useUpdateProfile()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [image, setImage] = useState<string | undefined>(user?.avatar)
  const [imageFile, setImageFile] = useState<File | undefined>()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setName(value)
    if (!value.trim()) {
      setError(true)
    } else {
      setError(false)
    }
  }

  const handleSave = () => {
    if (!name.trim()) {
      setError(true)
      return
    } else {
      updateProfile({ name, image: imageFile })
    }
  }

  useEffect(() => {
    if (!isPending) {
      handleClose()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending])

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (image && image.startsWith('blob:')) {
        URL.revokeObjectURL(image)
      }
      const imageUrl = URL.createObjectURL(file)
      setImage(imageUrl)
      setImageFile(file)
    }
  }

  const handleDeleteImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (image && image.startsWith('blob:')) {
      URL.revokeObjectURL(image)
    }
    setImage(undefined)
  }

  const handleBoxClick = () => {
    fileInputRef.current?.click()
  }

  const handleClose = () => {
    setName(initialValue)
    setError(false)
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth='sm'
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: '#1a1a1a',
          color: '#fff',
          borderRadius: '12px'
        }
      }}
    >
      <Box sx={{ position: 'relative', p: 2 }}>
        <DialogTitle sx={{ p: 0, mb: 3 }}>Chi tiết hồ sơ</DialogTitle>

        <IconButton
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 16,
            top: 16,
            color: '#fff'
          }}
        >
          <CloseIcon />
        </IconButton>

        <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center' }}>
          <Box
            sx={{
              'width': 180,
              'height': 180,
              'borderRadius': '100%',
              'backgroundColor': '#333',
              'backgroundImage': image ? `url(${image})` : 'none',
              'backgroundSize': 'cover',
              'backgroundPosition': 'center',
              'display': 'flex',
              'alignItems': 'center',
              'justifyContent': 'center',
              'cursor': 'pointer',
              'position': 'relative',
              'transition': 'all 0.3s',
              '&:hover': {
                '& .hover-overlay': {
                  opacity: 1
                },
                '& .hover-overlay-1': {
                  opacity: 0
                }
              }
            }}
            onClick={handleBoxClick}
          >
            <input ref={fileInputRef} type='file' accept='image/*' style={{ display: 'none' }} onChange={handleImageChange} />
            {!image && (
              <PermIdentityIcon
                className='hover-overlay-1'
                sx={{
                  fontSize: '80px',
                  color: (theme) => theme.palette.neutral.neutral2,
                  transition: 'all 0.3s'
                }}
              />
            )}
            <Box
              className='hover-overlay'
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0,
                transition: 'opacity 0.3s',
                borderRadius: '10px'
              }}
            >
              <CreateOutlinedIcon
                sx={{
                  fontSize: '70px',
                  color: (theme) => theme.palette.secondary4.main
                }}
              />
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: (theme) => theme.palette.secondary4.main
                }}
              >
                {image ? 'Thay đổi ảnh' : 'Chọn ảnh'}
              </Typography>
            </Box>
            {image && (
              <IconButton
                onClick={handleDeleteImage}
                sx={{
                  'position': 'absolute',
                  'top': -10,
                  'right': -10,
                  'backgroundColor': '#333',
                  '&:hover': {
                    backgroundColor: '#444'
                  }
                }}
              >
                <CloseIcon sx={{ color: 'white' }} />
              </IconButton>
            )}
          </Box>

          <Box
            sx={{
              width: '60%',
              bgcolor: 'inherit',
              display: 'flex',
              flexDirection: 'column',
              gap: 1
            }}
          >
            <TextField
              fullWidth
              id='outlined-search'
              value={name}
              onChange={handleChange}
              type='text'
              size='small'
              error={error}
              helperText={error ? 'Tên không được để trống' : ''}
              sx={{
                'borderRadius': 1,
                'width': '100%',
                'border': 'none',
                'borderColor': 'white',
                '& input': { color: 'white', height: '20px', cursor: 'pointer', borderColor: 'white' },
                '& .MuiOutlinedInput-root': {
                  'borderColor': 'white',
                  '& fieldset': { borderColor: 'white', borderRadius: 1 },
                  '&:hover fieldset': { borderRadius: 1, borderColor: 'white' },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white',
                    borderRadius: 1
                  }
                },
                '& .MuiFormHelperText-root': {
                  backgroundColor: 'red',
                  color: 'white',
                  width: '100%',
                  textAlign: 'start',
                  m: 'unset',
                  padding: '0px 0px 0px 10px',
                  borderBottomLeftRadius: '4px',
                  borderBottomRightRadius: '4px'
                }
              }}
            />
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'end', justifyContent: 'end' }}>
              <Button variant='contained' onClick={handleSave} color='secondary'>
                Lưu
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}

export default ProfileModal
