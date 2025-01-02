import Grid from '@mui/material/Grid'
import GenresTag from './GenresTag/GenresTag'
import useGetGenres from '~/hooks/Genres/useGetGenres'
import { IGenres } from '~/type/Genres/IGenres'
import { useEffect, useMemo, useState } from 'react'
import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'

type Props = {
  activeGenres: string[]
  setActiveGenres: React.Dispatch<React.SetStateAction<string[]>>
}

export default function AuthGenres({ activeGenres, setActiveGenres }: Props) {
  const { data } = useGetGenres()
  const listGenres = useMemo(() => {
    return Array.isArray(data?.result) ? data.result : []
  }, [data])
  const [listNames, setListNames] = useState<IGenres[]>([])

  const handleClick = (genres: IGenres) => {
    setActiveGenres((prev) => {
      if (prev?.includes(genres._id)) {
        return prev.filter((genre) => genre !== genres._id)
      } else {
        return [...(prev || []), genres._id]
      }
    })
  }

  useEffect(() => {
    if (Array.isArray(listGenres) && Array.isArray(activeGenres)) {
      const updatedListNames = listGenres.filter((genre) => activeGenres.includes(genre._id))
      setListNames(updatedListNames)
    }
  }, [activeGenres, listGenres])

  const handleRemoveName = (data: IGenres) => {
    setActiveGenres((prev) => prev.filter((genre) => genre !== data._id))
  }

  return (
    <Box>
      <Box sx={{ marginBottom: '16px', display: 'flex', flexWrap: 'wrap' }}>
        {listNames.map((name) => (
          <Chip
            key={name._id}
            label={name.name}
            onDelete={() => handleRemoveName(name)}
            sx={{ margin: '4px', bgcolor: (theme) => theme.palette.neutral.neutral1 }}
          />
        ))}
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
            <GenresTag imageSrc={genre.image} title={genre.name} isActive={activeGenres?.includes(genre._id)} onClick={() => handleClick(genre)} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
