import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import Checkbox from '@mui/material/Checkbox'
import { ITrack } from '~/type/Tracks/ITrack'
import { useEffect, useRef, useState } from 'react'
import { ReportData } from '~/type/Report/ReportData'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import Input from '@mui/material/Input'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { Button, TextField } from '@mui/material'
import useReportTrack from '~/hooks/Report/useReportTrack'
import { useSnackbar } from 'notistack'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload'

type Props = {
  open: boolean
  // eslint-disable-next-line no-unused-vars
  setOpen: (open: boolean) => void
  track: ITrack
}

interface ImageFile {
  file: File
  preview: string
}

export default function ReportTrack({ open, setOpen, track }: Props) {
  const [selectedReasons, setSelectedReasons] = useState<string[]>([])
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const { mutate, isPending } = useReportTrack()
  const [images, setImages] = useState<ImageFile[]>([])
  const [imageError, setImageError] = useState('')
  const [error, setError] = useState('')
  const [errorDesc, setErrorDesc] = useState('')
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const { enqueueSnackbar } = useSnackbar()

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files
    if (!fileList) return

    const files = Array.from(fileList)
    if (files.length + images.length > 5) {
      setImageError('Chỉ được tải lên tối đa 5 ảnh')
      return
    }

    const invalidFiles = files.filter((file) => !file.type.startsWith('image/'))
    if (invalidFiles.length > 0) {
      setImageError('Chỉ chấp nhận file ảnh')
      return
    }

    const newImages: ImageFile[] = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file)
    }))

    setImages((prev) => [...prev, ...newImages])
    setImageError('')
  }

  const handleRemoveImage = (index: number) => {
    setImages((prev) => {
      const newImages = [...prev]
      URL.revokeObjectURL(newImages[index].preview)
      newImages.splice(index, 1)
      return newImages
    })
    setImageError('')
  }

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setTitle(value)
    if (value === '') setError('Không để trống')
    else setError('')
  }

  useEffect(() => {
    if (audioFile) {
      const newAudioUrl = URL.createObjectURL(audioFile)
      setAudioUrl(newAudioUrl)

      return () => {
        if (audioUrl) {
          URL.revokeObjectURL(audioUrl)
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioFile])

  useEffect(() => {
    if (audioRef.current && audioUrl) {
      audioRef.current.load()
    }
  }, [audioUrl])

  const handleAudioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null
    if (file) {
      setAudioFile(file)
    }
  }

  const handleClose = () => {
    setTitle('')
    setDesc('')
    setAudioFile(null)
    setAudioUrl(null)
    setImages([])
    setImageError('')
    setError('')
    setErrorDesc('')
    setSelectedReasons([])
    setOpen(false)
  }

  const handleChangeDesc = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setDesc(value)
    if (value === '') setErrorDesc('Không để trống')
    else setErrorDesc('')
  }

  const handleCheckboxChange = (reason: string, checked: boolean) => {
    setSelectedReasons((prev) => {
      if (checked) {
        return [...prev, reason]
      } else {
        return prev.filter((item) => item !== reason)
      }
    })
  }

  const handleClear = () => {
    setTitle('')
    setDesc('')
    setAudioFile(null)
    setAudioUrl(null)
    setImages([])
    setImageError('')
    setError('')
    setErrorDesc('')
    setSelectedReasons([])
  }

  const handleCreate = () => {
    setError('')
    setErrorDesc('')
    if (title.trim() === '') {
      setError('Không để trống')
    } else if (desc.trim() === '') {
      setErrorDesc('Không để trống')
    } else if (!audioFile) {
      setErrorDesc('Không để trống file audio')
    } else if (selectedReasons.length === 0) {
      setErrorDesc('Chọn ít nhất 1 lý do')
    } else if (error === '' && errorDesc === '') {
      mutate(
        {
          trackId: track._id,
          data: {
            reason: selectedReasons,
            subject: title,
            body: desc,
            image: images.map((image) => image.file),
            audio: audioFile
          }
        },
        {
          onSuccess: () => {
            enqueueSnackbar('Báo cáo thành công', { variant: 'success' })
            handleClose()
          },
          onError: () => {
            enqueueSnackbar('Báo cáo thất bại', { variant: 'error' })
          }
        }
      )
    }
  }

  return (
    <Modal
      open={open}
      // onClose={handleClose}
      sx={{
        overflowY: 'auto'
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-40%, -50%)',
          overflowY: 'auto',
          width: 700,
          bgcolor: (theme) => theme.palette.neutral.neutral3,
          color: (theme) => theme.palette.secondary4.main,
          borderRadius: 2,
          boxShadow: 24,
          p: '12px 24px 24px 24px'
        }}
        onClick={(e) => e.stopPropagation()}
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
            Báo cáo vi phạm
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
            <Input
              autoComplete='off'
              id='title-input'
              aria-describedby='title-helper-text'
              placeholder='Tiêu đề báo cáo'
              value={title}
              onChange={handleTitleChange}
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
                id='title-helper-text'
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

        <Box sx={{ fontSize: 14, fontWeight: 'bold' }}>Lý do</Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0, justifyContent: 'space-between' }}>
          {ReportData.map((item, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', width: '48%' }}>
              <Checkbox
                checked={selectedReasons.includes(item.reason)}
                onChange={(e) => handleCheckboxChange(item.reason, e.target.checked)}
                sx={{
                  marginRight: 1
                }}
              />
              <Typography sx={{ fontSize: '0.875rem' }}>{item.translate}</Typography>
            </Box>
          ))}
        </Box>

        <Box
          sx={{
            'paddingTop': '10px',
            'width': '100%',
            'display': 'flex',
            'flexDirection': 'column',
            'gap': 1,
            '& .MuiTextField-root': {
              cursor: 'pointer'
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderRadius: 1,
                borderColor: '#777777',
                border: '2px solid #777777'
              },
              '&:hover fieldset': {
                borderRadius: 1,
                borderColor: 'white'
              },
              '&.Mui-focused fieldset': {
                borderRadius: 1,
                borderColor: 'white'
              }
            }
          }}
        >
          <FormControl sx={{ width: '100%', pb: 2 }} error={!!errorDesc}>
            <TextField
              id='desc-input'
              aria-describedby='desc-helper-text'
              placeholder='Nội dung báo cáo'
              value={desc}
              onChange={handleChangeDesc}
              variant='outlined'
              multiline
              rows={2}
              fullWidth
              error={!!errorDesc}
              helperText={errorDesc}
              inputProps={{
                sx: {
                  '&': {
                    color: '#ffffff'
                  },
                  '&::placeholder': {
                    color: '#b3b3b3'
                  }
                }
              }}
              sx={{
                'borderColor': errorDesc !== '' ? 'red' : '',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '30px'
                }
              }}
            />
          </FormControl>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 2,
            mt: 2
          }}
        >
          <Box sx={{ mt: 0 }}>
            <Box sx={{ fontSize: 14, fontWeight: 'bold', mb: 1 }}>Hình ảnh</Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {images.map((image, index) => (
                  <Box
                    key={index}
                    sx={{
                      position: 'relative',
                      width: 70,
                      height: 70
                    }}
                  >
                    <img
                      src={image.preview}
                      alt={`Preview ${index + 1}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '4px'
                      }}
                    />
                    <IconButton
                      onClick={() => handleRemoveImage(index)}
                      sx={{
                        'position': 'absolute',
                        'top': -8,
                        'right': -8,
                        'bgcolor': 'background.paper',
                        '&:hover': { bgcolor: 'background.paper' }
                      }}
                      size='small'
                    >
                      <CloseIcon />
                    </IconButton>
                  </Box>
                ))}
              </Box>

              <Box>
                <Button component='label' variant='outlined' startIcon={<DriveFolderUploadIcon />} sx={{ mr: 2 }} disabled={images.length >= 5}>
                  Tải ảnh lên
                  <input
                    type='file'
                    hidden
                    multiple
                    accept='image/*'
                    onChange={handleImageUpload}
                    style={{
                      width: '15px',
                      height: '15px'
                    }}
                  />
                </Button>
                <Typography variant='caption' color='text.secondary'>
                  (Tối đa 5 ảnh)
                </Typography>
              </Box>
              {imageError && (
                <Typography color='error' variant='caption'>
                  {imageError}
                </Typography>
              )}
            </Box>
          </Box>
          <Box sx={{ mt: 0, pt: 1, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ fontSize: 14, fontWeight: 'bold', mb: 1 }}>File</Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, pb: 1, justifyContent: 'space-between' }}>
              <Button variant='contained' component='label' sx={{ width: '120px', height: '43px', whiteSpace: 'nowrap' }}>
                Tải lên
                <input hidden accept='audio/*' type='file' onChange={handleAudioChange} />
              </Button>
              {audioFile && audioUrl && (
                <IconButton
                  onClick={() => {
                    setAudioFile(null)
                    setAudioUrl(null)
                  }}
                  sx={{
                    'width': '43px',
                    'height': '43px',
                    'bgcolor': 'background.paper',
                    '&:hover': { bgcolor: 'background.paper' }
                  }}
                  size='small'
                >
                  <CloseIcon />
                </IconButton>
              )}
            </Box>
            {audioUrl && (
              <audio ref={audioRef} controls>
                <source src={audioUrl} type={audioFile?.type} />
                Your browser does not support the audio element.
              </audio>
            )}
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
            alignItems: 'center'
          }}
        >
          <Button
            variant='outlined'
            onClick={handleClear}
            sx={{
              'mt': 1,
              'width': '20%',
              '&:disabled': {
                backgroundColor: 'grey.500',
                color: 'white',
                opacity: 0.7
              }
            }}
          >
            Làm mới
          </Button>
          <Button
            variant='contained'
            onClick={handleCreate}
            sx={{
              'mt': 1,
              'width': '20%',
              '&:disabled': {
                backgroundColor: 'grey.500',
                color: 'white',
                opacity: 0.7
              }
            }}
            disabled={isPending || error !== '' || errorDesc !== '' || title === '' || desc === '' || selectedReasons.length === 0}
          >
            Tạo mới
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}
