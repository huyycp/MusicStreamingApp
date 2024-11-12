import Box from '@mui/material/Box'
import MusicLibrary from './MusicLibrary/MusicLibrary'
import MainMusic from './MainMusic/MainMusic'
import ResizeBox from '~/components/ResizeBox'
import MusicDesc from './MusicDesc/MusicDesc'
import { SnackbarProvider } from 'notistack'

type Props = {
  viewType?: string | ''
}

export default function BodyContent({ viewType }: Props) {
  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={2000}>
      <Box
        sx={{
          inlineSize: '100%',
          blockSize: (theme) => theme.music.appBodyHeight,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'start',
          bgcolor: (theme) => theme.palette.secondary1.main
        }}
      >
        <ResizeBox index={0} minWidth={72} maxWidth={800}>
          <MusicLibrary />
        </ResizeBox>
        <ResizeBox index={1} minWidth={436} maxWidth={1200}>
          <MainMusic viewType={viewType} />
        </ResizeBox>
        <ResizeBox index={2} minWidth={248} maxWidth={600}>
          <MusicDesc />
        </ResizeBox>
      </Box>
    </SnackbarProvider>
  )
}
