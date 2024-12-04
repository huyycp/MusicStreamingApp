import { useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useUser } from '~/hooks/useUser'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import CircularProgress from '@mui/material/CircularProgress'
import useUpdateProfile from '~/hooks/User/useUpdateProfile'

export default function PayOSCancel() {
  const searchParams = new URLSearchParams(window.location.search)
  const cancelStatus = searchParams.get('cancel') === 'true'
  const orderCode = searchParams.get('orderCode') || ''
  const { user } = useUser()
  const { mutate: updateProfileMutation, isPending, isError } = useUpdateProfile()

  const transactionMessage = cancelStatus ? 'Giao dịch đã bị hủy.' : 'Giao dịch thành công'

  const amount = (50000).toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND'
  })

  useEffect(() => {
    if (!cancelStatus && orderCode) {
      updateProfileMutation({ premium: true })
      if (user) {
        user.premium = true
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cancelStatus, orderCode])

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
      {isPending ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Typography variant='h4' color={isError ? 'error' : cancelStatus ? 'error' : 'success'} gutterBottom align='center' fontWeight='bold'>
            {isError ? 'Đã xảy ra lỗi' : cancelStatus ? 'Giao dịch bị hủy' : 'Giao dịch thành công'}
          </Typography>

          {cancelStatus && (
            <Typography variant='body1' color='error' align='center' gutterBottom>
              Giao dịch với mã đơn hàng {orderCode} đã bị hủy. Lý do: {transactionMessage}
            </Typography>
          )}

          {!cancelStatus && !isError && (
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
            {(cancelStatus || isError) && (
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
        </>
      )}
    </Box>
  )
}
