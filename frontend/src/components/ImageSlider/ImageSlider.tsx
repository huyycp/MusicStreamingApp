import { useState, useEffect } from 'react'
import ChevronLeft from '@mui/icons-material/ChevronLeft'
import ChevronRight from '@mui/icons-material/ChevronRight'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import ImageSlide from './ImageSlide'

const images = [
  'https://via.placeholder.com/300/FF5733/FFFFFF?text=Image+1',
  'https://via.placeholder.com/300/33FF57/FFFFFF?text=Image+2',
  'https://via.placeholder.com/300/3357FF/FFFFFF?text=Image+3',
  'https://via.placeholder.com/300/FF33A1/FFFFFF?text=Image+4',
  'https://via.placeholder.com/300/33A1FF/FFFFFF?text=Image+5'
]

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (images.length - 2))
  }

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + (images.length - 2)) % (images.length - 2))
  }

  useEffect(() => {
    const interval = setInterval(handleNext, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Box
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3, position: 'relative' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <IconButton
        onClick={handlePrev}
        sx={{
          position: 'absolute',
          left: 15,
          zIndex: 1,
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.7)'
          }
        }}
      >
        <ChevronLeft sx={{ color: '#FFF', fontSize: 40 }} />
      </IconButton>

      <Box sx={{ display: 'flex', overflow: 'hidden', width: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            transition: 'transform 0.5s ease',
            transform: `translateX(-${(currentIndex * (100 / 3))}%)`,
            width: `${images.length * (100 / 3)}%`
          }}
        >
          {images.map((src, index) => (
            <ImageSlide
              key={index}
              src={src}
              index={index}
              isActive={index === currentIndex}
            />
          ))}
        </Box>
      </Box>

      <IconButton
        onClick={handleNext}
        sx={{
          position: 'absolute',
          right: 15,
          zIndex: 1,
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.7)'
          }
        }}
      >
        <ChevronRight sx={{ color: '#FFF', fontSize: 40 }} />
      </IconButton>
    </Box>
  )
}

export default ImageSlider
