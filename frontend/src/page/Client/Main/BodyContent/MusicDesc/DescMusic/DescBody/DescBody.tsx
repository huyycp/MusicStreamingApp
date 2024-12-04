import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { useNavigate } from 'react-router-dom'
import { useMusic } from '~/hooks/useMusic'
import { capitalizeFirstLetterOfEachWord } from '~/utils/capitalizeFirstLetterOfEachWord'
import { Fragment } from 'react/jsx-runtime'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
import IconButton from '@mui/material/IconButton'
import { Tooltip } from '@mui/material'
import IosShareIcon from '@mui/icons-material/IosShare'
import { useSnackbar } from 'notistack'

export default function DescBody() {
  const navigate = useNavigate()
  const { music, album } = useMusic()
  const { enqueueSnackbar } = useSnackbar()

  const handleGetLink = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/track/${music?._id}`)
      .then(() => {
        enqueueSnackbar('Sao chép đường dẫn thành công', { variant: 'success' })
      })
      .catch(() => {
        enqueueSnackbar('Sao chép đường dẫn thất bại', { variant: 'error' })
      })
  }

  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
        bgcolor: 'transparent',
        cursor: 'pointer',
        borderRadius: '10px',
        padding: '12px'
      }}
      onClick={() => {
        if (music?.album) navigate(`/library/${music?.album._id}`)
        else if (!music?.album && album?._id) navigate(`/library/${album._id}`)
        else navigate(`/track/${music?._id}`)
      }}
    >
      <img
        alt={music?.album?.name || album?.name || music?.name}
        src={music?.album?.image || album?.image || music?.image || 'https://res.cloudinary.com/dswj1rtvu/image/upload/v1727670619/no-image_vueuvs.avif'}
        onError={(e) => {
          e.currentTarget.src = 'https://res.cloudinary.com/dswj1rtvu/image/upload/v1727670619/no-image_vueuvs.avif'
        }}
        style={{
          inlineSize: '100%',
          blockSize: '100%',
          objectFit: 'cover'
        }}
      />
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {music?.name && (
            <Typography
              variant='h5'
              fontWeight='bold'
              sx={{
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
            >
              {capitalizeFirstLetterOfEachWord(music.name)}
            </Typography>
          )}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'start',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
              textOverflow: 'ellipsis',
              whiteSpace: 'normal',
              gap: 0.3,
              fontSize: 18,
              color: (theme) => theme.palette.neutral.neutral1,
              overflow: 'hidden'
            }}
          >
            {music?.owners && (
              <Typography
                sx={{
                  fontSize: 16,
                  cursor: 'pointer',
                  color: (theme) => theme.palette.neutral.neutral1,
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 0.3
                }}
              >
                {music?.owners.map((artist, index) => (
                  <Fragment key={artist._id}>
                    <Typography
                      component='span'
                      sx={{
                        'fontSize': 16,
                        'cursor': 'pointer',
                        'color': (theme) => theme.palette.neutral.neutral1,
                        '&:hover': {
                          color: (theme) => theme.palette.secondary4.main,
                          textDecoration: 'underline'
                        }
                      }}
                      onClick={(event) => {
                        event.stopPropagation()
                        navigate(`/artist/${artist._id}`)
                      }}
                    >
                      {artist.name}
                    </Typography>
                    {index < music.owners.length - 1 && ','}
                  </Fragment>
                ))}
              </Typography>
            )}
          </Box>
        </Box>
        <Box sx={{ whiteSpace: 'nowrap' }}>
          <Tooltip title='Sao chép liên kết' placement='top' onClick={handleGetLink}>
            <IconButton>
              <IosShareIcon
                sx={{
                  'color': (theme) => theme.palette.neutral.neutral1,
                  'cursor': 'pointer',
                  'fontSize': 24,
                  '&:hover': {
                    color: (theme) => theme.palette.secondary4.main
                  }
                }}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title='Thêm vào Bài hát yêu thích' placement='top'>
            <IconButton>
              <ControlPointIcon
                sx={{
                  'color': (theme) => theme.palette.neutral.neutral1,
                  'cursor': 'pointer',
                  'fontSize': 24,
                  '&:hover': {
                    color: (theme) => theme.palette.secondary4.main
                  }
                }}
              />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  )
}
