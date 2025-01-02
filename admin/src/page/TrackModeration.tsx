import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import './User.css'
// import useDebounce from '../hooks/useDebounce'
import { FormControl, InputLabel, MenuItem, Pagination, Select, SelectChangeEvent } from '@mui/material'
import { styled, alpha } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search'
import Loader from '../components/Loader/Loader'
import { apiGetListTrack } from '../Auth/TrackModerationAPI'
import { Datum } from '../type/ITrackModeration'
import useDebounce from '../hooks/useDebounce'

const Search = styled('div')(({ theme }) => ({
  'position': 'relative',
  'borderRadius': theme.shape.borderRadius,
  'backgroundColor': alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  'marginRight': theme.spacing(2),
  'marginLeft': 0,
  'width': '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto'
  }
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  'color': theme.palette.common.white,
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch'
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

const formControlStyles = {
  'width': '100%',
  'height': '42px',
  '& .MuiOutlinedInput-root': {
    'color': '#fff',
    '& fieldset': {
      borderColor: '#777'
    },
    '&:hover fieldset': {
      borderColor: 'var(--main-color)'
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
}

const Track: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const location = useLocation()
  const { limit: lim } = (location.state as { limit?: number }) || {}
  const [limit, setLimit] = useState(lim ?? 5)
  const pageFromUrl = Number(searchParams.get('page')) || 1
  const [page, setPage] = useState(pageFromUrl)
  const [search, setSearch] = useState('')
  const [totalUsers, setTotalUsers] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [data, setData] = useState<Datum[]>([])

  const debouncedSearch = useDebounce(search, 500)
  const navigate = useNavigate()

  const fetchListTrack = async () => {
    setIsLoading(true)
    try {
      const response = await apiGetListTrack(limit, page, debouncedSearch)
      // eslint-disable-next-line no-console
      console.log('listtrackpending', response)
      setData(response.result.data)
      setTotalUsers(response.result.meta.total_items)
      setTotalPages(response.result.meta.total_pages)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching users:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchListTrack()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, page, debouncedSearch])

  const handleLimitChange = (event: SelectChangeEvent<number>) => {
    const newLimit = Number(event.target.value)
    setLimit(newLimit)
    setPage(1)
    setSearchParams({
      page: '1',
      limit: newLimit.toString()
    })
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setPage(1)
  }

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
    setSearchParams({
      page: value.toString(),
      limit: limit.toString()
    })
  }

  const handleRowClick = (idtrack: string) => {
    navigate('/track/detailtrack', { state: { idtrack } })
  }

  return (
    <div className='background'>
      <h2>Track Pending List</h2>
      <div className='control'>
        <FormControl sx={{ ...formControlStyles, width: '100px' }} size='small'>
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
        <>
          <table className='tableAdmin'>
            <thead>
              <tr>
                <th>No.</th>
                <th>Title</th>
                <th>Genre</th>
                <th>Owners</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((dt, index) => (
                // <tr key={dt._id}>
                <tr key={dt._id} onClick={() => handleRowClick(dt._id)}>
                  <td className='id'>{(page - 1) * limit + index + 1}</td>
                  <td>{dt.name}</td>
                  <td>{dt.genre.name}</td>
                  <td>{Array.isArray(dt.owners) && dt.owners.length > 0 ? dt.owners.map((owner) => owner.name).join(', ') : 'Null'}</td>
                  <td>{dt.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      <div className='table-footer'>
        <span>
          Showing {(page - 1) * limit + 1} to {Math.min(page * limit, totalUsers)} of {totalUsers} entries
        </span>
        <div style={{ textAlign: 'right' }}>
          <CustomPagination count={totalPages} page={page} onChange={(e, value) => handlePageChange(e, value)} color='standard' />
        </div>
      </div>
    </div>
  )
}

export default Track
