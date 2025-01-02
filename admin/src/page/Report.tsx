import React, { useEffect, useState } from 'react'
import { Box, Pagination } from '@mui/material'
import './Report.css'
import { useNavigate } from 'react-router-dom'
import { DatumReportTrack, IDataReportTrack } from '../type/IReportTrack'
import { apiGetReportTrack } from '../Auth/ReportAPI'
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { styled, alpha } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search'
import Loader from '../components/Loader/Loader'
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
  'width': '100%', // Đặt width 100% để có thể dễ dàng thay đổi
  'height': '42px',
  '& .MuiOutlinedInput-root': {
    'color': '#fff', // Màu chữ trắng cho nền tối
    '& fieldset': {
      borderColor: '#777' // Màu viền khi không focus
    },
    '&:hover fieldset': {
      borderColor: 'var(--main-color)'
    },
    '&.Mui-focused fieldset': {
      borderColor: '#fff'
    }
  },
  '& .MuiInputLabel-root': {
    'color': '#bbb', // Màu nhãn khi không focus
    '&.Mui-focused': {
      color: '#fff' // Màu nhãn khi focus
    }
  },
  '& .MuiSvgIcon-root': {
    color: '#fff' // Màu của icon
  }
}

const Report = () => {
  const [tracks, setTracks] = useState<DatumReportTrack[]>([])
  const statusOrder: Record<IDataReportTrack['status'], number> = {
    unchecked: 0,
    checked: 1
  }
  const [isLoading, setIsLoading] = useState(false)
  const [limit, setLimit] = useState(5)
  const [page, setPage] = useState(1)
  const [totalUsers, setTotalUsers] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [search, setSearch] = useState('')

  const debouncedSearch = useDebounce(search, 500)
  const navigate = useNavigate()

  const fetchListReport = async () => {
    setIsLoading(true)
    try {
      const response = await apiGetReportTrack(limit, page, debouncedSearch)
      setTracks(response.result.data)
      setTotalUsers(response.result.meta.total_items)
      setTotalPages(response.result.meta.total_pages)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Error updating user:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchListReport()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, page, debouncedSearch])

  const handleTrackRowClick = (id: string) => {
    navigate('/report/trackreportcard', { state: { id } })
  }

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  const handleLimitChange = (event: SelectChangeEvent<number>) => {
    setLimit(Number(event.target.value))
    setPage(1)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setPage(1)
  }

  return (
    <div className='report-list'>
      <h2>Report List</h2>

      <Box p={3} sx={{ padding: '0px' }}>
        <div className='control' style={{ marginTop: '15px' }}>
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
          <table className='tableAdmin'>
            <thead>
              <tr>
                <th>No.</th>
                <th>Title</th>
                <th>Owners</th>
                <th>Album</th>
                <th>Count</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {tracks
                .sort((a, b) => statusOrder[a.status] - statusOrder[b.status])
                .map((track, index) => (
                  <tr key={track._id} onClick={() => handleTrackRowClick(track._id)}>
                    <td>{(page - 1) * limit + index + 1}</td>
                    <td>{track.name}</td>
                    <td>{Array.isArray(track.owners) && track.owners.length > 0 ? track.owners.map((owner) => owner.name).join(', ') : 'Null'}</td>
                    <td>{track.album.name}</td>
                    <td>{track.count}</td>
                    <td>{track.status}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}

        <div className='table-footer'>
          <span>
            Showing {(page - 1) * limit + 1} to {Math.min(page * limit, totalUsers)} of {totalUsers} entries
          </span>
          <div style={{ textAlign: 'right' }}>
            <CustomPagination count={totalPages} page={page} onChange={(e, value) => handlePageChange(e, value)} color='standard' />
          </div>
        </div>
      </Box>
    </div>
  )
}

export default Report
