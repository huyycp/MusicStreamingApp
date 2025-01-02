import Box from '@mui/material/Box'
import ProfileHeader from './ProfileHeader/ProfileHeader'
import { useUser } from '~/hooks/useUser'
import { useFavorite } from '~/hooks/useFavorite'
import ListArtist from '../Artist/ListArtist'
import { useNavigate } from 'react-router-dom'

export default function ProfileForm() {
  const { user } = useUser()
  const { followUsers } = useFavorite()
  const navigate = useNavigate()

  if (!user) {
    window.location.href = '/login'
  }

  const handleNavigate = () => {
    navigate('/artist/follow')
  }

  return (
    <Box sx={{ width: '100%', pl: '-18px', pr: '-18px' }}>
      <ProfileHeader />
      {followUsers && followUsers.length > 0 && (
        <ListArtist artists={followUsers} title='Nghệ sĩ đã theo dõi' isPending={false} handleNavigate={handleNavigate} />
      )}
    </Box>
  )
}
