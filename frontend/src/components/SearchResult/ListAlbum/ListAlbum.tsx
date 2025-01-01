import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useResize } from '~/hooks/useResize'
import { useEffect, useState } from 'react'
import AlbumTag from '~/components/AlbumTag'
import Skeleton from '@mui/material/Skeleton'
import { ILibrary } from '~/type/Library/ILibrary'

type Props = {
  title: string
  listAlbum: ILibrary[]
  isPending: boolean
  handleNavigate?: () => void
  tag?: string
}

export default function ListAlbum({ title, listAlbum, isPending, handleNavigate, tag }: Props) {
  const { widths } = useResize()
  const [albumList, setAlbumList] = useState<ILibrary[]>([])

  useEffect(() => {
    const numberOfVisibleItems = Math.floor((widths[1] || 0) / 185)
    setAlbumList(listAlbum.slice(0, numberOfVisibleItems))
  }, [listAlbum, widths])

  return (
    <Box sx={{ inlineSize: '100%', blockSize: 'auto' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'end',
          justifyContent: 'space-between',
          blockSize: '60px',
          inlineSize: '100%',
          pl: '12px'
        }}
      >
        <Typography
          variant='h5'
          sx={{
            'cursor': 'pointer',
            '&:hover': {
              textDecoration: 'underline'
            }
          }}
        >
          {title}
        </Typography>
        {handleNavigate && (
          <Typography
            variant='body2'
            sx={{
              'cursor': 'pointer',
              'color': (theme) => theme.palette.neutral.neutral1,
              '&:hover': {
                textDecoration: 'underline'
              }
            }}
            onClick={handleNavigate}
          >
            Hiện tất cả
          </Typography>
        )}
      </Box>

      <Box
        sx={{
          inlineSize: '100%',
          blockSize: 'auto',
          display: 'flex',
          justifyContent: 'flex-start',
          overflow: 'hidden'
        }}
      >
        {isPending ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              flexWrap: 'nowrap',
              inlineSize: '100%'
            }}
          >
            {[...Array(5)].map((_, index) => (
              <Skeleton key={index} variant='rectangular' width={180} height={180} sx={{ flexShrink: 0, marginRight: '8px' }} />
            ))}
          </Box>
        ) : (
          albumList.length > 0 && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                flexWrap: 'nowrap'
              }}
            >
              {albumList.map((album, index) => (
                <Box
                  key={index}
                  sx={{
                    flexShrink: 0,
                    flexBasis: 'auto',
                    marginRight: '8px'
                  }}
                >
                  <AlbumTag album={album} tag={tag} />
                </Box>
              ))}
            </Box>
          )
        )}
      </Box>
    </Box>
  )
}
