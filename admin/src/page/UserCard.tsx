import React, { useEffect, useState } from 'react'
import { ChangeCircleOutlined, Close, ModeEditOutlineOutlined } from '@mui/icons-material'
import './UserCard.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { apiGetUserCard, apiUpdateUser } from '../Auth/UserCardAPI'
import { ResultUserCard } from '../type/IUserCard'
import UserAlbums from './UserAlbums'
import styled from 'styled-components'
import { Backdrop, Button, CircularProgress, DialogActions, DialogTitle, TextField } from '@mui/material'
import Loader from '../components/Loader/Loader'
import { toast } from 'react-toastify'
import Dialog from '@mui/material/Dialog'

const StyledTextField = styled(TextField)({
  '& .MuiInputBase-root': {
    color: 'white'
  },
  '& .MuiInputLabel-root': {
    color: 'var(--main-color)'
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: 'white'
  },
  '& .MuiInput-underline:before': {
    borderBottomColor: 'var(--main-color)'
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'white'
  },
  '& .MuiInput-underline:hover:before': {
    borderBottomColor: 'white !important'
  },
  '&.Mui-disabled .MuiInputBase-input': {
    WebkitTextFillColor: 'white'
  }
})

const UserCard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [role, setRole] = useState<number>()
  const [verify, setVerify] = useState<number>(0)
  const [CheckStatus, setCheckStatus] = useState<number>(0)
  const [isSubRoleVisible, setIsSubRoleVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = React.useState(false)

  const navigate = useNavigate()

  const [usercard, setUserCard] = useState<ResultUserCard>()
  const fetchUserCard = async () => {
    try {
      setIsLoading(true)
      const response = await apiGetUserCard(iduser)
      if (!response.result) {
        throw new Error('Network response was not ok')
      }
      setUserCard(response.result)
      setRole(response.result.role)
      setVerify(response.result.verify)
      setCheckStatus(verify)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching users:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUserCard()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const location = useLocation()
  const { iduser, page, limit } = location.state as { iduser: string; page: number; limit: number }

  const handleClose = () => {
    navigate(`/user?page=${page}`, { state: { limit } })
  }

  const handleUpdateUser = async (): Promise<void> => {
    handleCloseAlert()
    if (verify === CheckStatus) {
      toast.error('Please change the user status.')
      return
    }
    try {
      setLoading(true)

      if (role !== undefined && verify !== undefined) {
        const response = await apiUpdateUser(iduser, {
          role: role.toString(),
          verify: verify.toString()
        })

        if (response.message === 'Update user success') {
          toast.success('User updated successfully!')
          navigate('/user')
        } else {
          toast.error('Failed to update user. Please try again.')
        }
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Error updating user:', err)
      toast.error('An error occurred while updating the user.')
    } finally {
      setLoading(false)
    }
  }

  const handleEditClick = () => {
    setIsSubRoleVisible(!isSubRoleVisible)
  }

  const handleRoleChange = (newRole: number) => {
    setRole(newRole)
    setIsSubRoleVisible(false)
  }

  const handleClickOpenAlert = () => {
    setOpen(true)
  }

  const handleCloseAlert = () => {
    setOpen(false)
  }

  return (
    <div className='popup'>
      <div className='popup-inner'>
        <div className='usercard'>
          <div className='close'>
            <Close onClick={handleClose} style={{ cursor: 'pointer' }} />
          </div>
          {isLoading ? (
            <Loader />
          ) : (
            <div>
              <div className='user'>
                <div className='user-avatar'>
                  <img src='/src/assets/img/img2.jpg' alt='User Avatar' />
                </div>
                <div>
                  <div className='name'>
                    <h3 className='name'>{usercard?.name}</h3>
                    <div className='status'>
                      {verify ? <div style={{ backgroundColor: 'red' }}>Banned</div> : <div style={{ backgroundColor: 'green' }}>Active</div>}
                      {usercard?.role !== 2 ? (
                        <ChangeCircleOutlined
                          onClick={() => setVerify(verify === 0 ? 1 : 0)}
                          style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                        />
                      ) : null}
                    </div>
                  </div>
                  <div className='role'>
                    <p>
                      {role === 0 ? 'Listener' : role === 1 ? 'Artist' : 'Admin'}
                      {usercard?.role !== 2 ? (
                        <ModeEditOutlineOutlined
                          onClick={handleEditClick}
                          style={{ width: '20px', height: '20px', marginLeft: '4px', cursor: 'pointer' }}
                        />
                      ) : null}
                    </p>

                    {isSubRoleVisible && (
                      <ul className='sub-role'>
                        {role !== 0 && <li onClick={() => handleRoleChange(0)}>Listener</li>}
                        {role !== 1 && <li onClick={() => handleRoleChange(1)}>Artist</li>}
                        {role !== 2 && <li onClick={() => handleRoleChange(2)}>Admin</li>}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
              <div className='userInfo'>
                <div className='info'>
                  <div className='rowdata'>
                    <StyledTextField fullWidth id='fullWidth' label='Email' variant='standard' value={usercard?.email} />
                  </div>
                  <div className='rowdata'>
                    <StyledTextField fullWidth id='fullWidth' label='Gender' variant='standard' value={usercard?.gender} />
                  </div>
                  <div className='rowdata'>
                    <StyledTextField
                      fullWidth
                      id='fullWidth'
                      label='Genres'
                      variant='standard'
                      value={usercard?.genres.length ? usercard.genres.map((e) => e.name).join(', ') : 'Null'}
                    />
                  </div>
                </div>
                <div className='info'>
                  <div className='rowdata'>
                    <StyledTextField
                      fullWidth
                      id='fullWidth'
                      label='Created at'
                      variant='standard'
                      value={usercard?.created_at ? new Date(usercard?.created_at).toLocaleDateString() : 'N/A'}
                    />
                  </div>
                  <div className='rowdata'>
                    <StyledTextField
                      fullWidth
                      id='fullWidth'
                      label='Updated at'
                      variant='standard'
                      value={usercard?.updated_at ? new Date(usercard?.updated_at).toLocaleDateString() : 'N/A'}
                    />
                  </div>
                </div>
              </div>
              <Button
                variant='contained'
                onClick={handleClickOpenAlert}
                disabled={loading}
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
                {loading ? 'Updating...' : 'Update'}
              </Button>
              <Dialog open={open} onClose={handleCloseAlert} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
                <DialogTitle id='alert-dialog-title' sx={{ color: 'var(--main-text-color)', backgroundColor: 'var(--secondary-background-color)' }}>
                  Do you want to update?
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
                    onClick={handleUpdateUser}
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

        {usercard?.role !== 1 ? null : (
          <div className='userAlbums'>
            <UserAlbums iduser={iduser} />
          </div>
        )}
      </div>
    </div>
  )
}

export default UserCard
