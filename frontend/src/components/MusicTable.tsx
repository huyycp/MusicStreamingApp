import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { IMusic } from '~/type/IMusic'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import { useState } from 'react'
import SortIcon from '@mui/icons-material/Sort'

type Props = {
  listMusic: IMusic[]
}

type SortOrder = 'asc' | 'desc'

export default function MusicTable({ listMusic }: Props) {
  const theme = useTheme()
  const textColor = theme.palette.secondary4.main

  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      // Nếu đã chọn cột này, đổi chiều sắp xếp
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      // Nếu chọn cột mới, sắp xếp theo chiều a->z
      setSortColumn(column)
      setSortOrder('asc')
    }
  }

  const sortedList = [...listMusic].sort((a, b) => {
    if (!sortColumn) return 0
    const aValue = a[sortColumn as keyof IMusic] as string
    const bValue = b[sortColumn as keyof IMusic][0] as string
    if (sortOrder === 'asc') {
      return aValue.localeCompare(bValue)
    } else {
      return bValue.localeCompare(aValue)
    }
  })

  return (
    <TableContainer component={Paper} sx={{ minWidth: 150, maxWidth: '100%', overflowX: 'auto', bgcolor: 'transparent' }}>
      <Table aria-label='music table' sx={{ tableLayout: 'fixed' }}>
        <TableHead sx={{ bgcolor: theme.palette.secondary5.main }}>
          <TableRow>
            <TableCell sx={{ color: textColor, cursor: 'pointer' }} onClick={() => handleSort('name')}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                Song <SortIcon sx={{ fontSize: 16 }} />
              </Box>
            </TableCell>
            <TableCell align='left' sx={{ color: textColor, cursor: 'pointer' }}>
              Artist
            </TableCell>
            <TableCell align='right' sx={{ color: textColor, width: '60px' }}>
              Views
            </TableCell>
            <TableCell align='right' sx={{ color: textColor, width: '60px' }}>
              Release
            </TableCell>
            <TableCell align='right' sx={{ color: textColor, width: '60px' }}>
              Likes
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ bgcolor: theme.palette.neutral.neutral3 }}>
          {sortedList.map((row) => (
            <TableRow key={row._id}>
              <TableCell
                component='th'
                scope='row'
                sx={{ color: textColor, maxWidth: 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
              >
                <Box display='flex' alignItems='center'>
                  <img src={row.artUrl.replace('{w}', '50').replace('{h}', '50')} alt={row.name} style={{ marginRight: 8, width: 50, height: 50 }} />
                  <Typography noWrap variant='body2'>
                    {row.name}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align='left'>
                <Typography
                  noWrap
                  variant='body2'
                  sx={{ maxWidth: 250, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: textColor }}
                >
                  {row.artistName.join(', ')}
                </Typography>
              </TableCell>
              <TableCell align='right' sx={{ color: textColor }}>
                N/A
              </TableCell>
              <TableCell align='right' sx={{ color: textColor }}>
                N/A
              </TableCell>
              <TableCell align='right' sx={{ color: textColor }}>
                N/A
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
