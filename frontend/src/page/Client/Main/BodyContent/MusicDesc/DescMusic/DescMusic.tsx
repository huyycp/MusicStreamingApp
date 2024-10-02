import Box from '@mui/material/Box'
import DescTitle from './DescTitle/DescTitle'

export default function DescMusic() {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        maxHeight: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflowY: 'scroll'
      }}
    >
      <Box
        sx={{
          position: 'sticky',
          top: 0, // Giữ ở vị trí đầu tiên
          backgroundColor: 'white', // Thêm màu nền nếu cần
          zIndex: 1 // Đảm bảo không bị che khuất
        }}
      >
        <DescTitle />
      </Box>
    </Box>
  )
}
