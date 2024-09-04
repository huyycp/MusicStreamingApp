import { ReactNode } from 'react'
import Box from '@mui/material/Box'
import { useResize } from '~/hooks/useResize'

interface ResizeBoxProps {
  index: number
  minWidth?: number
  maxWidth?: number
  children: ReactNode
}

function ResizeBox(props: ResizeBoxProps) {
  const { index, minWidth = 72, maxWidth, children } = props
  const { widths, setWidth } = useResize()

  const handleMouseDown = (e: React.MouseEvent) => {
    const startX = e.clientX
    const startWidth = widths[index]

    const handleMouseMove = (moveEvent: MouseEvent) => {
      let newWidth = startWidth + (moveEvent.clientX - startX)
      if (newWidth < minWidth) {
        newWidth = minWidth
      } else if (maxWidth && newWidth > maxWidth) {
        newWidth = maxWidth
      }
      setWidth(index, newWidth)
    }

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  }

  return (
    <Box
      sx={{
        width: `${widths[index]}px`,
        minWidth: index === 2 ? 'none' : `${minWidth + 10}px`,
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        bgcolor: 'transparent',
        overflow: 'hidden'
      }}
    >
      {children}
      <Box
        sx={{
          'marginLeft': '2px',
          'marginRight': '2px',
          'width': '5px',
          'height': '100%',
          'bgcolor': 'transparent',
          '&:hover': {
            bgcolor: (theme) => theme.palette.neutral.neutral1
          },
          'cursor': 'ew-resize'
        }}
        onMouseDown={handleMouseDown}
      />
    </Box>
  )
}

export default ResizeBox
