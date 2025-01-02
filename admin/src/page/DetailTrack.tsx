import { Close, PlayArrowRounded, PauseRounded, ChangeCircleOutlined } from '@mui/icons-material'
import { TextField, Slider, Button, Dialog, DialogTitle, DialogActions, Backdrop, CircularProgress } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import { apiGetDetailTrack, apiUpdateTrack } from '../Auth/TrackModerationAPI'
import { ResultDetailTrack } from '../type/ITrackModeration'
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

const DetailTrack = () => {
  const [form, setForm] = useState<ResultDetailTrack | null>(null)
  const [paused, setPaused] = useState(true)
  const [position, setPosition] = useState(0)
  const [duration, setDuration] = useState(0)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<number>(0)
  const [CheckStatus, setCheckStatus] = useState<number>(0)
  const [open, setOpen] = React.useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const location = useLocation()
  const { idtrack, idab, iduser } = location.state as { idtrack: string; idab: string; iduser: string }
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

  const fetchDetailTrack = async () => {
    try {
      setIsLoading(true)
      const response = await apiGetDetailTrack(idtrack)
      if (!response.result) {
        throw new Error('Network response was not ok')
      }
      setForm(response.result)
      setStatus(response.result.status === 'pending' ? 2 : response.result.status === 'active' ? 0 : 1)
      setCheckStatus(response.result.status === 'pending' ? 2 : response.result.status === 'active' ? 0 : 1)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching users:', error)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    fetchDetailTrack()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

  const handleClose = () => {
    navigate(idab ? '/user/card/detailalbum' : '/track', idab ? { state: { iduser, idab } } : undefined)
  }

  const handleClickOpenAlert = () => {
    setOpen(true)
  }

  const handleCloseAlert = () => {
    setOpen(false)
  }

  const handleUpdateStatusTrack = async (): Promise<void> => {
    handleCloseAlert()
    if (status === CheckStatus) {
      toast.error('Please change the track status.')
      return
    }
    try {
      setLoading(true)

      if (status !== undefined) {
        const response = await apiUpdateTrack(idtrack, {
          status: status === 0 ? 'active' : 'banned'
        })

        if (response.message === 'Update status track success') {
          toast.success('Track approved successfully!')
          navigate(idab ? '/user/card/detailalbum' : '/track', idab ? { state: { iduser, idab } } : undefined)
        } else {
          toast.error('Failed to approve track. Please try again.')
        }
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Error updating user:', err)
      toast.error('Failed to approve track. Please try again.')
    } finally {
      setLoading(false)
    }
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
            <h2 style={{ marginLeft: '10px' }}>Detail Track</h2>
            <div className='user'>
              <div>
                <img src={form?.image} alt='User Avatar' style={{ height: '200px', borderRadius: '8px', marginTop: '40px', marginLeft: '40px' }} />
              </div>
              <div style={{ marginLeft: '30px' }}>
                <div className='name' style={{ marginBottom: '20px' }}>
                  <p style={{ fontSize: '30px' }}>
                    <b>{form?.name}</b>
                  </p>
                  <div className='status'>
                    {status === 1 ? (
                      <div style={{ backgroundColor: 'red' }}>Banned</div>
                    ) : status === 2 ? (
                      <div style={{ backgroundColor: '#EEAD0E' }}>Pending</div>
                    ) : (
                      <div style={{ backgroundColor: 'green' }}>Active</div>
                    )}
                    <ChangeCircleOutlined
                      onClick={() => setStatus(status === 0 ? 1 : 0)}
                      style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                    />
                  </div>
                </div>
                <p>
                  <strong>Genres:</strong> {form?.genre.name}
                </p>
                <p>
                  <strong>Owners:</strong>{' '}
                  {Array.isArray(form?.owners) && form?.owners.length > 0 ? form?.owners.map((owner) => owner.name).join(', ') : 'Null'}
                </p>
                <p>
                  <strong>Created at:</strong> {form?.created_at ? new Date(form.created_at).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </div>
            <h3 style={{ marginTop: '40px' }}>Description</h3>
            <StyledTextField fullWidth id='fullWidth' value={form?.description} sx={{ marginTop: '5px', pointerEvents: 'none' }} />

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
            </div>
            <h3>Lyrics</h3>
            <StyledTextField fullWidth id='fullWidth' multiline rows={6} sx={{ marginTop: '5px', pointerEvents: 'none' }} value={form?.lyrics} />

            <Button
              variant='contained'
              onClick={handleClickOpenAlert}
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
              Submit
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
                  onClick={handleUpdateStatusTrack}
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
            <Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })} open={loading}>
              <CircularProgress color='inherit' />
            </Backdrop>
          </div>
        )}
      </div>
    </div>
  )
}

export default DetailTrack
