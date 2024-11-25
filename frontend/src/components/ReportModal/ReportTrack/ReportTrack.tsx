import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import Checkbox from '@mui/material/Checkbox'
import { ITrack } from '~/type/Tracks/ITrack'
import { useState } from 'react'
import { ReportData } from '~/type/Report/ReportData'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import Input from '@mui/material/Input'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { Button, TextField } from '@mui/material'
import useReportTrack from '~/hooks/Report/useReportTrack'
import { useSnackbar } from 'notistack'

type Props = {
  open: boolean
  // eslint-disable-next-line no-unused-vars
  setOpen: (open: boolean) => void
  track: ITrack
}

export default function ReportTrack({ open, setOpen, track }: Props) {
  const [selectedReasons, setSelectedReasons] = useState<string[]>([])
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const { mutate, isPending } = useReportTrack()

  const [error, setError] = useState('')
  const [errorDesc, setErrorDesc] = useState('')
  const { enqueueSnackbar } = useSnackbar()

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setTitle(value)
    if (value === '') setError('Không để trống')
    else setError('')
  }

  const handleClose = () => {
    setTitle('')
    setDesc('')
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

  const handleCreate = () => {
    setError('')
    setErrorDesc('')
    if (title.trim() === '') {
      setError('Không để trống')
    } else if (desc.trim() === '') {
      setErrorDesc('Không để trống')
    } else if (error === '' && errorDesc === '') {
      mutate(
        { trackId: track._id, data: { reason: selectedReasons[0], subject: title, body: desc } },
        {
          onSuccess: () => {
            enqueueSnackbar('Báo cáo thành công', { variant: 'success' })
            setTitle('')
            setDesc('')
            setSelectedReasons([])
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
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500,
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
            <Box sx={{ fontSize: 14, fontWeight: 'bold' }}>Tiêu đề báo cáo</Box>
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
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'space-between' }}>
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
            <Box sx={{ fontSize: 14, fontWeight: 'bold' }}>Nội dung báo cáo</Box>
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
        <Button
          variant='contained'
          fullWidth
          onClick={handleCreate}
          sx={{
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
    </Modal>
  )
}
