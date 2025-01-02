import { useLocation, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { ChangeCircleOutlined, Close } from '@mui/icons-material'
import { styled, alpha } from '@mui/material/styles'
import SearchIcon from '@mui/icons-material/Search'
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  InputBase,
  SelectChangeEvent,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  Backdrop,
  CircularProgress
} from '@mui/material'
import { ITrackInfo, ITrackReport } from '../type/IReportTrack'
import { apiGetDetailReportTrack, apiGetInfoTrack } from '../Auth/ReportAPI'
import useDebounce from '../hooks/useDebounce'
import Loader from '../components/Loader/Loader'
import { toast } from 'react-toastify'
import { apiUpdateTrack } from '../Auth/TrackModerationAPI'

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

const DetailTrackReport = () => {
  const [limit, setLimit] = useState(5)
  const [page, setPage] = useState(1)
  const [listReport, setListReport] = useState<ITrackReport[]>([])
  const [infoTrack, setInfoTrack] = useState<ITrackInfo>()
  const [status, setStatus] = useState<number>(1)
  const [search, setSearch] = useState('')
  const [totalReport, setTotalReport] = useState(0)
  const navigate = useNavigate()
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = React.useState(false)
  const { id } = location.state as { id: string }

  const debouncedSearch = useDebounce(search, 500)

  const fetchListReport = async () => {
    try {
      const response = await apiGetDetailReportTrack(id, limit, page, debouncedSearch)
      if (!response.result) {
        throw new Error('Network response was not ok')
      }
      setListReport(response.result.data)
      setTotalReport(response.result.meta.total_items)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching users:', error)
    } finally {
      // setIsLoading(false)
    }
  }

  const fetchTrackInfo = async () => {
    try {
      setIsLoading(true)
      const response = await apiGetInfoTrack(id)
      if (!response.result) {
        throw new Error('Network response was not ok')
      }
      setInfoTrack(response.result)
      setStatus(response.result.status === 'active' ? 0 : 1)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching users:', error)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    fetchTrackInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    fetchListReport()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, debouncedSearch])

  const handleClose = () => {
    navigate('/report')
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

  const handleRowClick = (idrp: string) => {
    navigate('/report/trackreportcard/detailreport', { state: { idrp, id } })
  }

  const handleClickOpenAlert = () => {
    setOpen(true)
  }

  const handleCloseAlert = () => {
    setOpen(false)
  }

  const handleUpdateTrack = async (): Promise<void> => {
    handleCloseAlert()
    try {
      setLoading(true)

      if (status !== undefined) {
        const response = await apiUpdateTrack(id, {
          status: status === 0 ? 'active' : 'banned'
        })
        // eslint-disable-next-line no-console
        console.error('mess:', response.message)

        if (response.message === 'Update status track success') {
          toast.success('Status track updated successfully')
          navigate('/report')
        } else {
          toast.error('Failed to update track status. Please try again.')
        }
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Error updating user:', err)
      toast.error('An error occurred while updating track status.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='report'>
      {isLoading ? (
        <Loader />
      ) : (
        <div className='popup'>
          <div className='popup-inner'>
            <div className='usercard' style={{ paddingBottom: '80px' }}>
              <div className='close'>
                <Close onClick={handleClose} style={{ cursor: 'pointer' }} />
              </div>
              <div className='user'>
                <div style={{ maxWidth: '40%', height: '200px', borderRadius: '8px' }}>
                  <img src={infoTrack?.image} alt='User Avatar' style={{ width: '100%', height: '200px', borderRadius: '8px' }} />
                </div>
                <div style={{ marginLeft: '20px' }}>
                  <div className='name' style={{ marginBottom: '20px' }}>
                    <p style={{ fontSize: '30px' }}>
                      <b>{infoTrack?.name}</b>
                    </p>
                    <div className='status'>
                      {status ? <div style={{ backgroundColor: 'red' }}>Banned</div> : <div style={{ backgroundColor: 'green' }}>Active</div>}
                      <ChangeCircleOutlined
                        onClick={() => setStatus(status === 0 ? 1 : 0)}
                        style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                      />
                    </div>
                  </div>
                  <p>
                    <strong>Album:</strong> {infoTrack?.album.name}
                  </p>
                  <p>
                    <strong>Genres:</strong> {infoTrack?.genre.name}
                  </p>
                  <p>
                    <strong>Owners:</strong>{' '}
                    {Array.isArray(infoTrack?.owners) && infoTrack?.owners.length > 0
                      ? infoTrack?.owners.map((owner) => owner.name).join(', ')
                      : 'Null'}
                  </p>
                  <p>
                    <strong>Created at:</strong> {infoTrack?.created_at ? new Date(infoTrack.created_at).toLocaleDateString() : 'N/A'}
                  </p>
                  <p>
                    <strong>Number of violations:</strong> {infoTrack?.number_of_violations}
                  </p>
                </div>
              </div>
              <Button
                variant='contained'
                onClick={handleClickOpenAlert}
                sx={{
                  'width': '150px',
                  'backgroundColor': 'var(--main-color)',
                  'padding': 1,
                  'borderRadius': '25px',
                  '&:hover': {
                    backgroundColor: 'var(--main-color)',
                    transform: 'scale(1.04)'
                  },
                  '&.Mui-disabled': {
                    backgroundColor: '#b0b0b0',
                    color: '#ffffff'
                  }
                }}
              >
                Update
              </Button>
              <Dialog open={open} onClose={handleCloseAlert} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
                <DialogTitle id='alert-dialog-title' sx={{ color: 'var(--main-text-color)', backgroundColor: 'var(--secondary-background-color)' }}>
                  Do you want to update?
                </DialogTitle>
                <DialogActions sx={{ backgroundColor: 'var(--secondary-background-color)' }}>
                  <Button
                    onClick={handleCloseAlert}
                    sx={{
                      'color': 'var(--main-color)',
                      '&:hover': {
                        backgroundColor: 'transparent',
                        transform: 'scale(1.1)'
                      }
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleUpdateTrack}
                    sx={{
                      'color': 'var(--main-color)',
                      '&:hover': {
                        backgroundColor: 'transparent',
                        transform: 'scale(1.1)'
                      }
                    }}
                    autoFocus
                  >
                    Confirm
                  </Button>
                </DialogActions>
              </Dialog>
              <Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })} open={loading}>
                <CircularProgress color='inherit' />
              </Backdrop>
            </div>

            <div className='userAlbums'>
              <div>
                <h3 className='totalAlbums'>Total Reports: {totalReport}</h3>
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

                <table className='tableAdmin'>
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Name</th>
                      <th>Reason</th>
                      <th>Report Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listReport.slice((page - 1) * limit, page * limit).map((report, index) => (
                      <tr key={report._id} onClick={() => handleRowClick(report._id)}>
                        <td>{(page - 1) * limit + index + 1}</td>
                        <td>{report.reporters.name}</td>
                        <td>{report.reason.length === 1 ? report.reason[0] : <>{report.reason[0]}, ...</>}</td>
                        <td>{new Date(report.created_at).toLocaleDateString()}</td>
                        <td>{report.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className='table-footer'>
                  <span>
                    Showing {(page - 1) * limit + 1} to {Math.min(page * limit, totalReport)} of {totalReport} entries
                  </span>
                  <CustomPagination count={Math.ceil(totalReport / limit)} page={page} onChange={(e, value) => handlePageChange(e, value)} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DetailTrackReport
