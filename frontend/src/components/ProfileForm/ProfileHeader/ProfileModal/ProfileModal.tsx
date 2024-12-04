import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import CloseIcon from '@mui/icons-material/Close'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined'
import { useState } from 'react'
import { Typography } from '@mui/material'
import { IUser } from '~/type/User/IUser'
import useUpdateProfile from '~/hooks/User/useUpdateProfile'
import { useUser } from '~/hooks/useUser'

type Props = {
  open: boolean
  onClose: () => void
  initialValue?: string
  user: IUser
}

const ProfileModal = ({ open, onClose, initialValue = '', user }: Props) => {
  const [name, setName] = useState(initialValue)
  const [error, setError] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const { mutate } = useUpdateProfile()
  const { setUser } = useUser()

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
    }
    mutate(
      { name: name },
      {
        onSuccess: () => {
          setUser({ ...user, name: name })
          onClose()
        },
        onError: () => {
          setError(true)
        }
      }
    )
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
              width: 180,
              height: 180,
              borderRadius: '100%',
              backgroundColor: user?.avatar ? `url(${user.avatar})` : '#333',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {!user?.avatar &&
              (isHovered ? (
                <Box>
                  <CreateOutlinedIcon
                    sx={{
                      fontSize: '70px',
                      color: (theme) => theme.palette.secondary4.main,
                      transition: 'all 0.3s'
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: '14px',
                      fontWeight: 'bold',
                      color: (theme) => theme.palette.secondary4.main
                    }}
                  >
                    Chọn ảnh
                  </Typography>
                </Box>
              ) : (
                <PermIdentityIcon
                  sx={{
                    fontSize: '80px',
                    color: (theme) => theme.palette.neutral.neutral2,
                    transition: 'all 0.3s'
                  }}
                />
              ))}
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
