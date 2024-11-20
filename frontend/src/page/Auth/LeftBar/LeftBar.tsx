import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Paper from '@mui/material/Paper'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

export default function LeftBar() {
  return (
    <Box
      sx={{
        width: 250,
        height: '100vh',
        bgcolor: 'inherit',
        boxShadow: 2,
        position: 'fixed',
        top: 0,
        left: 0,
        padding: 2,
        overflowY: 'auto'
      }}
    >
      <Typography variant='h6' sx={{ marginBottom: 2 }}></Typography>

      <Paper sx={{ padding: 2 }}>
        <List>
          <ListItem button>
            <ListItemText primary='Thông tin cá nhân' />
          </ListItem>
          <Divider />

          <ListItem button>
            <ListItemText primary='Sở thích của bạn' />
          </ListItem>
        </List>
      </Paper>
    </Box>
  )
}
