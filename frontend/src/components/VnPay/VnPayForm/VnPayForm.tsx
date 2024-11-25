import { FormEvent, useState } from 'react'
import CryptoJS from 'crypto-js'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import SvgIcon from '@mui/material/SvgIcon'
import MusicIcon from '~/assets/icon/MusicIcon2.svg?react'
import Divider from '@mui/material/Divider'

interface VnPayFormProps {
  defaultOrderDetails?: string
  defaultAmount?: number
  returnUrl?: string
}

function VnPayForm({
  defaultOrderDetails = 'Premium',
  defaultAmount = 50000,
  returnUrl = `${window.location.origin}/payment/return`
}: VnPayFormProps) {
  const [loading, setLoading] = useState(false)

  const generateVnPaySignature = (data: Record<string, string | number>, secretKey: string): string => {
    const sortedKeys = Object.keys(data)
      .filter((key) => key !== 'vnp_SecureHash' && key !== 'vnp_SecureHashType')
      .sort()

    const queryString = sortedKeys.map((key) => `${key}=${encodeURIComponent(String(data[key]))}`).join('&')

    return CryptoJS.HmacSHA512(queryString, secretKey).toString(CryptoJS.enc.Hex).toLowerCase()
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setLoading(true)

    try {
      const tmnCode = import.meta.env.VITE_VNPAY_TMNCODE
      const secretKey = import.meta.env.VITE_VNPAY_SECRET_KEY
      const paymentUrl = import.meta.env.VITE_VNPAY_PAYMENT_URL

      if (!tmnCode || !secretKey || !paymentUrl) {
        throw new Error('Thiếu cấu hình VnPay')
      }

      const paymentData = {
        vnp_Version: '2.1.0',
        vnp_Command: 'pay',
        vnp_TmnCode: tmnCode,
        vnp_Amount: defaultAmount * 100,
        vnp_CreateDate: new Date()
          .toLocaleString('sv', { timeZone: 'Asia/Ho_Chi_Minh' })
          .replace(/[-:T.\s]/g, '')
          .slice(0, 14),
        vnp_CurrCode: 'VND',
        vnp_IpAddr: '127.0.0.1',
        vnp_Locale: 'vn',
        vnp_OrderInfo: defaultOrderDetails,
        vnp_OrderType: 'other',
        vnp_ReturnUrl: returnUrl,
        vnp_TxnRef: Math.floor(Math.random() * 100000).toString(),
        vnp_ExpireDate: new Date(new Date().getTime() + 15 * 60 * 1000)
          .toLocaleString('sv', { timeZone: 'Asia/Ho_Chi_Minh' })
          .replace(/[-:T.\s]/g, '')
          .slice(0, 14)
      }

      const secureHash = generateVnPaySignature(paymentData, secretKey)

      const paymentUrlObject = new URL(paymentUrl)
      Object.entries(paymentData).forEach(([key, value]) => {
        paymentUrlObject.searchParams.append(key, String(value))
      })
      paymentUrlObject.searchParams.append('vnp_SecureHash', secureHash)

      window.location.href = paymentUrlObject.toString()
    } catch {
      alert('Có lỗi xảy ra trong quá trình thanh toán')
    } finally {
      setLoading(false)
    }
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

export default VnPayForm
