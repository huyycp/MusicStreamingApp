import Box from '@mui/material/Box'
import MusicLibrary from './MusicLibrary/MusicLibrary'
import MainMusic from './MainMusic/MainMusic'
import ResizeBox from '~/components/ResizeBox'
import MusicDesc from './MusicDesc/MusicDesc'

type Props = {
  viewType?: string | ''
}

export default function BodyContent({ viewType }: Props) {
  return (
    <Box
      sx={{
        width: '100%',
        height: (theme) => theme.music.appBodyHeight,
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
  )
}
