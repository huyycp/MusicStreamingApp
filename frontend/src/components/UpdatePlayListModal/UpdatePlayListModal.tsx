import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { useEffect, useRef, useState } from 'react'
import { ILibrary } from '~/type/Library/ILibrary'
import TextField from '@mui/material/TextField'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined'
import useEditLibrary from '~/hooks/Library/useEditLibrary'
import useGetAlbumDetail from '~/hooks/Album/useGetLibraryDetail'

type Props = {
  open: boolean
  playListId: string
  // eslint-disable-next-line no-unused-vars
  setOpen: (open: boolean) => void
}

export default function UpdatePlayListModal({ open, setOpen, playListId }: Props) {
  const { data } = useGetAlbumDetail(playListId)
  const playList = data?.result as ILibrary
  const [image, setImage] = useState<string | undefined>(playList?.image)
  const [imageFile, setImageFile] = useState<File | undefined>()
  const [name, setName] = useState(playList?.name)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { editLibrary, isPending } = useEditLibrary()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if (value.length < 50) setName(value)
    if (value.length > 50) {
      setError('Tên không được vượt quá 50 ký tự')
    } else if (value === '') setError('Không để trống')
    else setError('')
  }

  useEffect(() => {
    if (open && playList) {
      setName(playList.name)
      setImage(playList.image)
      setError('')
      setImageFile(undefined)
    }
  }, [open, playList])

  const handleClose = () => {
    setOpen(false)
    setName('')
    setImage(undefined)
    setImageFile(undefined)
    setError('')
  }

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

  const handleUpdate = () => {
    setError('')
    if (name.trim() === '') {
      setError('Không để trống')
    } else {
      editLibrary({
        name,
        image: imageFile || '',
        library_id: playList._id
      })
    }
  }

  useEffect(() => {
    if (!isPending) {
      handleClose()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending])

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 650,
          bgcolor: (theme) => theme.palette.neutral.neutral3,
          color: (theme) => theme.palette.secondary4.main,
          borderRadius: 2,
          boxShadow: 24,
          p: '12px 24px 24px 24px'
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
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

          <Typography variant='h6' align='left' sx={{ mb: 2 }}>
            Sửa thông tin chi tiết
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center' }}>
          {playList.type === 'album' && (
            <Box sx={{ position: 'relative', width: '40%' }}>
              <Box
                sx={{
                  'width': '100%',
                  'aspectRatio': '1/1',
                  'borderRadius': '10px',
                  'backgroundColor': '#333',
                  'backgroundImage': image ? `url(${image})` : 'none',
                  'backgroundSize': 'cover',
                  'backgroundPosition': 'center',
                  'display': 'flex',
                  'alignItems': 'center',
                  'justifyContent': 'center',
                  'cursor': 'pointer',
                  'transition': 'all 0.3s',
                  'position': 'relative',
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
          )}

          <Box
            sx={{
              width: playList.type === 'album' ? '60%' : '100%',
              bgcolor: 'inherit',
              display: 'flex',
              flexDirection: 'column',
              gap: 1
            }}
          >
            <TextField
              error={error !== ''}
              id='outlined-error-helper-text'
              onChange={handleChange}
              autoFocus
              label='Tên của danh sách phát'
              value={name}
              helperText={error}
              sx={{
                'borderRadius': '0px',
                '& fieldset': {
                  borderColor: error !== '' ? 'red' : 'white',
                  borderRadius: '0px'
                },
                '&:hover fieldset': {
                  borderColor: error !== '' ? 'red' : 'white'
                },
                '&.Mui-focused fieldset': {
                  borderColor: error !== '' ? 'red' : 'white'
                },
                '& .MuiInputLabel-root': {
                  color: error !== '' ? 'red' : 'white'
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: error !== '' ? 'red' : 'white'
                },
                '& .MuiInputBase-input': {
                  color: error !== '' ? 'red' : 'white'
                },
                '& .MuiFormHelperText-root': {
                  color: error !== '' ? 'red' : 'white'
                }
              }}
            />
            <Box sx={{ display: 'flex', alignItems: 'end', justifyContent: 'flex-end', mt: 1 }}>
              <Button
                variant='contained'
                color='secondary'
                fullWidth
                onClick={handleUpdate}
                sx={{
                  'width': '30%',
                  '&:disabled': {
                    backgroundColor: 'grey.500',
                    color: 'white',
                    opacity: 0.7
                  }
                }}
                disabled={error !== '' || isPending}
              >
                LƯU
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}
