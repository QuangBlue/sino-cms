// ** React Imports
import { useState, Fragment, ChangeEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import Collapse from '@mui/material/Collapse'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import TableContainer from '@mui/material/TableContainer'

// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import { TablePagination, Tooltip } from '@mui/material'
import { DeleteOutline, FormatListNumbered, Pencil } from 'mdi-material-ui'
import { PackageTypes } from 'src/types/eventTypes'
import { useSelector } from 'react-redux'
import { RootState } from 'src/store'
import { formatDate } from 'src/@core/utils/format'

interface PriceTypes {
  id: number
  price: number
  stockLimit: number
  periodStart: string
  periodEnd: string
}

interface PackageTypesData {
  id: number
  name: string
  benefit: string[]
  listPrice: PriceTypes[]
  type: string
}

const createData = (data: PackageTypes[]) => {
  const d: PackageTypesData[] = []
  data.map(p => {
    if (p.priceType === 'normal') {
      d.push({
        id: p.id,
        name: p.name,
        benefit: [],
        listPrice: [
          {
            id: p.id,
            price: p.price,
            stockLimit: p.stockLimit,
            periodStart: p.periodStart,
            periodEnd: p.periodEnd
          }
        ],
        type: p.type
      })
    }
  })

  data.map(p => {
    if (p.priceType === 'early-bird') {
      const index = d.findIndex(item => item.name === p.name)
      if (index !== -1) {
        d[index].listPrice.push({
          id: p.id,
          price: p.price,
          stockLimit: p.stockLimit,
          periodStart: p.periodStart,
          periodEnd: p.periodEnd
        })
      }
    }
  })

  return d
}

const TableCollapsible = () => {
  // ** States
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
  const store = useSelector((state: RootState) => state.packageEvent)

  const data = createData(store.packages)

  console.log(data)

  return (
    <Box>
      <TableContainer>
        <Table stickyHeader aria-label='collapsible table'>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Title Package</TableCell>
              <TableCell align='right'>Type</TableCell>
              <TableCell align='right'>Benefit</TableCell>
              <TableCell align='right'>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map(row => (
              <Row key={row.id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {data.length === 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 10 }}>
          <Typography variant='inherit'> No package </Typography>
        </Box>
      )}
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  )
}

const Row = (props: { row: PackageTypesData }) => {
  // ** Props
  const { row } = props

  // ** State
  const [open, setOpen] = useState<boolean>(false)

  return (
    <Fragment>
      <TableRow hover sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
            {open ? <ChevronUp /> : <ChevronDown />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>
          {row.name}
        </TableCell>
        <TableCell align='right'>{row.type}</TableCell>
        <TableCell align='right'>
          <Tooltip title={'View benefit'}>
            <IconButton size='small'>
              <FormatListNumbered />
            </IconButton>
          </Tooltip>
        </TableCell>

        <TableCell align='right'>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Tooltip title={'Edit Package'}>
              <IconButton size='small' sx={{ mr: 0.5 }}>
                <Pencil />
              </IconButton>
            </Tooltip>
            <Tooltip title={'Delete Package'}>
              <IconButton size='small'>
                <DeleteOutline />
              </IconButton>
            </Tooltip>
          </Box>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={7} sx={{ py: '0 !important' }}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ m: 2 }}>
              <Typography variant='h6' gutterBottom component='div'>
                List Price
              </Typography>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell>Start Date</TableCell>
                    <TableCell>End Date</TableCell>
                    <TableCell align='right'>Price</TableCell>
                    <TableCell align='right'>Limit</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.listPrice.map(price => (
                    <TableRow key={price.periodStart}>
                      <TableCell component='th' scope='row'>
                        {formatDate(price.periodStart || '')}
                      </TableCell>
                      <TableCell>{formatDate(price.periodEnd || '')}</TableCell>
                      <TableCell align='right'>{price.price}</TableCell>
                      <TableCell align='right'>{price.stockLimit}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  )
}

export default TableCollapsible
