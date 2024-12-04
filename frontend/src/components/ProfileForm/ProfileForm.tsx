import Box from '@mui/material/Box'
import ProfileHeader from './ProfileHeader/ProfileHeader'
import { useUser } from '~/hooks/useUser'

export default function ProfileForm() {
  const { user } = useUser()

  if (!user) {
    window.location.href = '/login'
  }
  return (
    <Box sx={{ width: '100%', pl: '-18px', pr: '-18px' }}>
      <ProfileHeader />
    </Box>
  )
}
