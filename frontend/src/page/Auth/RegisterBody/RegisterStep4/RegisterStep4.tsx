import Box from '@mui/material/Box'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress'
import { styled } from '@mui/material/styles'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import FormHelperText from '@mui/material/FormHelperText'
import CircularProgress from '@mui/material/CircularProgress'
import useRegister from '~/hooks/Auth/useRegister'
import AuthGenres from '~/components/MusicGenres/AuthGenres'

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 2,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.neutral.neutral1
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.primary.main
  }
}))

export default function RegisterStep4() {
  const location = useLocation()
  const navigate = useNavigate()
  const { getOTP, error, isPending } = useRegister()
  const email = location.state?.email as string
  const password = location.state?.password as string
  const gender = location.state?.gender as string
  const name = location.state?.name as string
  const role = location.state?.role as string
  const type = location.state?.type as string

  const [activeGenres, setActiveGenres] = useState<string[]>([])

  useEffect(() => {
    document.title = 'Magic Music - Đăng ký: Bước 4'
  }, [])

  useEffect(() => {
    if (!email || !password || !name || !gender || !role) navigate('/register')
  }, [email, password, name, gender, navigate, role])

  const handleNext = async () => {
    getOTP(
      { email },
      {
        onSuccess: () => {
          navigate('/register/verify-email', { state: { email, password, name, gender, role, listGenres: activeGenres, type } })
        }
      }
    )
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
      <BorderLinearProgress variant='determinate' value={Math.floor((4 / 4) * 100)} sx={{ width: '100%', mt: 0.5 }} />
      <Box sx={{ width: '100%', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'start', gap: 1 }}>
        <ArrowBackIosNewIcon
          sx={{
            'cursor': 'pointer',
            'height': '100%',
            'width': '56px',
            'padding': '16px',
            'color': (theme) => theme.palette.neutral.neutral2,
            '&:hover': {
              color: (theme) => theme.palette.secondary4.main
            }
          }}
          onClick={() => {
            if (!isPending) {
              navigate('/register/step3', { state: { email, password, name, gender } })
            }
          }}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, fontSize: 14, pb: 3 }}>
          <Box sx={{ color: (theme) => theme.palette.neutral.neutral1 }}>Bước 4/4</Box>
          <Box sx={{ color: (theme) => theme.palette.secondary4.main, fontWeight: 'bold' }}>Thể loại yêu thích của bản là gì</Box>
        </Box>
      </Box>

      <FormControl sx={{ width: '100%', pb: 2, pl: 5, pr: 5 }}>
        <Box sx={{ fontSize: 14, fontWeight: 'bold', pt: 2 }}>Sở thích</Box>
        <Box sx={{ fontSize: 13, pb: 1, color: (theme) => theme.palette.neutral.neutral1 }}>
          Thể loại bạn thích giúp chúng tôi cung cấp các sản phẩm phù hợp cho bạn.
        </Box>

        <AuthGenres activeGenres={activeGenres} setActiveGenres={setActiveGenres} />

        {error && (
          <Box sx={{ pt: 1 }}>
            <FormHelperText
              sx={{
                fontSize: 12,
                m: 'unset',
                pb: 2,
                color: 'red',
                display: 'flex',
                alignItems: 'start',
                justifyContent: 'start',
                gap: 0.5
              }}
            >
              <ErrorOutlineIcon sx={{ fontSize: 20 }} />
              Lỗi: {error}
            </FormHelperText>
          </Box>
        )}

        {!isPending && (
          <Button sx={{ width: '100%', fontSize: 14, fontWeight: 'bold', mt: 3 }} variant='contained' onClick={handleNext}>
            Đăng Ký
          </Button>
        )}
        {isPending && <CircularProgress color='success' />}
      </FormControl>
    </Box>
  )
}
