// ** React Imports
import { useState, forwardRef, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Tooltip from '@mui/material/Tooltip'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'
import { Rating } from '@mui/material'

// ** Icons Imports
import DeleteOutline from 'mdi-material-ui/DeleteOutline'
import PencilOutline from 'mdi-material-ui/PencilOutline'

// ** Types Imports
import { HotelTypes } from 'src/types/hotelTypes'

// ** Third Party Imports
import format from 'date-fns/format'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

// ** Redux Imports
import BackupRestore from 'mdi-material-ui/BackupRestore'
import { fetchHotel, hotelSlice, deleteHotel, resumeHotel } from 'src/store/hotel'
import { AppDispatch, RootState } from 'src/store'

// ** View Imports
import DialogAlertDeleteHotel from 'src/views/hotel/DialogAlertDeleteHotel'
import TableHeaderHotel from 'src/views/hotel/TableHeaderHotel'
import DialogHotel from 'src/views/hotel/DialogHotel'

// ** Store & Actions Imports
import { useDispatch, useSelector } from 'react-redux'

interface CustomInputProps {
  dates: Date[]
  label: string
  end: number | Date
  start: number | Date
  setDates?: (value: Date[]) => void
}

interface CellType {
  row: HotelTypes
}

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
    flex: 1,
    minWidth: 90,
    field: 'price',
    headerName: 'Price',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{`${row.price || 0}`}</Typography>
  },
  {
    flex: 1,
    minWidth: 90,
    field: 'googleMap',
    headerName: 'Google Map',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row.location}</Typography>
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
  const [isOpenDialogHotel, setIsOpenDialogHotel] = useState<boolean>(false)
  const [selectedRows, setSelectedRows] = useState<HotelTypes | undefined>(undefined)

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()

  const store = useSelector((state: RootState) => state.hotel)

  const onToggleDialog = () => {
    setIsOpenDialogHotel(!isOpenDialogHotel)
    if (!isOpenDialogHotel) { 
      setSelectedRows(undefined)
    }
  }

  const handleFilter = (val: string) => {
    setValue(val)

    dispatch(fetchHotel(val))
  }

  // Handle Detele Hotel
  const handleSubmitDeleteHotel = (rowId: number, handleCloseAlert: () => void) => {
    dispatch(deleteHotel(rowId)).then(() => {
      handleCloseAlert()
    })
  }

  const handleSubmitResumeHotel = (rowId: number, handleCloseAlert: () => void) => {
    dispatch(resumeHotel(rowId)).then(() => {
      handleCloseAlert()
    })
  }

  useEffect(() => {
    dispatch(fetchHotel())

    return () => {
      hotelSlice.actions.handlePageChange()
    }

  }, [dispatch])

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
            <Tooltip title='Edit'>
              <Box>
                <IconButton 
                  size='small' 
                  component='a' 
                  sx={{ textDecoration: 'none', mr: 0.5 }} 
                  onClick={() => {
                    setSelectedRows(row),
                    setIsOpenDialogHotel(true)
                  }}
                >
                  <PencilOutline />
                </IconButton>
              </Box>
            </Tooltip>

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
          <TableHeaderHotel value={value} handleFilter={handleFilter} handleOpenDialog={onToggleDialog} />
          <DialogHotel open={isOpenDialogHotel} handleClose={onToggleDialog} params={selectedRows} />
          <DataGrid
            autoHeight
            pagination
            rows={store.listHotel}
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
