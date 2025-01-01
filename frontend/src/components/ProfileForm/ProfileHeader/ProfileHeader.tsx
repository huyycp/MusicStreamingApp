import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useUser } from '~/hooks/useUser'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined'
import { useState } from 'react'
import ProfileModal from './ProfileModal/ProfileModal'

const ProfileHeader = () => {
  const { user } = useUser()
  const [isHovered, setIsHovered] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <Box
      sx={{
        ml: '-18px',
        mr: '-18px',
        minHeight: '250px',
        maxHeight: '340px',
        background: (theme) => `linear-gradient(to top, ${theme.palette.secondary5.main}, ${theme.palette.neutral.neutral3})`,
        padding: '20px',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '20px'
      }}
    >
      <Box
        sx={{
          width: 180,
          height: 180,
          borderRadius: '100%',
          backgroundColor: '#333',
          backgroundImage: user?.avatar ? `url(${user.avatar})` : 'none',
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
        onClick={() => setIsModalOpen(true)}
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

      <Box>
        <Typography
          variant='subtitle2'
          sx={{
            color: (theme) => theme.palette.secondary4.main,
            fontSize: '0.875rem',
            marginBottom: '4px'
          }}
        >
          Hồ sơ
        </Typography>

        <Typography
          noWrap
          variant='h3'
          sx={{
            cursor: 'pointer',
            color: (theme) => theme.palette.secondary4.main,
            fontWeight: 'bold',
            marginBottom: '4px'
          }}
          onClick={() => setIsModalOpen(true)}
        >
          {user?.name || 'Không xác định'}
        </Typography>

        <Typography
          sx={{
            color: (theme) => theme.palette.neutral.neutral1,
            fontSize: '0.875rem',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          • {user?.number_of_followers} đang theo dõi
        </Typography>
      </Box>
      {user && <ProfileModal open={isModalOpen} onClose={() => setIsModalOpen(false)} initialValue={user?.name} user={user} />}
    </Box>
  )
}

export default ProfileHeader
