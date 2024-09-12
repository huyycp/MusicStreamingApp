import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import SvgIcon from '@mui/material/SvgIcon'
import DemoIcon from '~/assets/icon/DemoIcon.svg?react'

export default function TestUI() {
  return (
    <Box sx={{ bgcolor: 'black', display: 'flex', gap: 1 }}>
      <Box
        sx={{
          'display': 'flex',
          'alignItems': 'center',
          'position': 'relative',
          'width': 'auto',
          'padding': 2,
          '& .MuiChip-root': {
            'boxShadow': 2,
            'cursor': 'pointer',
            'bgcolor': (theme) => theme.palette.neutral.neutral1,
            'color': (theme) => theme.palette.secondary1.main,
            '&:hover': {
              bgcolor: (theme) => theme.palette.neutral.neutral2
            }
          }
        }}
      >
        <Chip
          label='Chip lớn'
          sx={{
            bgcolor: (theme) => theme.palette.primary.main,
            color: (theme) => theme.palette.primary.contrastText,
            padding: '10px 20px',
            position: 'relative',
            zIndex: 99
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: 'calc(100% - 50px)',
            transform: 'translateY(-50%)',
            zIndex: 1
          }}
        >
          <Chip
            label='Chip nhỏ'
            sx={{
              bgcolor: (theme) => theme.palette.secondary.main,
              color: (theme) => theme.palette.secondary.contrastText,
              padding: '5px 0px 5px 30px'
            }}
          />
        </Box>
      </Box>
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
