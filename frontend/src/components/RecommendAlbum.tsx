import Box from '@mui/material/Box'
import MusicTag from './MusicTag'
import Typography from '@mui/material/Typography'
import { ITrack } from '~/type/Tracks/ITrack'
import { useResize } from '~/hooks/useResize'
import { useEffect, useState } from 'react'

type Props = {
  musicList: ITrack[]
}

export default function RecommendAlbum({ musicList }: Props) {
  const { widths } = useResize() // Kích thước của container
  const [listMusic, setListMusic] = useState<ITrack[]>([]) // Danh sách nhạc hiển thị

  useEffect(() => {
    // Tính số lượng bài nhạc có thể hiển thị
    const numberOfVisibleItems = Math.floor((widths[1] || 0) / 185) // 220px mỗi bài
    setListMusic(musicList?.slice(0, numberOfVisibleItems)) // Cập nhật danh sách nhạc
  }, [musicList, widths]) // Cập nhật khi chiều rộng hoặc danh sách nhạc thay đổi

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
          blockSize: 'auto',
          display: 'flex',
          justifyContent: 'flex-start',
          overflow: 'hidden' // Ẩn đi phần không cần thiết
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            flexWrap: 'nowrap' // Không cho phép xuống dòng
          }}
        >
          {listMusic.map((music, index) => (
            <Box
              key={index}
              sx={{
                flexShrink: 0, // Ngăn cản item co lại
                flexBasis: 'auto', // Tự động điều chỉnh kích thước
                marginRight: '8px' // Khoảng cách giữa các item
              }}
            >
              <MusicTag music={music} />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  )
}
