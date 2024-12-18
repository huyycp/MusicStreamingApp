import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { Params, useNavigate, useParams } from 'react-router-dom'
import { ITrack } from '~/type/Tracks/ITrack'
import { capitalizeFirstLetterOfEachWord } from '~/utils/capitalizeFirstLetterOfEachWord'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import PlayCircleFilledOutlinedIcon from '@mui/icons-material/PlayCircleFilledOutlined'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import MenuTrack from '~/components/MenuMore/MenuTrack'
import { useEffect, useRef, useState } from 'react'
import { useMusic } from '~/hooks/useMusic'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { getAudioDuration } from '~/utils/getAudioDuration'
import { formatDuration } from '~/utils/formatDuration'
import Loader from '~/components/Animation/Loader'
import useGetTracksByGenres from '~/hooks/Genres/useGetTracksByGenres'
import { CircularProgress } from '@mui/material'
import useGetGenresDetail from '~/hooks/Genres/useGetGenresDetail'
import { useResize } from '~/hooks/useResize'
import { useFavorite } from '~/hooks/useFavorite'
import useAddToFavorite from '~/hooks/Tracks/useLikeTrack'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

export default function GenresTrack() {
  const { genreId } = useParams<Params>()
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetTracksByGenres(6, genreId)
  const { data: genreDetail } = useGetGenresDetail(genreId)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const genre = genreDetail?.result
  const listTracks = data?.pages?.flatMap((page) => page.result.data) as ITrack[]
  const { setPause, addTrackList } = useMusic()
  const [trackDurations, setTrackDurations] = useState<{ [key: string]: number }>({})
  const navigate = useNavigate()
  const { music, pause } = useMusic()
  const [isSticky, setIsSticky] = useState(false)
  const triggerRef = useRef<HTMLDivElement>(null)
  const { widths } = useResize()
  const [selectedTrack, setSelectedTrack] = useState<null | ITrack>(null)
  const { isTrackFavorite } = useFavorite()
  const { addToFavorite } = useAddToFavorite()

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

  const handlePlayOnce = (musicData: ITrack) => {
    if (musicData._id === music?._id) {
      if (!pause) setPause(true)
      else setPause(false)
    } else {
      addTrackList([musicData])
    }
  }

  const handlePlayAll = () => {
    if (listTracks.length !== 0) {
      addTrackList(listTracks)
    }
  }

  const handleLoadMore = () => {
    if (hasNextPage) {
      fetchNextPage()
    }
  }

  useEffect(() => {
    if (!listTracks?.length) return

    const fetchDurations = async () => {
      const newDurations: { [key: string]: number } = {}
      const promises = listTracks
        .filter((track) => !trackDurations[track._id])
        .map(async (track) => {
          const duration = await getAudioDuration(track.path_audio)
          newDurations[track._id] = duration
        })

      await Promise.all(promises)
      setTrackDurations((prev) => ({ ...prev, ...newDurations }))
    }

    fetchDurations()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listTracks])

  const handleClick = (event: React.MouseEvent<HTMLElement>, track: ITrack) => {
    event.preventDefault()
    setAnchorEl(event.currentTarget)
    setSelectedTrack(track)
  }

  const handleClose = () => {
    setAnchorEl(null)
    setSelectedTrack(null)
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
      <Box
        sx={{
          width: 'calc(100% + 36px)',
          display: 'flex',
          flexDirection: 'column',
          height: '200px',
          backgroundImage: `
            linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
            url('https://live-production.wcms.abc-cdn.net.au/a362273509f7eccdcf362bb73b3b006d')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          marginLeft: '-18px',
          marginRight: '-18px'
        }}
      >
        <Box sx={{ pl: '18px', pr: '18px' }}>
          <Box sx={{ height: '50px' }}></Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
            <img
              alt={genre?.name}
              src={genre?.image || 'https://res.cloudinary.com/dswj1rtvu/image/upload/v1727670619/no-image_vueuvs.avif'}
              style={{
                inlineSize: '142px',
                blockSize: '142px',
                objectFit: 'cover',
                borderRadius: '5px'
              }}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 'auto', mb: 'auto' }}>
              <Typography variant='body2' sx={{ color: (theme) => theme.palette.secondary4.main }}>
                Bài hát thuộc thể loại
              </Typography>
              <Typography
                sx={{
                  color: 'white',
                  fontWeight: '700',
                  fontSize: 'calc(1vw + 1em)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {genre?.name}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box ref={triggerRef} sx={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'start' }}>
        <IconButton onClick={() => handlePlayAll()}>
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

        <Tooltip title={'Các tùy chọn khác'} placement='top'>
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
        </Tooltip>
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
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          px: 2,
          py: 1.5,
          bgcolor: 'inherit',
          borderBottom: '1px solid #27272a'
        }}
      >
        <Typography
          sx={{
            minWidth: 40,
            fontSize: 12,
            pl: 1,
            color: (theme) => theme.palette.neutral.neutral1,
            textTransform: 'uppercase'
          }}
        >
          #
        </Typography>
        <Typography
          sx={{
            flex: 1,
            fontSize: 12,
            color: (theme) => theme.palette.neutral.neutral1,
            textTransform: 'uppercase'
          }}
        >
          Tiêu đề
        </Typography>
        <AccessTimeIcon fontSize='small' sx={{ color: (theme) => theme.palette.neutral.neutral1, mr: 4 }} />
      </Box>
      {listTracks?.map((track, index) => (
        <Box
          key={index}
          sx={{
            'display': 'flex',
            'alignItems': 'center',
            'px': 1,
            'py': 1,
            'bgcolor': 'inherit',
            'cursor': 'pointer',
            'borderRadius': '5px',
            '&:hover': {
              'bgcolor': (theme) => theme.palette.neutral.neutral3,
              '& .MuiIconButton-root': { opacity: 1 }
            }
          }}
        >
          {anchorEl && selectedTrack && <MenuTrack track={selectedTrack} open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleClose} />}
          {music?._id === track._id && !pause ? (
            <Box
              sx={{ width: '40px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              onClick={() => handlePlayOnce(track)}
            >
              <Loader width='70%' height='60%' barWidth='4px' maxBarHeight='35px' />
            </Box>
          ) : (
            <Typography
              sx={{
                minWidth: 40,
                fontSize: 16,
                pl: 1.5,
                color: track._id === music?._id ? (theme) => theme.palette.primary.main : (theme) => theme.palette.neutral.neutral1
              }}
              onClick={() => handlePlayOnce(track)}
            >
              {index + 1}
            </Typography>
          )}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'row'
            }}
            onClick={() => handlePlayOnce(track)}
          >
            <img
              alt={track?.name}
              src={
                track?.image?.replace('{w}x{h}bb', '48x48bb') || 'https://res.cloudinary.com/dswj1rtvu/image/upload/v1727670619/no-image_vueuvs.avif'
              }
              onError={(e) => {
                e.currentTarget.src = 'https://res.cloudinary.com/dswj1rtvu/image/upload/v1727670619/no-image_vueuvs.avif' // Đường dẫn đến ảnh mặc định
              }}
              style={{
                inlineSize: '40px',
                blockSize: '40px',
                objectFit: 'cover',
                borderRadius: '5px',
                marginRight: '10px'
              }}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Typography
                sx={{
                  'fontSize': 14,
                  'color': music?._id === track._id ? (theme) => theme.palette.primary.main : (theme) => theme.palette.secondary4.main,
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
                onClick={() => navigate(`/track/${track._id}`)}
              >
                {capitalizeFirstLetterOfEachWord(track.name)}
              </Typography>
              <Typography
                component='div'
                sx={{
                  fontSize: 14,
                  color: (theme) => theme.palette.neutral.neutral1,
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 0.5
                }}
              >
                {track.owners?.map((artist, index) => (
                  <Box
                    key={artist._id}
                    onClick={() => navigate(`/artist/${artist._id}`)}
                    sx={{
                      '&:hover': {
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    {artist.name}
                    {index < (track.owners?.length ?? 0) - 1 && ','}
                  </Box>
                ))}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 1
            }}
          >
            <Tooltip title='Thêm vào Bài hát yêu thích' placement='top'>
              <IconButton
                sx={{
                  'opacity': 0,
                  '&:hover': {
                    backgroundColor: (theme) => theme.palette.neutral.neutral2
                  }
                }}
                onClick={(e) => {
                  e.stopPropagation()
                  addToFavorite([track._id])
                }}
              >
                {isTrackFavorite(track._id) ? (
                  <CheckCircleIcon sx={{ color: (theme) => theme.palette.primary.main, fontSize: 17 }} />
                ) : (
                  <FavoriteBorderOutlinedIcon sx={{ color: (theme) => theme.palette.neutral.neutral1, fontSize: 17 }} />
                )}
              </IconButton>
            </Tooltip>
            <Typography
              sx={{
                fontSize: 14,
                color: (theme) => theme.palette.neutral.neutral1
              }}
            >
              {formatDuration(trackDurations[track._id] || 0)}
            </Typography>
            <Tooltip
              title='Khác'
              placement='top'
              onClick={(e) => {
                handleClick(e, track)
              }}
            >
              <IconButton
                sx={{
                  'opacity': 0,
                  '&:hover': {
                    backgroundColor: (theme) => theme.palette.neutral.neutral2
                  }
                }}
              >
                <MoreHorizIcon sx={{ color: (theme) => theme.palette.neutral.neutral1, fontSize: 17 }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      ))}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, alignItems: 'center', mb: 2 }}>
        {isFetchingNextPage ? (
          <CircularProgress />
        ) : hasNextPage ? (
          <Typography
            onClick={handleLoadMore}
            sx={{
              'cursor': 'pointer',
              '&:hover': { textDecoration: 'underline' }
            }}
          >
            Tải thêm...
          </Typography>
        ) : (
          <></>
        )}
      </Box>
    </Box>
  )
}
