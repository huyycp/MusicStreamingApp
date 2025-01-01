import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export default function AlbumView() {
  const [selectedChip, setSelectedChip] = useState<string | null>(null)
  const navigate = useNavigate()

  const chips = [
    { label: 'Tất cả', value: '/album', full: '/album' },
    { label: 'Top 10', value: 'top10', full: '/album/top10' },
    { label: 'Top tuần', value: 'weekly/top10', full: '/album/weekly/top10' }
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
