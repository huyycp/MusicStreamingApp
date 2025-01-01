import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import Box from '@mui/system/Box'
import AlbumTag from '~/components/AlbumTag'
import useGetAlbumWeeklyTop from '~/hooks/Top/useGetAlbumWeeklyTop'
import { ILibrary } from '~/type/Library/ILibrary'

export default function AlbumViewWeekTop10() {
  const { data, isPending } = useGetAlbumWeeklyTop()

  const listAlbum = data?.result as ILibrary[]

  return (
    <Box sx={{ inlineSize: '100%' }}>
      <Typography
        variant='h4'
        fontWeight='bold'
        sx={{
          'paddingTop': 3,
          'paddingBottom': 2,
          'cursor': 'pointer',
          '&:hover': {
            textDecoration: 'underline'
          }
        }}
      >
        Top 10 Album được nghe nhiều nhất tuần
      </Typography>

      {isPending ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            flexWrap: 'wrap',
            inlineSize: '100%'
          }}
        >
          {[...Array(5)].map((_, index) => (
            <Skeleton key={index} variant='rectangular' width={180} height={180} sx={{ flexShrink: 0, marginRight: '8px', marginBottom: '8px' }} />
          ))}
        </Box>
      ) : (
        <>
          {listAlbum && listAlbum.length > 0 ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                flexWrap: 'wrap'
              }}
            >
              {listAlbum.map((album, index) => (
                <Box
                  key={index}
                  sx={{
                    flexShrink: 0,
                    flexBasis: 'auto',
                    marginRight: '8px',
                    marginBottom: '8px'
                  }}
                >
                  <AlbumTag album={album} tag='week-top10'/>
                </Box>
              ))}
            </Box>
          ) : (
            <Typography variant='body1' sx={{ marginTop: 2 }}>
              Không có album nào để hiển thị.
            </Typography>
          )}
        </>
      )}
    </Box>
  )
}
