import { Close, PlayArrowRounded, PauseRounded } from '@mui/icons-material'
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  Slider,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  Backdrop,
  CircularProgress
} from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { apiGetDetailReport, apiUpdateReport } from '../Auth/ReportAPI'
import { Result } from '../type/IReportTrack'
import { toast } from 'react-toastify'
import Loader from '../components/Loader/Loader'

const StyledTextField = styled(TextField)`
  .MuiInputBase-root {
    background-color: var(--secondary-main-color);
    color: #fff; /* Màu chữ trong trường nhập liệu */
  }

  .MuiOutlinedInput-root {
    border: 1px solid #555;
  }

  .MuiInputBase-root.Mui-disabled {
    background-color: #444;
    color: #888;
  }

  .MuiOutlinedInput-notchedOutline {
    border-color: #555; /* Màu viền trường nhập liệu khi không có focus */
  }

  .Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: var(--main-color) !important; /* Màu viền khi trường nhập liệu có focus */
  }
`

const DetailReport = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [form, setForm] = useState<Result | null>(null)
  const [paused, setPaused] = useState(true)
  const [position, setPosition] = useState(0)
  const [duration, setDuration] = useState(0)
  const [loading, setLoading] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isPending, setIsPending] = useState(false)
  const [open, setOpen] = React.useState(false)
  const [disagree, setDisagree] = React.useState(false)
  const [desc, setDesc] = React.useState('')
  const location = useLocation()
  const { idrp, id } = location.state as { idrp: string; id: string }
  const navigate = useNavigate()

  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      audio.addEventListener('loadedmetadata', () => {
        setDuration(audio.duration)
      })
      audio.addEventListener('timeupdate', () => {
        setPosition(audio.currentTime)
      })
    }
    return () => {
      if (audio) {
        audio.removeEventListener('loadedmetadata', () => {})
        audio.removeEventListener('timeupdate', () => {})
      }
    }
  }, [])

  const fetchDetailReport = async () => {
    try {
      setIsLoading(true)
      const response = await apiGetDetailReport(idrp)
      if (!response.result) {
        throw new Error('Network response was not ok')
      }
      setForm(response.result)
      setIsPending(response.result.status === 'pending' ? true : false)
      setDisagree(response.result.rejection_reason === '' ? false : true)
      setDesc(response.result.rejection_reason)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching users:', error)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    fetchDetailReport()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isReasonChecked = (reason: string): boolean => {
    return form?.reason?.includes(reason) || false
  }

  const togglePlay = () => {
    const audio = audioRef.current
    if (audio) {
      if (paused) {
        audio.play()
      } else {
        audio.pause()
      }
      setPaused(!paused)
    }
  }

  const images = form?.image || []

  const handleClose = () => {
    navigate(id === undefined ? '/' : '/report/trackreportcard', id === undefined ? undefined : { state: { id } })
  }
  // eslint-disable-next-line no-unused-vars
  const handleCheckboxChange = (event: { target: { checked: boolean | ((prevState: boolean) => boolean) } }) => {
    setDisagree(event.target.checked)
  }

  const handleClickOpenAlert = () => {
    setOpen(true)
  }

  const handleCloseAlert = () => {
    setOpen(false)
  }

  const handleUpdateReport = async (): Promise<void> => {
    handleCloseAlert()

    if (disagree === true && desc.trim() === '') {
      toast.error('Please provide a description before rejecting the report.')
      return
    }

    try {
      setLoading(true)

      const response = await apiUpdateReport(idrp, {
        status: disagree === false ? 'resolved' : 'dismissed',
        rejection_reason: desc
      })

      if (response.message === 'Update status report success') {
        toast.success('Report approved successfully')
        navigate(id === undefined ? '/' : '/report/trackreportcard', id === undefined ? undefined : { state: { id } })
      } else {
        toast.error('Failed to approve report. Please try again.')
      }
    } catch {
      toast.error('An error occurred while approving the report.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDesc(event.target.value)
  }

  return (
    <div className='popup'>
      <div className='popup-inner'>
        {isLoading ? (
          <Loader />
        ) : (
          <div className='usercard' style={{ paddingBottom: '100px' }}>
            <div className='close'>
              <Close onClick={handleClose} style={{ cursor: 'pointer' }} />
            </div>
            <h2 style={{ marginLeft: '10px' }}>Detail Report Track: {form?.tracks.name}</h2>
            <h3 style={{ marginTop: '40px' }}>Report Title</h3>
            <StyledTextField fullWidth id='fullWidth' value={form?.subject} sx={{ marginTop: '5px', pointerEvents: 'none' }} />
            <h3 style={{ marginTop: '20px' }}>Reason</h3>
            <div className='userInfo'>
              <div className='info'>
                <FormGroup sx={{ color: 'white' }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isReasonChecked('Copyright infringement')}
                        sx={{
                          'color': 'white',
                          '&.Mui-checked': { color: 'var(--main-color)' }
                        }}
                      />
                    }
                    label='Copyright infringement'
                    sx={{ color: 'white', pointerEvents: 'none' }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isReasonChecked('Pornographic content')}
                        sx={{
                          'color': 'white',
                          '&.Mui-checked': { color: 'var(--main-color)' }
                        }}
                      />
                    }
                    label='Pornographic content'
                    sx={{ color: 'white', pointerEvents: 'none' }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isReasonChecked('Hate speech')}
                        sx={{
                          'color': 'white',
                          '&.Mui-checked': { color: 'var(--main-color)' }
                        }}
                      />
                    }
                    label='Hate speech'
                    sx={{ color: 'white', pointerEvents: 'none' }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isReasonChecked('Content appears on wrong profile')}
                        sx={{
                          'color': 'white',
                          '&.Mui-checked': { color: 'var(--main-color)' }
                        }}
                      />
                    }
                    label='Content appears on wrong profile'
                    sx={{ color: 'white', pointerEvents: 'none' }}
                  />
                </FormGroup>
              </div>
              <div className='info'>
                <FormGroup sx={{ color: 'white' }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isReasonChecked('Privacy violation')}
                        sx={{
                          'color': 'white',
                          '&.Mui-checked': { color: 'var(--main-color)' }
                        }}
                      />
                    }
                    label='Privacy violation'
                    sx={{ color: 'white', pointerEvents: 'none' }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isReasonChecked('Abuse')}
                        sx={{
                          'color': 'white',
                          '&.Mui-checked': { color: 'var(--main-color)' }
                        }}
                      />
                    }
                    label='Abuse'
                    sx={{ color: 'white', pointerEvents: 'none' }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isReasonChecked('Illegal content')}
                        sx={{
                          'color': 'white',
                          '&.Mui-checked': { color: 'var(--main-color)' }
                        }}
                      />
                    }
                    label='Illegal content'
                    sx={{ color: 'white', pointerEvents: 'none' }}
                  />
                </FormGroup>
              </div>
            </div>
            <h3>Report Description</h3>
            <StyledTextField fullWidth id='fullWidth' multiline rows={6} sx={{ marginTop: '5px', pointerEvents: 'none' }} value={form?.body} />
            <h3 style={{ marginTop: '20px' }}>Audio Player</h3>
            <div style={{ padding: '10px 15px', color: 'white', display: 'flex' }}>
              <audio ref={audioRef} src={form?.path_audio} />
              <div style={{ display: 'flex', width: '100%', alignContent: 'center' }}>
                <div onClick={togglePlay} style={{ cursor: 'pointer' }}>
                  {paused ? (
                    <PlayArrowRounded style={{ fontSize: '1.5rem', color: 'var(--main-color)' }} />
                  ) : (
                    <PauseRounded style={{ fontSize: '1.5rem', color: 'var(--main-color)' }} />
                  )}
                </div>

                <div style={{ width: 'calc( 100% - 40px)', marginLeft: '10px' }}>
                  <Slider
                    value={position}
                    min={0}
                    max={duration}
                    onChange={(_, value) => {
                      setPosition(value as number)
                      if (audioRef.current) {
                        audioRef.current.currentTime = value as number
                      }
                    }}
                    sx={{
                      'color': 'var(--main-color)',
                      'height': 4,
                      '& .MuiSlider-thumb': { width: 8, height: 8 }
                    }}
                  />
                </div>
              </div>

              {/* <p>
            {Math.floor(position)}s / {Math.floor(duration)}s
          </p> */}
            </div>

            <h3 style={{ marginTop: '20px' }}>Available Images</h3>
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              {images.map((image, index) => (
                <div
                  key={index}
                  style={{
                    cursor: 'pointer',
                    height: '100px',
                    border: selectedImage === image ? '3px solid var(--main-color)' : '2px solid transparent',
                    borderRadius: '8px'
                  }}
                  onClick={() => setSelectedImage(image)}
                  onBlur={() => setSelectedImage(null)}
                >
                  <img src={image} alt={`Image ${index + 1}`} style={{ height: '100%', objectFit: 'cover', borderRadius: '5px', padding: '0px' }} />
                </div>
              ))}
            </div>
            {selectedImage && (
              <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <img src={selectedImage} alt='Selected' style={{ height: '500px', borderRadius: '8px' }} />
              </div>
            )}
            <FormControlLabel
              control={
                <Checkbox
                  sx={{
                    'color': 'white',
                    '&.Mui-checked': { color: 'var(--main-color)' }
                  }}
                  checked={disagree}
                  onChange={handleCheckboxChange}
                />
              }
              label='Disagree'
              sx={{
                color: 'white',
                marginTop: '10px',
                pointerEvents: isPending ? 'auto' : 'none'
              }}
            />
            {disagree && (
              <StyledTextField
                fullWidth
                id='fullWidth'
                multiline
                rows={2}
                value={desc}
                onChange={handleChange}
                sx={{
                  pointerEvents: isPending ? 'auto' : 'none'
                }}
              />
            )}
            {isPending ? (
              <>
                <Button
                  variant='contained'
                  onClick={handleClickOpenAlert}
                  // disabled={loading}
                  sx={{
                    'width': '150px',
                    'backgroundColor': 'var(--main-color)',
                    'padding': 1,
                    'borderRadius': '25px',
                    '&:hover': {
                      backgroundColor: 'var(--main-color)',
                      transform: 'scale(1.04)'
                    },
                    '&.Mui-disabled': {
                      backgroundColor: '#b0b0b0',
                      color: '#ffffff'
                    }
                  }}
                >
                  {/* {loading ? 'Updating...' : 'Update'} */}Submit
                </Button>
                <Dialog open={open} onClose={handleCloseAlert} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
                  <DialogTitle id='alert-dialog-title' sx={{ color: 'var(--main-text-color)', backgroundColor: 'var(--secondary-background-color)' }}>
                    Do you want to submit?
                  </DialogTitle>
                  <DialogActions sx={{ backgroundColor: 'var(--secondary-background-color)' }}>
                    <Button
                      onClick={handleCloseAlert}
                      sx={{
                        'color': 'var(--main-color)',
                        '&:hover': {
                          backgroundColor: 'transparent',
                          transform: 'scale(1.1)'
                        }
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleUpdateReport}
                      sx={{
                        'color': 'var(--main-color)',
                        '&:hover': {
                          backgroundColor: 'transparent',
                          transform: 'scale(1.1)'
                        }
                      }}
                      autoFocus
                    >
                      Confirm
                    </Button>
                  </DialogActions>
                </Dialog>
              </>
            ) : (
              <>
                <Button
                  variant='contained'
                  onClick={handleClose}
                  sx={{
                    'width': '150px',
                    'backgroundColor': 'var(--main-color)',
                    'padding': 1,
                    'borderRadius': '25px',
                    '&:hover': {
                      backgroundColor: 'var(--main-color)',
                      transform: 'scale(1.04)'
                    },
                    '&.Mui-disabled': {
                      backgroundColor: '#b0b0b0',
                      color: '#ffffff'
                    }
                  }}
                >
                  Cancel
                </Button>
              </>
            )}

            <Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })} open={loading}>
              <CircularProgress color='inherit' />
            </Backdrop>
          </div>
        )}
      </div>
    </div>
  )
}

export default DetailReport
