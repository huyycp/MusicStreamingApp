import { useState, useEffect } from 'react'
import ChevronLeft from '@mui/icons-material/ChevronLeft'
import ChevronRight from '@mui/icons-material/ChevronRight'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Skeleton from '@mui/material/Skeleton'
import ImageSlide from './ImageSlide'
import useGetAlbums from '~/hooks/Album/useGetAlbums'
import { ILibrary } from '~/type/Library/ILibrary'

const ImageSlider = () => {
  const { data, isPending } = useGetAlbums(5, 1)
  const listAlbum = (data?.result.data as ILibrary[]) || []

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (listAlbum.length - 2))
  }

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + (listAlbum.length - 2)) % (listAlbum.length - 2))
  }

  const images = listAlbum.map((album) => album.image)

  useEffect(() => {
    const interval = setInterval(handleNext, 5000)
    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3, position: 'relative', width: '100%' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <IconButton
        onClick={handlePrev}
        sx={{
          'position': 'absolute',
          'left': 15,
          'zIndex': 1,
          'opacity': isHovered ? 1 : 0,
          'transition': 'opacity 0.3s ease',
          'backgroundColor': 'rgba(0, 0, 0, 0.5)',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.7)'
          }
        }}
      >
        <ChevronLeft sx={{ color: '#FFF', fontSize: 40 }} />
      </IconButton>

      <Box sx={{ display: 'flex', overflow: 'hidden', width: '100%' }}>
        {isPending ? (
          <Box sx={{ display: 'flex', width: '100%' }}>
            {[...Array(3)].map((_, index) => (
              <Skeleton key={index} variant='rectangular' width={210} height={118} sx={{ flex: 1, marginRight: index !== 2 ? 2 : 0 }} />
            ))}
          </Box>
        ) : (
          <Box
            sx={{
              display: 'flex',
              transition: 'transform 0.5s ease',
              transform: `translateX(-${currentIndex * (100 / 3)}%)`,
              width: `${images.length * (100 / 3)}%`
            }}
          >
            {listAlbum.map((album, index) => (
              <ImageSlide
                key={index}
                src={album.image}
                index={index}
                artistsName={album.owners ? album.owners.map((artist) => artist.name) : []}
                albumName={album.name}
                albumId={album._id}
                isActive={index === currentIndex}
              />
            ))}
          </Box>
        )}
      </Box>

      <IconButton
        onClick={handleNext}
        sx={{
          'position': 'absolute',
          'right': 15,
          'zIndex': 1,
          'opacity': isHovered ? 1 : 0,
          'transition': 'opacity 0.3s ease',
          'backgroundColor': 'rgba(0, 0, 0, 0.5)',
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
