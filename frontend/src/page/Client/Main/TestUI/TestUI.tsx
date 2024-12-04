import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { FacebookShareButton } from 'react-share'

export default function TestUI() {
  return (
    <div>
      <FacebookShareButton url='https://magic-music-dut.vercel.app/' hashtag='Cùng tận hưởng âm nhạc cùng https://magic-music-dut.vercel.app/'>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#4267B2', // Màu nền
            color: 'white', // Màu chữ
            borderRadius: '8px', // Bo tròn
            padding: '8px 12px', // Khoảng cách bên trong
            cursor: 'pointer'
          }}
        >
          <Typography sx={{ fontSize: 14, fontWeight: 500, marginRight: '8px' }}>Chia sẻ</Typography>
          <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='white'>
            <path d='M22.675 0h-21.35c-.729 0-1.325.596-1.325 1.325v21.351c0 .729.596 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.672c0-3.1 1.894-4.787 4.659-4.787 1.325 0 2.462.099 2.792.143v3.24l-1.916.001c-1.504 0-1.794.715-1.794 1.763v2.312h3.587l-.467 3.622h-3.12v9.293h6.116c.729 0 1.324-.595 1.324-1.324v-21.35c0-.729-.595-1.325-1.324-1.325z' />
          </svg>
        </Box>
      </FacebookShareButton>
    </div>
  )
}
