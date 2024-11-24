import { FormEvent, useState } from 'react'
import CryptoJS from 'crypto-js'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import SvgIcon from '@mui/material/SvgIcon'
import MusicIcon from '~/assets/icon/MusicIcon2.svg?react'
import Divider from '@mui/material/Divider'

interface PayOSFormProps {
  defaultOrderCode?: string
  defaultAmount?: number
  returnUrl?: string
  cancelUrl?: string
}

function PayOSForm({
  defaultOrderCode = Math.floor(Math.random() * 100000).toString(),
  defaultAmount = 10000,
  returnUrl = `${window.location.origin}/payment/cancel`,
  cancelUrl = `${window.location.origin}/payment/cancel`
}: PayOSFormProps) {
  const [loading, setLoading] = useState(false)

  const generateSignature = (data: Record<string, string | number>, checkSum: string): string => {
    const sortedKeys = Object.keys(data).sort()
    const queryString = sortedKeys.map((key) => `${key}=${data[key]}`).join('&')
    return CryptoJS.HmacSHA256(queryString, checkSum).toString(CryptoJS.enc.Hex)
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setLoading(true)

    const clientId = import.meta.env.VITE_PAYOS_CLIENT_ID
    const secretKey = import.meta.env.VITE_PAYOS_SECRET_KEY
    const checkSum = import.meta.env.VITE_PAYOS_CHECKSUM_KEY
    const apiEndpoint = import.meta.env.VITE_PAYOS_API_URL

    if (!clientId || !secretKey || !apiEndpoint) {
      throw new Error('Thiếu cấu hình PayOS')
    }

    const paymentData = {
      orderCode: parseInt(defaultOrderCode),
      amount: defaultAmount,
      description: 'Premium',
      cancelUrl,
      returnUrl
    }

    const signature = generateSignature(paymentData, checkSum)
    const expiredAt: number = Math.floor(Date.now() / 1000) + 15 * 60
    const payload = { ...paymentData, expiredAt, signature }

    const response = await fetch(`${apiEndpoint}/payment-requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-client-id': clientId,
        'x-api-key': secretKey
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      throw new Error('Không thể tạo liên kết thanh toán')
    }

    const { data } = await response.json()
    window.location.href = data.checkoutUrl
  }

  return (
    <Box
      sx={{
        position: 'relative',
        padding: 2,
        borderRadius: 2,
        color: (theme) => theme.palette.secondary4.main,
        bgcolor: (theme) => theme.palette.neutral.neutral3
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          pl: 1,
          pt: 0.5,
          pr: 1,
          background: (theme) => theme.palette.gradient.gradient3,
          borderBottomRightRadius: 5,
          borderTopLeftRadius: 5,
          color: 'black',
          zIndex: 1,
          height: '32px'
        }}
      >
        <strong>
          50.000 <span style={{ fontSize: '0.8em', position: 'relative', top: '-4px' }}>₫</span> cho 1 tháng
        </strong>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: 3
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: 2
          }}
        >
          <SvgIcon
            component={MusicIcon}
            inheritViewBox
            sx={{ height: '24px', width: '24px', cursor: 'pointer', bgcolor: (theme) => theme.palette.neutral.neutral3 }}
          />
          <Typography variant='body2' sx={{ color: 'white', fontWeight: 'bold' }} noWrap>
            Magic Music
          </Typography>
        </Box>
        <Typography
          variant='h4'
          sx={{
            fontWeight: 'bold',
            background: (theme) => theme.palette.gradient.gradient3,
            WebkitBackgroundClip: 'text',
            color: 'transparent'
          }}
          noWrap
        >
          Premium
        </Typography>
        <Typography variant='body1' sx={{ marginBottom: 2 }}>
          <strong>
            50.000 <span style={{ fontSize: '0.8em', position: 'relative', top: '-4px' }}>₫</span> cho 1 tháng
          </strong>
        </Typography>
      </Box>
      <Divider sx={{ bgcolor: (theme) => theme.palette.neutral.neutral2, marginBottom: 2 }} />
      <ul style={{ fontWeight: 'bold', paddingLeft: '15px', marginLeft: 0 }}>
        <li>Tăng cường trải nghiệm nghe nhạc</li>
        <li>Sử dụng không giới hạn AI</li>
        <li>Download không giới hạn</li>
      </ul>
      <form onSubmit={handleSubmit}>
        <Button
          variant='contained'
          color='primary'
          type='submit'
          fullWidth
          sx={{
            'mt': 2,
            'background': (theme) => theme.palette.gradient.gradient3,
            '&:hover': {
              background: (theme) => theme.palette.gradient.gradient3,
              opacity: 0.8
            },
            'fontWeight': 'bold'
          }}
          disabled={loading}
        >
          {loading ? 'Đang xử lý...' : 'Mua Premium'}
        </Button>
      </form>
    </Box>
  )
}

export default PayOSForm
