import { useEffect, useState } from 'react'
import { TextField, Chip, Avatar } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import { useSearchWithParam } from '~/hooks/Search/useSearchWithParam'
import { IArtist } from '~/type/Artist/IArtist'

export default function TestUI() {
  const [keyword, setKeyword] = useState('')
  const { data, isLoading } = useSearchWithParam(keyword, 'artists')
  const [artistOptions, setArtistOptions] = useState<{ id: string; name: string; avatar: string }[]>([])

  useEffect(() => {
    if (data) {
      setArtistOptions(
        data.result.artists.map((artist: IArtist) => ({
          id: artist._id,
          name: artist.name,
          avatar: artist.avatar
        }))
      )
    } else if (keyword === '') {
      setArtistOptions([])
    } else {
      setArtistOptions([])
    }
  }, [data, keyword])

  return (
    <div>
      <Autocomplete
        multiple
        id='tags-outlined'
        options={artistOptions}
        getOptionLabel={(option: { name: string }) => option.name}
        filterSelectedOptions
        sx={{
          'width': '30%',
          '.MuiAutocomplete-inputRoot': {
            bgcolor: (theme) => theme.palette.neutral.neutral3,
            color: 'white',
            borderRadius: '5px'
          },
          '.MuiAutocomplete-tag': {
            bgcolor: (theme) => theme.palette.neutral.neutral2,
            color: 'white'
          },
          '.MuiAutocomplete-clearIndicator': {
            color: 'white'
          }
        }}
        slotProps={{
          paper: {
            sx: {
              bgcolor: (theme) => theme.palette.neutral.neutral3,
              color: 'white'
            }
          }
        }}
        noOptionsText="Không có dữ liệu"
        renderInput={(params) => (
          <TextField {...params} onChange={(e) => setKeyword(e.target.value)} placeholder={isLoading ? 'Đang tải...' : 'Nghệ sĩ'} />
        )}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              {...getTagProps({ index })}
              key={option.id}
              avatar={<Avatar src={option.avatar} />}
              label={option.name}
              sx={{
                'bgcolor': (theme) => theme.palette.neutral.neutral2,
                'color': 'white',
                '& .MuiAvatar-root': {
                  width: 24,
                  height: 24
                }
              }}
            />
          ))
        }
      />
    </div>
  )
}
