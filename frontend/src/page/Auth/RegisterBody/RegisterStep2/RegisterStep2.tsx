import Box from '@mui/material/Box'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress'
import { styled } from '@mui/material/styles'
import { ChangeEvent, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import FormControl from '@mui/material/FormControl'
import Input from '@mui/material/Input'
import Button from '@mui/material/Button'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import Radio from '@mui/material/Radio'
import CircleIcon from '@mui/icons-material/Circle'
import FormHelperText from '@mui/material/FormHelperText'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

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

export default function RegisterStep2() {
  const location = useLocation()
  const navigate = useNavigate()
  const email = location.state?.email as string
  const password = location.state?.password as string

  useEffect(() => {
    if (!email || !password) navigate('/register')
  })

  const [name, setName] = useState('')
  const [errorCheck, setErrorCheck] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setName(value)
    setError(value === '')
  }
  const [selectedValue, setSelectedValue] = useState('')

  const handleCheck = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value)
    setErrorCheck(event.target.value === '')
  }

  const handleNext = () => {
    if (name === '') setError(true)
    if (selectedValue === '') setErrorCheck(true)
    else if (name !== '' && selectedValue !== '') {
      navigate('/register/step3', { state: { email, password, name, gender: selectedValue } })
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <BorderLinearProgress variant='determinate' value={Math.floor((2 / 3) * 100)} sx={{ width: '100%', mt: 0.5 }} />
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
            navigate('/register/step1', { state: { email } })
          }}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, fontSize: 14, pb: 3 }}>
          <Box sx={{ color: (theme) => theme.palette.neutral.neutral1 }}>Bước 2/3</Box>
          <Box sx={{ color: (theme) => theme.palette.secondary4.main, fontWeight: 'bold' }}>Giới thiệu thông tin về bản thân bạn</Box>
        </Box>
      </Box>
      <FormControl sx={{ width: '100%', pb: 2, pl: 5, pr: 5 }} error={error}>
        <Box sx={{ fontSize: 14, fontWeight: 'bold' }}>Tên</Box>
        <Box sx={{ fontSize: 13, pb: 1, color: (theme) => theme.palette.neutral.neutral1 }}>Tên này sẽ xuất hiện trên hồ sơ của bạn</Box>
        <Input
          id='my-input'
          aria-describedby='my-helper-text'
          value={name}
          onChange={handleChange}
          sx={{
            'borderColor': error ? 'red' : '',
            '&:hover': {
              borderColor: error ? 'red' : ''
            },
            '&.Mui-focused': {
              borderColor: error ? 'red' : ''
            }
          }}
        />
        <Box sx={{ fontSize: 14, fontWeight: 'bold', pt: 2 }}>Giới tính</Box>
        <Box sx={{ fontSize: 13, pb: 1, color: (theme) => theme.palette.neutral.neutral1 }}>
          Giới tính của bạn giúp chúng tôi cung cấp nội dung đề xuất và quảng cáo phù hợp với bạn.
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
            '& .MuiFormControlLabel-label': {
              fontSize: 13
            }
          }}
        >
          <FormControlLabel
            value='Male'
            control={
              <Radio
                icon={
                  <RadioButtonUncheckedIcon
                    sx={{
                      color: (theme) => theme.palette.neutral.neutral1
                    }}
                  />
                }
                checkedIcon={<CircleIcon />}
              />
            }
            label='Nam'
          />
          <FormControlLabel
            value='Female'
            control={
              <Radio
                icon={
                  <RadioButtonUncheckedIcon
                    sx={{
                      color: (theme) => theme.palette.neutral.neutral1
                    }}
                  />
                }
                checkedIcon={<CircleIcon />}
              />
            }
            label='Nữ'
          />
        </RadioGroup>
        {errorCheck && (
          <Box sx={{ pt: 1 }}>
            <FormHelperText
              id='my-helper-text'
              sx={{ fontSize: 12, m: 'unset', pb: 2, color: 'red', display: 'flex', alignItems: 'start', justifyContent: 'start', gap: 0.5 }}
            >
              <ErrorOutlineIcon sx={{ fontSize: 20 }} />
              Chọn giới tính của bạn.
            </FormHelperText>
          </Box>
        )}
        <Button sx={{ width: '100%', fontSize: 14, fontWeight: 'bold' }} variant='contained' onClick={handleNext}>
          Tiếp theo
        </Button>
      </FormControl>
    </Box>
  )
}
