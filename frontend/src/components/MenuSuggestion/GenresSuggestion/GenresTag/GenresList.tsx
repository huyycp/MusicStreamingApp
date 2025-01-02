import Box from '@mui/material/Box'
import { useRef, useState, useEffect } from 'react'
import { useResize } from '~/hooks/useResize'
import { IGenres } from '~/type/Genres/IGenres'
import GeresTag from './GeresTag'
import IconButton from '@mui/material/IconButton'
import ChevronLeft from '@mui/icons-material/ChevronLeft'
import ChevronRight from '@mui/icons-material/ChevronRight'

export const GenresList = ({ genres }: { genres: IGenres[] }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [showButtons, setShowButtons] = useState(false)
  const { widths } = useResize()

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -150, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 150, behavior: 'smooth' })
    }
  }

  const checkOverflow = () => {
    if (containerRef.current) {
      const totalWidth = genres.length * 150
      setShowButtons(totalWidth > widths[1])
    }
  }

  useEffect(() => {
    checkOverflow()
    window.addEventListener('resize', checkOverflow)

    return () => window.removeEventListener('resize', checkOverflow)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genres, widths])

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {showButtons && (
        <IconButton
          onClick={scrollLeft}
          sx={{
            'position': 'absolute',
            'left': 0,
            'zIndex': 1,
            'transition': 'opacity 0.3s ease',
            'backgroundColor': 'rgba(0, 0, 0, 0.5)',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.7)'
            }
          }}
        >
          <ChevronLeft sx={{ color: '#FFF', fontSize: 40 }} />
        </IconButton>
      )}

      <Box
        ref={containerRef}
        sx={{
          display: 'flex',
          gap: 1,
          overflowX: 'hidden',
          overflowY: 'hidden',
          flex: 1
        }}
      >
        {genres.map((genre, index) => (
          <Box
            key={index}
            sx={{
              flexShrink: 0
            }}
          >
            <GeresTag genres={genre} />
          </Box>
        ))}
      </Box>

      {showButtons && (
        <IconButton
          onClick={scrollRight}
          sx={{
            'position': 'absolute',
            'right': 0,
            'zIndex': 1,
            'transition': 'opacity 0.3s ease',
            'backgroundColor': 'rgba(0, 0, 0, 0.5)',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.7)'
            }
          }}
        >
          <ChevronRight sx={{ color: '#FFF', fontSize: 40 }} />
        </IconButton>
      )}
    </Box>
  )
}
