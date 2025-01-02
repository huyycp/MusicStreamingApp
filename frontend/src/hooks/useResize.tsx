import { createContext, useContext } from 'react'

interface ResizeContextProps {
  widths: [number, number, number]
  // eslint-disable-next-line no-unused-vars
  setWidth: (index: number, newWidth: number) => void
  isBox2Visible: boolean
  setIsBox2Visible: React.Dispatch<React.SetStateAction<boolean>>
  openMusic: boolean
  setOpenMusic: React.Dispatch<React.SetStateAction<boolean>>
  openList: boolean
  setOpenList: React.Dispatch<React.SetStateAction<boolean>>
  maxWidths: [number, number, number]
  defaultWidths: [number, number, number]
  minWidths: [number, number, number]
}

const ResizeContext = createContext<ResizeContextProps | undefined>(undefined)

// eslint-disable-next-line react-refresh/only-export-components
export function useResize() {
  const context = useContext(ResizeContext)
  if (!context) {
    throw new Error('useResize must be used within a ResizeProvider')
  }
  return context
}

export default ResizeContext
