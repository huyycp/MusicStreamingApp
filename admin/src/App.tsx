import Box from '@mui/material/Box'
import Navbar from './components/Navbar/Navbar'
import Metadata from './components/Metadata/Metadata'
import MainContent from './components/MainContent/MainContent'
function App() {
  return (
    <Box bgcolor='#000000' sx={{ minWidth: '800px' }}>
      <Navbar></Navbar>
      <Metadata />
      <MainContent></MainContent>
    </Box>
  )
}

export default App
