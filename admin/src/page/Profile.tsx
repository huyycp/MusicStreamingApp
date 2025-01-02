import './Profile.css'
import React, { useEffect, useState } from 'react'
import { CameraAltOutlined, Close } from '@mui/icons-material'
import './UserCard.css'
import { useNavigate } from 'react-router-dom'
import { TextField } from '@mui/material'
import styled from 'styled-components'

const StyledTextField = styled(TextField)({
  '& .MuiInputBase-root': {
    color: 'white',
    pointerEvents: 'none'
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
    borderBottomColor: 'var(--main-color)'
  },
  '& .MuiInput-underline:hover:before': {
    borderBottomColor: 'white !important'
  },
  '&.Mui-disabled .MuiInputBase-input': {
    WebkitTextFillColor: 'white'
  }
})

const usercard = {
  result: {
    _id: '66dd6663a528384a3ca4a194',
    role: 1,
    name: 'Anh',
    email: 'disinob@coffeepancakewafflebacon.com',
    gender: 'Male',
    created_at: new Date('2024-09-08T08:54:59.664Z'),
    updated_at: new Date('2024-09-08T08:54:59.664Z'),
    verify: 0,
    avatar: '',
    genres: [
      {
        _id: '67132292b449f85750348404',
        name: 'Country',
        image: 'https://thesouthtexan.com/wp-content/uploads/2023/12/149232937_country-music.jpg'
      },
      {
        _id: '67132292b449f85750348406',
        name: 'Indie',
        image: 'https://r.tourboxtech.com/file/202306/Tame-Impala-band.jpg'
      }
    ]
  }
}

const Profile = () => {
  const [formValues, setFormValues] = useState({
    id: '',
    name: '',
    role: '',
    status: '',
    email: '',
    gender: '',
    genres: '',
    createdAt: '',
    updatedAt: ''
  })
  useEffect(() => {
    setFormValues({
      id: usercard.result._id,
      name: usercard.result.name,
      role: usercard.result.role === 0 ? 'Listener' : usercard.result.role === 1 ? 'Artist' : 'Admin',
      status: usercard.result.verify === 0 ? 'Active' : 'Baned',
      email: usercard.result.email,
      gender: usercard.result.gender,
      genres: usercard.result.genres.map((genre) => genre.name).join(', '),
      createdAt: new Date(usercard?.result.created_at).toLocaleDateString(),
      updatedAt: new Date(usercard.result.updated_at).toLocaleDateString()
    })
  }, [])

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [field]: event.target.value
    })
  }

  const navigate = useNavigate()

  //   const [usercard, setUserCard] = useState<IUserCard>()
  //   const fetchUserCard = async () => {
  //     try {
  //       const response = await apiGetUserCard(id)
  //       if (!response.result) {
  //         throw new Error('Network response was not ok')
  //       }
  //       setUserCard(response)
  //       setRole(response.result.role)
  //       setVerify(response.result.verify)
  //     } catch (error) {
  //       console.error('Error fetching users:', error)
  //     }
  //   }

  //   useEffect(() => {
  //     fetchUserCard()
  //   }, [])

  const handleClose = () => {
    navigate('/user')
  }

  //   const location = useLocation()
  //   const { id } = location.state as { id: string }

  // const handleUpdateUser = async (): Promise<void> => {
  // try {
  //   if (role !== undefined && verify !== undefined) {
  //     const response = await apiUpdateUser(id, {
  //       role: role.toString(),
  //       verify: verify.toString()
  //     })
  //     console.log('User updated successfully:', response.message)
  //     navigate('/user')
  //   }
  // } catch (err) {
  //   console.error('Error updating user:', err)
  // }
  //   alert(JSON.stringify(formValues, null, 2))
  // }

  return (
    <div className='background'>
      <div className='usercard'>
        <h2>Profile</h2>
        <div className='close'>
          <Close onClick={handleClose} style={{ cursor: 'pointer' }} />
        </div>

        <div className='profileAvatar'>
          <div>
            <div className='avatar'>
              <img src='/src/assets/img/img2.jpg' alt='User Avatar' />
              <div className='camera'>
                <CameraAltOutlined sx={{ width: '20px', color: 'var(--main-color)' }}></CameraAltOutlined>
              </div>
            </div>
            <div className='profileAvatar'>
              <h3 style={{ margin: '0px' }}>{usercard.result.name}</h3>
            </div>
          </div>
        </div>

        <div className='userInfo'>
          <div className='info'>
            <div className='rowdata'>
              <StyledTextField
                fullWidth
                id='fullWidth'
                label='Name'
                variant='standard'
                value={formValues.name}
                onChange={handleInputChange('name')}
              />
            </div>

            <div className='rowdata'>
              <StyledTextField
                fullWidth
                id='fullWidth'
                label='Email'
                variant='standard'
                value={formValues.email}
                onChange={handleInputChange('email')}
              />
            </div>
            <div className='rowdata'>
              <StyledTextField
                fullWidth
                id='fullWidth'
                label='Gender'
                variant='standard'
                value={formValues.gender}
                onChange={handleInputChange('gender')}
              />
            </div>
          </div>
          <div className='info'>
            <div className='rowdata'>
              <StyledTextField
                fullWidth
                id='fullWidth'
                label='Role'
                variant='standard'
                value={formValues.role}
                onChange={handleInputChange('role')}
              />
            </div>
            <div className='rowdata'>
              <StyledTextField
                fullWidth
                id='fullWidth'
                label='Status'
                variant='standard'
                value={formValues.status}
                onChange={handleInputChange('status')}
              />
            </div>
            <div className='rowdata'>
              <StyledTextField
                fullWidth
                id='fullWidth'
                label='Genres'
                variant='standard'
                value={formValues.genres}
                onChange={handleInputChange('genres')}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
