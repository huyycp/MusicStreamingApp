/* eslint-disable indent */
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'

export type Status = 'all' | 'pending' | 'available' | 'banned' | 'occupied'

type SelectLabelsProps = {
  selectedStatus: Status
  // eslint-disable-next-line no-unused-vars
  setSelectedStatus: (status: Status) => void
}

export default function SelectedStatus({ selectedStatus, setSelectedStatus }: SelectLabelsProps) {
  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value as Status
    if (['all', 'pending', 'available', 'banned', 'occupied'].includes(value)) {
      setSelectedStatus(value)
    }
  }

  const translateStatus = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Chờ duyệt'
      case 'all':
        return 'Tất cả'
      case 'banned':
        return 'Bị cấm'
      case 'occupied':
        return 'Đã thuộc album'
      case 'available':
        return 'Chưa thuộc album'
      default:
        return 'Không xác định'
    }
  }

  return (
    <FormControl
      sx={{
        'minWidth': 120,
        'backgroundColor': (theme) => theme.palette.neutral.neutral3,
        'borderRadius': 1,
        '& .MuiSelect-root': {
          color: 'white',
          p: 'unset'
        },
        '& .MuiSvgIcon-root': {
          color: '#fff'
        },
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: 'green'
        },
        '& .MuiOutlinedInput-input': {
          p: 1,
          width: '140px'
        }
      }}
    >
      <Select
        labelId='demo-simple-select-helper-label'
        id='demo-simple-select-helper'
        value={selectedStatus}
        onChange={handleChange}
        displayEmpty
        MenuProps={{
          PaperProps: {
            sx: {
              '& .MuiList-root': {
                p: 0
              }
            }
          }
        }}
        sx={{
          '& .MuiSelect-select': {
            color: 'white',
            backgroundColor: (theme) => theme.palette.neutral.neutral3
          },
          'p': 'unset'
        }}
      >
        {['all', 'pending', 'available', 'banned', 'occupied'].map((status) => (
          <MenuItem
            key={status}
            value={status}
            sx={{
              'backgroundColor': (theme) => theme.palette.neutral.neutral3,
              'color': 'white',
              '&:hover': {
                backgroundColor: (theme) => theme.palette.neutral.neutral2
              },
              '&.Mui-selected': {
                'backgroundColor': (theme) => theme.palette.neutral.neutral1,
                'color': 'white',
                '&:hover': {
                  backgroundColor: (theme) => theme.palette.neutral.neutral2
                }
              }
            }}
          >
            {translateStatus(status)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
