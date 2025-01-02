import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function ArtistView() {
  const [selectedChip, setSelectedChip] = useState<string | null>(null)
  const navigate = useNavigate()
  const location = useLocation()

  const chips = [
    { label: 'Tất cả', value: '/artist-top', full: '/artist-top' },
    { label: 'Top 10', value: 'top10', full: '/artist-top/top10' },
    { label: 'Top tuần', value: 'weekly/top10', full: '/artist-top/weekly/top10' },
    { label: 'Top theo dõi', value: 'top-follow', full: '/artist-top/top-follow' }
  ]

  const handleChipClick = (value: string) => {
    setSelectedChip(value)
    navigate(value)
  }

  useEffect(() => {
    const currentPath = location.pathname + location.search
    const foundChip = chips.find((chip) => chip.full === currentPath)
    if (foundChip) {
      setSelectedChip(foundChip.value)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  return (
    <Box sx={{ padding: 2 }}>
      <Box sx={{ display: 'flex', gap: 1 }}>
        {chips.map((chip) => (
          <Chip
            key={chip.value}
            label={chip.label}
            onClick={() => handleChipClick(chip.value)}
            sx={{
              'borderRadius': '15px',
              'bgcolor': selectedChip === chip.value ? (theme) => theme.palette.secondary4.main : (theme) => theme.palette.neutral.neutral3,
              'color': selectedChip === chip.value ? (theme) => theme.palette.secondary2.main : (theme) => theme.palette.secondary4.main,
              'cursor': 'pointer',
              '&:hover': {
                color: (theme) => theme.palette.secondary4.main
              }
            }}
          />
        ))}
      </Box>
      <Outlet />
    </Box>
  )
}
