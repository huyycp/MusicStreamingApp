import { useState, useEffect, useRef } from 'react'
import Typography from '@mui/material/Typography'
import CheckIcon from '~/assets/icon/CheckIcon.svg?react'
import Box from '@mui/material/Box'
import SvgIcon from '@mui/material/SvgIcon'
import PlayCircleFilledOutlinedIcon from '@mui/icons-material/PlayCircleFilledOutlined'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { useResize } from '~/hooks/useResize'
import ListTracks from './ListAlbum'
import useGetAlbumWithArtist from '~/hooks/Artist/useGetAlbumWithArtist'
import { Params, useParams } from 'react-router-dom'
import { ILibrary } from '~/type/Library/ILibrary'
import useFollowUser from '~/hooks/User/useFollowUser'
import { useFavorite } from '~/hooks/useFavorite'
import ListArtist from './ListArtist'
import useGetArtist from '~/hooks/Artist/useGetArtist'
import { IArtist } from '~/type/Artist/IArtist'
import useGetUserDetail from '~/hooks/User/useGetUserDetail'

export default function ArtistDetail() {
  const [isSticky, setIsSticky] = useState(false)
  const { artistId } = useParams<Params>()
  const { data, isPending } = useGetAlbumWithArtist(artistId || null, 10, 0)
  const triggerRef = useRef<HTMLDivElement>(null)
  const [owner, setOwner] = useState<IArtist | undefined>(undefined)
  const { data: artistData } = useGetUserDetail(artistId)
  const { widths } = useResize()
  const { isUserFollow } = useFavorite()
  const { toggleFollow } = useFollowUser()
  const { data: dataArtist } = useGetArtist(5, 1)

  const listArtist = Array.isArray(dataArtist?.result?.data) ? (dataArtist.result.data as IArtist[]).filter((artist) => artist._id !== artistId) : []

  const albums = data?.result.data as ILibrary[]

  useEffect(() => {
    if (albums && albums[0]) {
      const ownerData = albums[0].owners?.find((owner) => owner._id === artistId)
      setOwner(ownerData || undefined)
    }
  }, [albums, artistId])

  useEffect(() => {
    const handleScroll = () => {
      if (triggerRef.current) {
        const triggerPosition = triggerRef.current.getBoundingClientRect().top
        setIsSticky(triggerPosition <= 0 + 60)
      }
    }

    const onScroll = () => {
      window.requestAnimationFrame(handleScroll)
    }

    window.addEventListener('wheel', onScroll)
    handleScroll()
    return () => window.removeEventListener('wheel', onScroll)
  }, [])

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          width: 'calc(100% + 36px)',
          display: 'flex',
          flexDirection: 'column',
          height: '240px',
          backgroundImage: `
            linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
            url('https://res.cloudinary.com/dswj1rtvu/image/upload/v1727670619/no-image_vueuvs.avif')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          marginLeft: '-18px',
          marginRight: '-18px'
        }}
      >
        <Box sx={{ pl: '18px', pr: '18px' }}>
          <Box sx={{ height: '64px' }}></Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
            <SvgIcon component={CheckIcon} inheritViewBox sx={{ height: '24px', cursor: 'pointer', color: '#4CB3FF' }} />
            <Typography variant='body2' sx={{ color: (theme) => theme.palette.secondary4.main, mt: 'auto', mb: 'auto' }}>
              Nghệ sĩ được xác minh
            </Typography>
          </Box>
          <Typography variant='h1' sx={{ color: 'white', mt: 'auto', mb: 'auto', fontWeight: '1000' }} noWrap>
            {owner?.name || 'Tên nghệ sĩ'}
          </Typography>
          <Typography variant='body2' sx={{ color: 'white', mt: 'auto', mb: 'auto', fontWeight: '1000' }} noWrap>
            {`${artistData?.result?.number_of_followers || 0} người theo dõi`}
          </Typography>
        </Box>
      </Box>

      <Box ref={triggerRef} sx={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'start', mb: 2 }}>
        <IconButton>
          <PlayCircleFilledOutlinedIcon
            sx={{
              'color': (theme) => theme.palette.primary.main,
              'inlineSize': '65px',
              'blockSize': '65px',
              '&:hover': {
                transform: 'scale(1.1)'
              }
            }}
          />
        </IconButton>
        <Button variant='outlined' sx={{ p: '3px 15px', mr: '24px', ml: '16px', height: '32px' }} onClick={() => toggleFollow(artistId!)}>
          {isUserFollow(artistId!) ? 'Đã theo dõi' : 'Theo dõi'}
        </Button>
        <IconButton>
          <MoreHorizIcon
            sx={{
              'color': (theme) => theme.palette.neutral.neutral1,
              'inlineSize': '32px',
              'blockSize': '32px',
              '&:hover': {
                color: (theme) => theme.palette.secondary4.main
              }
            }}
          />
        </IconButton>
      </Box>

      {isSticky && (
        <Box
          sx={{
            position: 'fixed',
            display: 'flex',
            flexDirection: 'row',
            bgcolor: (theme) => theme.palette.secondary2.main,
            width: `calc(${widths[1]}px - 36px)`,
            alignItems: 'center',
            justifyContent: 'start',
            ml: '-18px',
            pl: '18px',
            zIndex: 1100
          }}
        >
          <IconButton>
            <PlayCircleFilledOutlinedIcon
              sx={{
                'color': (theme) => theme.palette.primary.main,
                'inlineSize': '65px',
                'blockSize': '65px',
                '&:hover': {
                  transform: 'scale(1.1)'
                }
              }}
            />
          </IconButton>
          <Button variant='outlined' sx={{ p: '3px 15px', mr: '24px', ml: '16px', height: '32px' }} onClick={() => toggleFollow(artistId!)}>
            {isUserFollow(artistId!) ? 'Đã theo dõi' : 'Theo dõi'}
          </Button>
          <IconButton>
            <MoreHorizIcon
              sx={{
                'color': (theme) => theme.palette.neutral.neutral1,
                'inlineSize': '32px',
                'blockSize': '32px',
                '&:hover': {
                  color: (theme) => theme.palette.secondary4.main
                }
              }}
            />
          </IconButton>
        </Box>
      )}
      <Box>
        <Typography variant='h6' fontWeight='bold'>
          Phổ biến
        </Typography>
        <ListTracks listAlbums={albums} isPending={isPending} />
      </Box>
      {listArtist && <ListArtist artists={listArtist} title='Nghệ sĩ nổi bật' isPending={isPending} />}
    </Box>
  )
}
