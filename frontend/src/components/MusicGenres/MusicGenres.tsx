import Grid from '@mui/material/Grid'
import GenresTag from './GenresTag/GenresTag'
import useGetGenres from '~/hooks/Genres/useGetGenres'
import { IGenres } from '~/type/Genres/IGenres'
import { useState } from 'react'
import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'

type Props = {
  activeGenres: string
  setActiveGenres: React.Dispatch<React.SetStateAction<string>>
}

export default function MusicGenres({ activeGenres, setActiveGenres }: Props) {
  const { data } = useGetGenres()
  const listGenres = (data?.result as IGenres[]) || []
  const [listNames, setListNames] = useState<IGenres | null>(null)

  const handleClick = (genre: IGenres) => {
    setActiveGenres(genre._id)
    setListNames(genre)
  }

  const handleRemoveName = () => {
    setListNames(null)
    setActiveGenres('')
  }

  return (
    <Box>
      <Box sx={{ marginBottom: '16px', display: 'flex', flexWrap: 'wrap' }}>
        {listNames && (
          <Chip
            key={listNames._id}
            label={listNames.name}
            onDelete={() => handleRemoveName()}
            sx={{ margin: '4px', bgcolor: (theme) => theme.palette.neutral.neutral1 }}
          />
        )}
      </Box>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {listGenres.map((genre, index) => (
          <Grid
            item
            xs={index % 5 < 3 ? 4 : 6}
            key={genre._id}
            sx={{
              display: 'flex',
              justifyContent: 'space-evenly',
              alignItems: 'center'
            }}
          >
            <GenresTag
              imageSrc={genre.image}
              title={genre.name}
              isActive={activeGenres.includes(genre._id)}
              onClick={() => handleClick(genre)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
