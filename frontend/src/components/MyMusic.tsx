import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import MusicTable from './MusicTable'
import AlbumTable from './AlbumTable'
import useCheckUploadLimit from '~/hooks/User/useCheckUploadLimit'
import SelectedStatus, { Status } from './SelectedStatus/SelectedStatus'

export default function MyMusic() {
  const { checkUploadLimit } = useCheckUploadLimit()

  const [selectedTab, setSelectedTab] = useState<'songs' | 'albums'>('songs')
  const [selectedStatus, setSelectedStatus] = useState<Status>('all')

  const handleCreateTrack = () => {
    checkUploadLimit()
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', pt: 2, width: '100%', gap: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant='h3' noWrap>
          {selectedTab === 'songs' ? 'Bài hát của bạn' : 'Album của bạn'}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'end', gap: 1 }}>
          <Button variant='contained' startIcon={<AddIcon />} onClick={handleCreateTrack}>
            Tải nhạc lên
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, pt: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            onClick={() => setSelectedTab('songs')}
            sx={{
              'color': selectedTab === 'songs' ? 'white' : 'gray',
              'bgcolor': selectedTab === 'songs' ? 'primary.main' : 'transparent',
              'textDecoration': selectedTab === 'songs' ? 'underline' : 'none',
              '&:hover': {
                bgcolor: selectedTab === 'songs' ? 'primary.main' : 'transparent',
                color: 'white'
              }
            }}
          >
            Bài hát
          </Button>
          <Button
            onClick={() => setSelectedTab('albums')}
            sx={{
              'color': selectedTab === 'albums' ? 'white' : 'gray',
              'bgcolor': selectedTab === 'albums' ? 'primary.main' : 'transparent',
              'textDecoration': selectedTab === 'albums' ? 'underline' : 'none',
              '&:hover': {
                bgcolor: selectedTab === 'albums' ? 'primary.main' : 'transparent',
                color: 'white'
              }
            }}
          >
            Album
          </Button>
          {selectedTab === 'albums' && (
            <Button
              startIcon={<AddIcon />}
              sx={{
                'color': selectedTab === 'albums' ? 'white' : 'gray',
                'bgcolor': selectedTab === 'albums' ? 'primary.main' : 'transparent',
                'textDecoration': selectedTab === 'albums' ? 'underline' : 'none',
                '&:hover': {
                  bgcolor: selectedTab === 'albums' ? 'primary.main' : 'transparent',
                  color: 'white'
                }
              }}
              onClick={() => {
                window.location.href = '/create-album'
              }}
            >
              Tạo Album mới
            </Button>
          )}
        </Box>

        {selectedTab === 'songs' && <SelectedStatus selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} />}
      </Box>

      <Box sx={{ width: '100%', overflowY: 'auto' }}>
        {selectedTab === 'songs' && <MusicTable status={selectedStatus} />}
        {selectedTab === 'albums' && <AlbumTable />}
      </Box>
    </Box>
  )
}
