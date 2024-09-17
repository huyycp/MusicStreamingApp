import Box from '@mui/material/Box'
import { IMusic } from '~/type/IMusic'
import MusicTag from './MusicTag'
import Typography from '@mui/material/Typography'

type Props = {
  musicList: IMusic[]
}

export default function RecommendAlbum({ musicList }: Props) {
  return (
    <Box sx={{ inlineSize: '100%', blockSize: 'auto' }}>
      <Box sx={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', blockSize: '60px', inlineSize: '100%', pl: '12px' }}>
        <Typography
          variant='h5'
          sx={{
            'cursor': 'pointer',
            '&:hover': {
              textDecoration: 'underline'
            }
          }}
        >
          Album 1
        </Typography>
        <Typography
          variant='body2'
          sx={{
            'cursor': 'pointer',
            'color': (theme) => theme.palette.neutral.neutral1,
            '&:hover': {
              textDecoration: 'underline'
            }
          }}
        >
          Hiện tất cả
        </Typography>
      </Box>
      <Box
        sx={{
          inlineSize: '100%',
          blockSize: '100%',
          maxBlockSize: 'auto',
          display: 'flex',
          justifyContent: 'start'
        }}
      >
        {musicList.map((music, index) => (
          <MusicTag music={music} key={index} />
        ))}
      </Box>
    </Box>
  )
}
