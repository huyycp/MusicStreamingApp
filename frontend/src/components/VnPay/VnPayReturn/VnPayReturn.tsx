import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useUser } from '~/hooks/useUser'
import { RESPONSE_CODE, TRANSACTION_STATUS } from '~/utils/statusVnPay'

export default function VnPayReturn() {
  const searchParams = new URLSearchParams(window.location.search)
  const { user } = useUser()

  const paymentData: { [key: string]: string } = {}
  searchParams.forEach((value, key) => {
    paymentData[key] = value
  })

  const transactionStatus = paymentData['vnp_TransactionStatus'] as keyof typeof TRANSACTION_STATUS
  const responseCode = paymentData['vnp_ResponseCode'] as keyof typeof RESPONSE_CODE
  const amount = (parseInt(paymentData['vnp_Amount'] || '0', 10) / 100).toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND'
  })

  const transactionDate = new Date(
    new Date(
      Number(paymentData['vnp_PayDate'].slice(0, 4)),
      Number(paymentData['vnp_PayDate'].slice(4, 6)) - 1,
      Number(paymentData['vnp_PayDate'].slice(6, 8)),
      Number(paymentData['vnp_PayDate'].slice(8, 10)),
      Number(paymentData['vnp_PayDate'].slice(10, 12)),
      Number(paymentData['vnp_PayDate'].slice(12, 14))
    )
  ).toLocaleString('vi-VN')

  return (
    <Box
      sx={{
        'padding': 4,
        'backgroundColor': (theme) => theme.palette.neutral.neutral3,
        'borderRadius': 2,
        '& .MuiTableCell-root': {
          color: (theme) => theme.palette.secondary4.main
        }
      }}
    >
      <Typography variant='h4' color={transactionStatus === '00' ? 'green' : 'red'} gutterBottom align='center' fontWeight='bold'>
        {TRANSACTION_STATUS[transactionStatus] || 'Không xác định trạng thái giao dịch'}
      </Typography>

      {responseCode !== '00' && (
        <Typography variant='h6' color='red' gutterBottom align='center'>
          {RESPONSE_CODE[responseCode] || 'Không xác định phản hồi từ VNPAY'}
        </Typography>
      )}
      {responseCode === '00' && transactionStatus === '00' && (
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                  Họ và tên
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant='body2'>{user?.name}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                  Email
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant='body2'>{user?.email}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                  Số tiền đã trả
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant='body2'>{amount}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                  Ngày giờ giao dịch
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant='body2'>{transactionDate}</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}

      <Box sx={{ marginTop: 4, justifyContent: 'center', display: 'flex', flexDirection: 'row', gap: 2 }}>
        <Button
          variant='contained'
          color='primary'
          onClick={() => {
            window.location.href = '/'
          }}
        >
          Quay lại trang chủ
        </Button>
        {(responseCode !== '00' || transactionStatus !== '00') && (
          <Button
            variant='contained'
            color='secondary'
            onClick={() => {
              window.location.href = '/payment'
            }}
          >
            Quay lại trang thanh toán
          </Button>
        )}
      </Box>
    </Box>
  )
}
