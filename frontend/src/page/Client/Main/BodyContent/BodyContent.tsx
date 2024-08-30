import Box from '@mui/material/Box'

export default function BodyContent() {
  return (
    <Box
      sx={{
        width: '100%',
        height: (theme) => theme.music.appBodyHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        bgcolor: (theme) => theme.palette.secondary2.main
      }}
    >
      <Box></Box>
    </Box>
  )
}
