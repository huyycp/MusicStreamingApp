import { IconButton, Tooltip } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useNavigate, useParams } from 'react-router-dom'
import useGetAlbumDetail from '~/hooks/Album/useGetLibraryDetail'
import { ILibrary } from '~/type/Library/ILibrary'
import ListTracks from './ListTracks/ListTracks'
import useAddTrackToAlbum from '~/hooks/Album/useAddTrackToAlbum'
import { useSnackbar } from 'notistack'
import { useQueryClient } from '@tanstack/react-query'
import { useUser } from '~/hooks/useUser'
import { useCallback, useEffect, useState } from 'react'
import { IUser } from '~/type/User/IUser'
import useGetTracksByArtist from '~/hooks/Tracks/useGetTracksByArtist'
import CircularProgress from '@mui/material/CircularProgress'
import UpdatePlayListModal from '~/components/UpdatePlayListModal/UpdatePlayListModal'
import EditIcon from '@mui/icons-material/Edit'

export default function EditAlbumTracks() {
  const { albumId } = useParams()
  const { data: albumData, isPending: albumPending } = useGetAlbumDetail(albumId || null)
  const {
    data: myTrackListData,
    isPending: myTrackListPending,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage
  } = useGetTracksByArtist(5, 'available')
  const { mutate } = useAddTrackToAlbum()
  const { enqueueSnackbar } = useSnackbar()
  const queryClient = useQueryClient()
  const { user } = useUser()
  const navigate = useNavigate()
  const [openPlayListModal, setOpenPlayListModal] = useState(false)

  useEffect(() => {
    if (!user) {
      enqueueSnackbar('Bạn cần đăng nhập để thực hiện chức năng này', { variant: 'error' })
      navigate('/login')
    }

    if (Array.isArray(albumData?.result?.owners) && !albumData.result.owners.some((owner: IUser) => owner._id === user?._id)) {
      enqueueSnackbar('Bạn không có quyền thêm bài hát vào album này', { variant: 'error' })
      navigate('/')
    }
  }, [enqueueSnackbar, user, albumData, navigate])

  const album = albumData?.result as ILibrary
  const myTrackList = myTrackListData?.pages?.flatMap((page) => page.result.data) || []

  const handleLoadMore = useCallback(() => {
    if (hasNextPage) {
      fetchNextPage()
    }
  }, [hasNextPage, fetchNextPage])

  const handleDeleteTrack = (trackId: string) => {
    if (!album?._id) return
    mutate(
      { library_id: album?._id, tracks: [trackId], type: 'del' },
      {
        onSuccess: () => {
          enqueueSnackbar('Xóa bài hát khỏi album thành công!', { variant: 'success' })
          queryClient.invalidateQueries({ queryKey: ['library', album?._id] })
          queryClient.invalidateQueries({ queryKey: ['tracksList', 'available'] })
        },
        onError: () => {
          enqueueSnackbar('Xóa bài hát khỏi album thất bại', { variant: 'error' })
        }
      }
    )
  }

  const handleAddTrack = (trackId: string) => {
    if (!album?._id) return
    mutate(
      { library_id: album?._id, tracks: [trackId], type: 'add' },
      {
        onSuccess: () => {
          enqueueSnackbar('Thêm bài hát vào album thành công!', { variant: 'success' })
          queryClient.invalidateQueries({ queryKey: ['library', album?._id] })
          queryClient.invalidateQueries({ queryKey: ['tracksList', 'available'] })
        },
        onError: () => {
          enqueueSnackbar('Thêm bài hát vào album thất bại', { variant: 'error' })
        }
      }
    )
  }

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
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
              alt={album?.name}
              src={album?.image || 'https://res.cloudinary.com/dswj1rtvu/image/upload/v1727670619/no-image_vueuvs.avif'}
              style={{
                inlineSize: '142px',
                blockSize: '142px',
                objectFit: 'cover'
              }}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 'auto', mb: 'auto' }}>
              <Typography variant='body2' sx={{ color: (theme) => theme.palette.secondary4.main }}>
                Album
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
                {album?.name}
                <IconButton
                  sx={{
                    'height': '24px',
                    'width': '24px',
                    'pt': '2px',
                    'ml': 1,
                    'color': (theme) => theme.palette.secondary4.main,
                    '&:hover': {
                      color: (theme) => theme.palette.neutral.neutral1
                    }
                  }}
                  onClick={() => {
                    setOpenPlayListModal(true)
                  }}
                >
                  <Tooltip title='Chỉnh sửa thông tin album'>
                    <EditIcon />
                  </Tooltip>
                </IconButton>
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center', color: (theme) => theme.palette.neutral.neutral1 }}>
                <Typography variant='body2' sx={{ color: (theme) => theme.palette.secondary4.main, fontWeight: 1000 }}>
                  {album?.owners?.[0]?.name}
                </Typography>
                •
                <Typography variant='body2' sx={{ color: (theme) => theme.palette.secondary4.main, fontWeight: 500 }}>
                  {album?.name}
                </Typography>
                •
                <Typography variant='body2' sx={{ fontWeight: 1000 }}>
                  {album?.created_at.slice(0, 4)}
                </Typography>
                •
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ width: '100%' }}>
        {album?.list_of_tracks && <ListTracks listTracks={album?.list_of_tracks} isPending={albumPending} onDeleteTrack={handleDeleteTrack} />}
      </Box>
      <Box
        sx={{
          width: '100%'
        }}
      >
        <Typography variant='h6' sx={{ color: (theme) => theme.palette.secondary4.main, mt: 2, mb: 1 }}>
          Thêm bài hát vào album
        </Typography>
        {myTrackList && <ListTracks listTracks={myTrackList} isPending={myTrackListPending} onAddTrack={handleAddTrack} />}
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
      <UpdatePlayListModal open={openPlayListModal} setOpen={setOpenPlayListModal} playListId={album._id} />
    </Box>
  )
}
