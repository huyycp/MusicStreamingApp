import Box from '@mui/material/Box'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress'
import { styled } from '@mui/material/styles'
import { ChangeEvent, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import artistGif from '~/assets/gif/artist.gif'
import listenerGif from '~/assets/gif/listener.gif'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import FormHelperText from '@mui/material/FormHelperText'
import Radio from '@mui/material/Radio'
import CircularProgress from '@mui/material/CircularProgress'
import useRegister from '~/hooks/Auth/useRegister'

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

const ImageRadio = styled('div')<{ selected: boolean }>(({ theme, selected }) => ({
  width: 100,
  height: 100,
  borderRadius: '5px',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundColor: selected ? theme.palette.primary.main : 'transparent',
  border: `2px solid ${selected ? theme.palette.primary.main : theme.palette.neutral.neutral1}`,
  cursor: 'pointer',
  transition: 'border 0.3s ease-in-out',
  appearance: 'none'
}))

export default function RegisterStep3() {
  const location = useLocation()
  const navigate = useNavigate()
  const { getOTP, error, isPending } = useRegister()
  const email = location.state?.email as string
  const password = location.state?.password as string
  const gender = location.state?.gender as string
  const name = location.state?.name as string

  const [errorCheck, setErrorCheck] = useState<boolean>(false)
  const [selectedValue, setSelectedValue] = useState('')

  useEffect(() => {
    document.title = 'Magic Music - Register: Step 3'
  }, [])

  useEffect(() => {
    if (!email || !password || !name || !gender) navigate('/register')
  }, [email, password, name, gender, navigate])

  const handleCheck = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value)
    setErrorCheck(false)
  }

  const handleNext = async () => {
    if (selectedValue === '') {
      setErrorCheck(true)
    } else if (!errorCheck) {
      getOTP(
        { email },
        {
          onSuccess: () => {
            navigate('/register/verify-email', { state: { email, password, name, gender, role: selectedValue } })
          }
        }
      )
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
      <BorderLinearProgress variant='determinate' value={Math.floor((3 / 3) * 100)} sx={{ width: '100%', mt: 0.5 }} />
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
              navigate('/register/step2', { state: { email, password } })
            }
          }}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, fontSize: 14, pb: 3 }}>
          <Box sx={{ color: (theme) => theme.palette.neutral.neutral1 }}>Bước 3/3</Box>
          <Box sx={{ color: (theme) => theme.palette.secondary4.main, fontWeight: 'bold' }}>Giới thiệu thông tin về bản thân bạn</Box>
        </Box>
      </Box>

      <FormControl sx={{ width: '100%', pb: 2, pl: 5, pr: 5 }} error={!errorCheck}>
        <Box sx={{ fontSize: 14, fontWeight: 'bold', pt: 2 }}>Vai trò</Box>
        <Box sx={{ fontSize: 13, pb: 1, color: (theme) => theme.palette.neutral.neutral1 }}>
          Vai trò của bạn giúp chúng tôi cung cấp các tính năng cho bạn.
        </Box>
        <RadioGroup
          aria-labelledby='demo-radio-buttons-group-label'
          name='radio-buttons-group'
          value={selectedValue}
          onChange={handleCheck}
          sx={{
            'display': 'flex',
            'flexDirection': 'row',
            'justifyContent': 'start',
            'gap': 5,
            'paddingBottom': 2,
            '& .MuiFormControlLabel-label': {
              fontSize: 15,
              marginLeft: 5
            }
          }}
        >
          <FormControlLabel
            value='1'
            control={<Radio sx={{ display: 'none' }} />}
            label={
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1 }}>
                <ImageRadio selected={selectedValue === '1'} style={{ backgroundImage: `url(${listenerGif})` }} />
                <Box sx={{ color: selectedValue === '1' ? (theme) => theme.palette.primary.main : '' }}>Ngươi nghe</Box>
              </Box>
            }
            checked={selectedValue === '1'}
            disabled={isPending}
          />
          <FormControlLabel
            value='0'
            control={<Radio sx={{ display: 'none' }} />}
            label={
              <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1, alignItems: 'center' }}>
                <ImageRadio selected={selectedValue === '0'} style={{ backgroundImage: `url(${artistGif})` }} />
                <Box sx={{ color: selectedValue === '0' ? (theme) => theme.palette.primary.main : '' }}>Nghệ sĩ</Box>
              </Box>
            }
            checked={selectedValue === '0'}
            disabled={isPending}
          />
        </RadioGroup>

        {errorCheck && (
          <Box sx={{ pt: 1 }}>
            <FormHelperText
              id='my-helper-text'
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
              Chọn vai trò của bạn.
            </FormHelperText>
          </Box>
        )}

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
          <Button sx={{ width: '100%', fontSize: 14, fontWeight: 'bold' }} variant='contained' onClick={handleNext}>
            Đăng Ký
          </Button>
        )}
        {isPending && <CircularProgress color='success' />}
      </FormControl>
    </Box>
  )
}
