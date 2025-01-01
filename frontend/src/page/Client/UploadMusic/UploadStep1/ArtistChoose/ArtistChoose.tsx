import { Avatar } from '@mui/material'
import { useEffect, useState } from 'react'
import { Autocomplete, Chip, TextField } from '@mui/material'
import { useSearchWithParam } from '~/hooks/Search/useSearchWithParam'
import { IArtist } from '~/type/Artist/IArtist'

interface ArtistChooseProps {
  value: string[]
  // eslint-disable-next-line no-unused-vars
  onChange: (newValue: string[]) => void
}

export default function ArtistChoose({ value, onChange }: ArtistChooseProps) {
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
    <div style={{ width: '100%' }}>
      <Autocomplete
        multiple
        id='tags-outlined'
        options={artistOptions}
        getOptionLabel={(option: { id: string; name: string; avatar: string }) => option.name}
        value={artistOptions.filter((artist) => value.includes(artist.id))}
        onChange={(_, newValue: { id: string; name: string; avatar: string }[]) => {
          onChange(newValue.map((item) => item.id))
        }}
        filterSelectedOptions
        sx={{
          'width': '100%',
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
        noOptionsText='Không có dữ liệu'
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
