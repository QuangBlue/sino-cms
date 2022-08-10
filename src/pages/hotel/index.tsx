// ** React Imports
import { useState, forwardRef } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Tooltip from '@mui/material/Tooltip'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import DeleteOutline from 'mdi-material-ui/DeleteOutline'

// ** Third Party Imports
import format from 'date-fns/format'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

// ** Redux Imports
import BackupRestore from 'mdi-material-ui/BackupRestore'
import { Rating } from '@mui/material'
import DialogAlertDeleteHotel from 'src/views/hotel/DialogAlertDeleteHotel'
import TableHeaderHotel from 'src/views/hotel/TableHeaderHotel'

interface CustomInputProps {
  dates: Date[]
  label: string
  end: number | Date
  start: number | Date
  setDates?: (value: Date[]) => void
}

interface CellType {
  row: HotelType
}

export interface HotelType {
  id: number
  name: string
  star: number
  address: string
  price: string
  goolgeMap: string
  status: boolean
}

const data: HotelType[] = [
  {
    id: 1,
    name: 'Peninsula Excelsior',
    star: 3.7,
    address: 'ABC',
    price: 'S$100',
    goolgeMap: 'string',
    status: true
  },
  {
    id: 2,
    name: 'Pullman',
    star: 5,
    address: 'ABC',
    price: 'S$100',
    goolgeMap: 'string',
    status: true
  },
  {
    id: 3,
    name: 'Pullman',
    star: 5,
    address: 'ABC',
    price: 'S$100',
    goolgeMap: 'string',
    status: true
  },
  {
    id: 4,
    name: 'Pullman',
    star: 5,
    address: 'ABC',
    price: 'S$100',
    goolgeMap: 'string',
    status: true
  }
]

const defaultColumns = [
  {
    flex: 2,
    minWidth: 120,
    field: 'name',
    headerName: 'Name',

    renderCell: ({ row }: CellType) => <Typography variant='body2'>{`${row.name || ''}`}</Typography>
  },
  {
    flex: 2,
    field: 'star',
    minWidth: 150,
    headerName: 'Star',
    renderCell: ({ row }: CellType) => <Rating readOnly defaultValue={row.star} precision={0.5} />
  },

  {
    flex: 2,
    field: 'address',
    minWidth: 90,
    headerName: 'Address',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{`${row.address || ''}`}</Typography>
  },
  {
    flex: 1,
    minWidth: 90,
    field: 'price',
    headerName: 'Price',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{`${row.price || ''}`}</Typography>
  },

  {
    flex: 1,
    minWidth: 90,
    field: 'goolgeMap',
    headerName: 'Goolge Map',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row.goolgeMap}</Typography>
  }
]

/* eslint-disable */
const CustomInput = forwardRef((props: CustomInputProps, ref) => {
  const startDate = props.start !== null ? format(props.start, 'MM/dd/yyyy') : ''
  const endDate = props.end !== null ? ` - ${format(props.end, 'MM/dd/yyyy')}` : null

  const value = `${startDate}${endDate !== null ? endDate : ''}`
  props.start === null && props.dates.length && props.setDates ? props.setDates([]) : null
  const updatedProps = { ...props }
  delete updatedProps.setDates

  return <TextField fullWidth inputRef={ref} {...updatedProps} label={props.label || ''} value={value} />
})
/* eslint-enable */

const HotelList = () => {
  // ** State
  const [value, setValue] = useState<string>('')
  const [pageSize, setPageSize] = useState<number>(10)

  // const [selectedRows, setSelectedRows] = useState<GridRowId[]>([])

  // ** Hooks
  // const dispatch = useDispatch<AppDispatch>()

  // const store = useSelector((state: RootState) => state.agent)

  // useEffect(() => {
  //   dispatch(fetchAgent())

  //   return () => {
  //     agentSlice.actions.handlePageChange()
  //   }
  // }, [dispatch])

  const handleFilter = (val: string) => {
    setValue(val)

    // dispatch(fetchAgent(val))
  }

  // Handle Detele Hotel
  const handleSubmitDeleteHotel = (rowId: number, handleCloseAlert: () => void) => {
    console.log(rowId)
    handleCloseAlert()
  }

  const handleSubmitResumeHotel = (rowId: number, handleCloseAlert: () => void) => {
    console.log(rowId)
    handleCloseAlert()
  }

  const columns = [
    ...defaultColumns,
    {
      flex: 1,
      minWidth: 130,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }: CellType) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [open, setOpen] = useState<boolean>(false)
        const handleClickOpenAlert = () => setOpen(true)
        const handleCloseAlert = () => setOpen(false)

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title={row.status ? 'Delete Hotel' : 'Resume Hotel'}>
              <IconButton size='small' sx={{ mr: 0.5 }} onClick={handleClickOpenAlert}>
                {row.status ? <DeleteOutline /> : <BackupRestore />}
              </IconButton>
            </Tooltip>
            <Tooltip title='View'>
              <Box>
                <Link href={`/hotel/view/${row.id}`} passHref>
                  <IconButton size='small' component='a' sx={{ textDecoration: 'none', mr: 0.5 }}>
                    <EyeOutline />
                  </IconButton>
                </Link>
              </Box>
            </Tooltip>
            {/* <RowOptions id={row.id} /> */}
            <DialogAlertDeleteHotel
              open={open}
              dataHotel={row}
              handleCloseAlert={handleCloseAlert}
              handleSubmit={() =>
                row.status
                  ? handleSubmitDeleteHotel(row.id, handleCloseAlert)
                  : handleSubmitResumeHotel(row.id, handleCloseAlert)
              }
            />
          </Box>
        )
      }
    }
  ]

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <TableHeaderHotel value={value} /* selectedRows={selectedRows} */ handleFilter={handleFilter} />
          <DataGrid
            autoHeight
            pagination
            rows={data}
            columns={columns}
            disableSelectionOnClick
            pageSize={Number(pageSize)}
            rowsPerPageOptions={[10, 25, 50]}
            sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
            onPageSizeChange={newPageSize => setPageSize(newPageSize)}
          />
        </Card>
      </Grid>
    </Grid>
  )
}

export default HotelList
