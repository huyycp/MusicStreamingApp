import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import SvgIcon from '@mui/material/SvgIcon'
import DemoIcon from '~/assets/icon/DemoIcon.svg?react'

export default function TestUI() {
  return (
    <Box sx={{ bgcolor: 'black', display: 'flex', gap: 1 }}>
      <Box
        sx={{
          bgcolor: (theme) => theme.palette.primary.main,
          width: '50px',
          height: '50px'
        }}
      >
        1
      </Box>
      <Box
        sx={{
          bgcolor: (theme) => theme.palette.secondary1.main,
          width: '50px',
          height: '50px'
        }}
      >
        2
      </Box>
      <Box
        sx={{
          bgcolor: (theme) => theme.palette.secondary2.main,
          width: '50px',
          height: '50px'
        }}
      >
        3
      </Box>
      <Box
        sx={{
          bgcolor: (theme) => theme.palette.secondary3.main,
          width: '50px',
          height: '50px'
        }}
      >
        4
      </Box>
      <Box
        sx={{
          bgcolor: (theme) => theme.palette.secondary4.main,
          width: '50px',
          height: '50px'
        }}
      >
        5
      </Box>
      <Box
        sx={{
          bgcolor: (theme) => theme.palette.neutral.neutral1,
          width: '50px',
          height: '50px'
        }}
      >
        6
      </Box>
      <Box
        sx={{
          bgcolor: (theme) => theme.palette.neutral.neutral2,
          width: '50px',
          height: '50px'
        }}
      >
        7
      </Box>
      <Box
        sx={{
          bgcolor: (theme) => theme.palette.neutral.neutral3,
          width: '50px',
          height: '50px'
        }}
      >
        8
      </Box>
      <Box
        sx={{
          background: (theme) => theme.palette.gradient.gradient1,
          width: '50px',
          height: '50px'
        }}
      >
        9
      </Box>
      <Box
        sx={{
          background: (theme) => theme.palette.gradient.gradient2,
          width: '50px',
          height: '50px'
        }}
      >
        10
      </Box>
      <Box
        sx={{
          background: (theme) => theme.palette.gradient.gradient3,
          width: '50px',
          height: '50px'
        }}
      >
        11
      </Box>
      <Box
        sx={{
          background: (theme) => theme.palette.gradient.gradient4,
          width: '50px',
          height: '50px'
        }}
      >
        12
      </Box>
      <Box
        sx={{
          background: (theme) => theme.palette.gradient.gradient5,
          width: '50px',
          height: '50px'
        }}
      >
        13
      </Box>
      <Box
        sx={{
          background: (theme) => theme.palette.gradient.gradient6,
          width: '50px',
          height: '50px'
        }}
      >
        14
      </Box>
      <Box
        sx={{
          background: (theme) => theme.palette.gradient.gradient7,
          width: '50px',
          height: '50px'
        }}
      >
        15
      </Box>
      <Box>
        <Button variant='outlined'>TestUI</Button>
        <Button variant='contained'>TestUI</Button>
        <Button variant='contained' color='secondary'>
          TestUI
        </Button>
        <Button variant='outlined'>TestUI</Button>
      </Box>
      <Box>
        <SvgIcon component={DemoIcon} inheritViewBox sx={{ height: '32px', width: '32px', cursor: 'pointer' }} />
      </Box>
    </Box>
  )
}
