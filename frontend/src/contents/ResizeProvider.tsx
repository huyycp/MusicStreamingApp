import { useState, ReactNode, useEffect } from 'react'
import ResizeContext from '~/hooks/useResize'

export function ResizeProvider({ children }: { children: ReactNode }) {
  const fullWidth = 1497
  const minWidths: [number, number, number] = [72, 500, 248]
  const maxWidths: [number, number, number] = [
    fullWidth - minWidths[1] - minWidths[2] - 250,
    fullWidth - minWidths[0] - minWidths[2],
    fullWidth - minWidths[0] - minWidths[1]
  ]
  const defaultWidths: [number, number, number] = [392, fullWidth - 692, 300]

  const [widths, setWidths] = useState<[number, number, number]>(defaultWidths)
  const [isBox2Visible, setIsBox2Visible] = useState(false)
  const [openMusic, setOpenMusic] = useState(true)
  const [openList, setOpenList] = useState(false)

  const setWidth = (index: number, newWidth: number) => {
    if (index === 2 && newWidth === 0) {
      const updatedWidths = [...widths] as [number, number, number]
      updatedWidths[1] = widths[1] + widths[2]
      updatedWidths[2] = 0
      setWidths(updatedWidths)
    } else {
      if (newWidth < minWidths[index]) {
        newWidth = minWidths[index]
      } else if (newWidth > maxWidths[index] && widths[2] !== 0) {
        newWidth = maxWidths[index]
      }

      const updatedWidths = [...widths] as [number, number, number]

      if (index === 0) {
        // Khi Box 0 thay đổi
        if (newWidth <= 240) newWidth = minWidths[0]
        updatedWidths[0] = newWidth
        const remainingWidth = fullWidth - newWidth - widths[2]
        updatedWidths[1] = widths[2] === 0 ? Math.max(minWidths[1], remainingWidth) : Math.max(minWidths[1], Math.min(maxWidths[1], remainingWidth))
      } else if (index === 1) {
        // Khi Box 1 thay đổi
        updatedWidths[1] = widths[2] === 0 ? newWidth + fullWidth - widths[1] : newWidth
        const remainingWidth = fullWidth - widths[0] - newWidth

        if (remainingWidth < minWidths[2]) {
          updatedWidths[2] = 0
          updatedWidths[1] = fullWidth - updatedWidths[0]
        } else if (Math.max(minWidths[2], Math.min(maxWidths[2], remainingWidth)) <= 390)
          updatedWidths[2] = Math.max(minWidths[2], Math.min(maxWidths[2], remainingWidth))
        else {
          updatedWidths[2] = 390
          updatedWidths[1] = fullWidth - updatedWidths[0] - 390
        }
      }
      setWidths(updatedWidths)
    }
  }
  useEffect(() => {
    if (isBox2Visible) {
      setWidth(2, 0)
    } else {
      setWidths([392, fullWidth - 692, 300])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBox2Visible])

  return (
    <ResizeContext.Provider
      value={{
        widths,
        setWidth,
        isBox2Visible,
        setIsBox2Visible,
        openList,
        setOpenList,
        setOpenMusic,
        openMusic,
        maxWidths,
        defaultWidths,
        minWidths
      }}
    >
      {children}
    </ResizeContext.Provider>
  )
}
