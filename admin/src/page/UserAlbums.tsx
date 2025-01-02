import { styled, alpha } from '@mui/material/styles'
import './UserCard.css'
import SearchIcon from '@mui/icons-material/Search'
import { FormControl, InputBase, InputLabel, MenuItem, Pagination, Select, SelectChangeEvent } from '@mui/material'
import { useEffect, useState } from 'react'
import { IUserAlbums } from '../type/IUserAlbums'
import { apiGetUserAlbums } from '../Auth/UserCardAPI'
import Loader from '../components/Loader/Loader'
import { useNavigate } from 'react-router-dom'
import useDebounce from '../hooks/useDebounce'
const Search = styled('div')(({ theme }) => ({
  'position': 'absolute',
  'right': '-20px',
  'borderRadius': theme.shape.borderRadius,
  'backgroundColor': alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  'marginLeft': 0,
  'width': '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto'
  }
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  'color': 'inherit',
  'width': '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      'width': '12ch',
      '&:focus': {
        width: '15ch'
      }
    }
  }
}))

const CustomPagination = styled(Pagination)({
  '& .MuiPaginationItem-root': {
    'color': 'white',
    '&:hover': {
      backgroundColor: 'var(--secondary-color)'
    }
  },
  '& .Mui-selected': {
    'backgroundColor': 'var(--main-color) !important',
    'color': 'white',
    'pointerEvents': 'none',
    '&:hover': {
      backgroundColor: 'var(--main-color)'
    }
  }
})

const UserAlbums = ({ iduser }: { iduser: string }) => {
  const [useralbums, setUserAlbums] = useState<IUserAlbums | null>(null)
  const [limit, setLimit] = useState(5)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [totalAlbums, setTotalAlbums] = useState(Number)
  const [isLoading, setIsLoading] = useState(false)

  const debouncedSearch = useDebounce(search, 500)
  const navigate = useNavigate()

  const fetchUserAlbums = async () => {
    setIsLoading(true)
    try {
      const response = await apiGetUserAlbums(iduser, limit, page, debouncedSearch)
      // eslint-disable-next-line no-console
      console.log(response)
      setUserAlbums(response)
      setTotalAlbums(response.result.meta.total_items)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching users:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUserAlbums()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, page, debouncedSearch])

  const handleLimitChange = (event: SelectChangeEvent<number>) => {
    setLimit(Number(event.target.value))
    setPage(1)
  }

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  const handleRowClick = (idab: string) => {
    // eslint-disable-next-line no-console
    console.log(idab)
    navigate('/user/card/detailalbum', { state: { iduser, idab } })
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setPage(1)
  }

  return (
    <div>
      <h3 className='totalAlbums'>Total Album: {totalAlbums}</h3>
      <div className='searchalbum'>
        <FormControl
          size='small'
          sx={{
            'width': '100px',
            'height': '42px',
            '& .MuiOutlinedInput-root': {
              'color': '#fff',
              '& fieldset': {
                borderColor: '#777'
              },
              '&:hover fieldset': {
                borderColor: 'var(--primary-main)'
              },
              '&.Mui-focused fieldset': {
                borderColor: '#fff'
              }
            },
            '& .MuiInputLabel-root': {
              'color': '#bbb',
              '&.Mui-focused': {
                color: '#fff'
              }
            },
            '& .MuiSvgIcon-root': {
              color: '#fff'
            }
          }}
        >
          <InputLabel id='demo-simple-select-label'>Show</InputLabel>
          <Select labelId='demo-simple-select-label' id='demo-simple-select' value={limit} label='Show' onChange={handleLimitChange}>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </Select>
        </FormControl>

        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase placeholder='Search…' inputProps={{ 'aria-label': 'search' }} value={search} onChange={handleSearchChange} />
        </Search>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <table className='tableAdmin'>
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Created at</th>
              <th>Updated at</th>
              <th>Artists</th>
              <th>Tracks</th>
            </tr>
          </thead>
          <tbody>
            {useralbums?.result.data.map((useralbum, index) => (
              <tr key={useralbum._id} onClick={() => handleRowClick(useralbum._id)}>
                <td className='id'>{(page - 1) * limit + index + 1}</td>
                <td>{useralbum.name}</td>
                <td>{new Date(useralbum.created_at).toLocaleDateString()}</td>
                <td>{new Date(useralbum.number_of_tracks).toLocaleDateString()}</td>
                <td>
                  {Array.isArray(useralbum.owners) && useralbum.owners.length > 0 ? useralbum.owners.map((owner) => owner.name).join(', ') : 'Null'}
                </td>
                <td>{useralbum.number_of_tracks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className='table-footer'>
        <span>
          Showing {(page - 1) * limit + 1} to {Math.min(page * limit, useralbums?.result.meta.total_items as number)} of{' '}
          {useralbums?.result.meta.total_items} entries
        </span>
        <div style={{ textAlign: 'right' }}>
          <CustomPagination
            count={useralbums?.result.meta.total_pages}
            page={page}
            onChange={(e, value) => handlePageChange(e, value)}
            color='standard'
          />
        </div>
      </div>
    </div>
  )
}

export default UserAlbums
