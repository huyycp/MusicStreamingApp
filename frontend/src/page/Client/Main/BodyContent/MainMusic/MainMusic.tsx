import Box from '@mui/material/Box'

type Props = {
  viewType?: string | ''
}

export default function MainMusic({ viewType }: Props) {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        maxHeight: 'auto',
        display: 'flex',
        justifyContent: 'space-between',
        bgcolor: (theme) => theme.palette.secondary2.main,
        borderRadius: '10px',
        color: (theme) => theme.palette.secondary4.main
      }}
    >
      {!viewType && <Box>Home</Box>}
      {viewType === 'search' && <Box>Search</Box>}
      {viewType === 'collection' && <Box>Collection</Box>}
      {viewType === 'playlist' && <Box>PlayList</Box>}
    </Box>
  )
}
