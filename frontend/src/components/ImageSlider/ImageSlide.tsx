import Box from '@mui/material/Box'

interface ImageSlideProps {
  src: string;
  index: number;
  isActive: boolean;
}

const ImageSlide = ({ src, index, isActive }: ImageSlideProps) => {
  return (
    <Box
      sx={{
        cursor: 'pointer',
        flex: '0 0 auto',
        width: 'calc(33.33% - 20px)',
        margin: '0 10px',
        opacity: isActive ? 1 : 0.8,
        transition: 'opacity 0.5s ease',
        '&:hover': {
          opacity: 1.5
        }
      }}
    >
      <img
        src={src}
        alt={`Slide ${index + 1}`}
        style={{ width: '100%', height: '190px', borderRadius: '10px' }}
      />
    </Box>
  )
}

export default ImageSlide
