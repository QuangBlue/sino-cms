// ** React Imports
import { useState, useCallback } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Tooltip from '@mui/material/Tooltip'
import { DataGrid } from '@mui/x-data-grid'
import { styled } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import DeleteOutline from 'mdi-material-ui/DeleteOutline'

// ** Custom Component Imports
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'
import { EventTypes } from 'src/types/eventTypes'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import Grid from '@mui/material/Grid'
import FormCreateEventSchema from './FormCreateEventSchema'
import DialogAlertDeleteEvent from './DialogAlertDeleteEvent'
import { companyDetailSlice, deleteEvent, getEvent, resumeEvent } from 'src/store/company/view'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import BackupRestore from 'mdi-material-ui/BackupRestore'

interface CellType {
  row: EventTypes
}

const StyledLink = styled('a')(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const defaultColumns = [
  {
    flex: 0.2,
    field: 'id',
    minWidth: 90,
    headerName: '# ID',
    renderCell: ({ row }: CellType) => (
      <Link href={`/event/view/${row.id}`} passHref>
        <StyledLink>{`#${row.id}`}</StyledLink>
      </Link>
    )
  },

  {
    flex: 0.25,
    minWidth: 90,
    field: 'name',
    headerName: 'Name',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row.name || ''}</Typography>
  },
  {
    flex: 0.25,
    minWidth: 90,
    field: 'slug',
    headerName: 'Slug',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row.baseName || ''}</Typography>
  },
  {
    flex: 0.25,
    minWidth: 90,
    field: 'address',
    headerName: 'Address',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row.address || ''}</Typography>
  }
]

const CompanyEventListTable = () => {
  // ** State
  const [pageSize, setPageSize] = useState<number>(7)

  const [open, setOpen] = useState<boolean>(false)

  const handleClickOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  // ** Redux
  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.companyDetail)

  const handleSubmitDeleteEvent = (rowId: number, handleCloseAlert: () => void) => {
    dispatch(deleteEvent(rowId)).then(() => {
      handleCloseAlert()
    })
  }

  const handleSubmitResumeEvent = (rowId: number, handleCloseAlert: () => void) => {
    dispatch(resumeEvent(rowId)).then(() => {
      handleCloseAlert()
    })
  }

  const handleStatusChange = useCallback(
    async (e: SelectChangeEvent) => {
      const status = e.target.value == 'active' ? true : false
      await dispatch(companyDetailSlice.actions.handleChangeStatus(status))
      await dispatch(getEvent())
    },
    [dispatch]
  )

  const columns = [
    ...defaultColumns,
    {
      flex: 0.1,
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
            <Tooltip title='Delete Event'>
              <IconButton size='small' onClick={handleClickOpenAlert}>
                {row.status ? <DeleteOutline /> : <BackupRestore />}
              </IconButton>
            </Tooltip>
            <Tooltip title='View'>
              <Box>
                <Link href={`/event/view/${row.id}`} passHref>
                  <IconButton size='small' component='a' sx={{ textDecoration: 'none' }}>
                    <EyeOutline />
                  </IconButton>
                </Link>
              </Box>
            </Tooltip>
            <DialogAlertDeleteEvent
              open={open}
              eventData={row}
              handleCloseAlert={handleCloseAlert}
              handleSubmit={() =>
                row.status
                  ? handleSubmitDeleteEvent(row.id, handleCloseAlert)
                  : handleSubmitResumeEvent(row.id, handleCloseAlert)
              }
            />
          </Box>
        )
      }
    }
  ]

  if (store.companyData.events) {
    return (
      <Card>
        <CardHeader
          title='Event List'
          sx={{ '& .MuiCardHeader-action': { m: 0 } }}
          titleTypographyProps={{
            variant: 'h6',
            sx: { lineHeight: '32px !important', letterSpacing: '0.15px !important' }
          }}
          action={
            <Box>
              <FormControl size='small' sx={{ mr: 4, mb: 2, maxWidth: '180px', minWidth: '140px' }}>
                <InputLabel id='status-select'>Status</InputLabel>
                <Select
                  fullWidth
                  value={store.status ? 'active' : 'inactive'}
                  id='select-status'
                  label='Status'
                  labelId='status-select'
                  onChange={handleStatusChange}
                  inputProps={{ placeholder: 'Select Role' }}
                >
                  <MenuItem value='active'>Active</MenuItem>
                  <MenuItem value='inactive'>Inactive</MenuItem>
                </Select>
              </FormControl>
              <Button variant='contained' onClick={handleClickOpen}>
                Create Event
              </Button>
            </Box>
          }
        />
        <DataGrid
          autoHeight
          columns={columns}
          rows={store.listEvent}
          pageSize={pageSize}
          disableSelectionOnClick
          rowsPerPageOptions={[7, 10, 25, 50]}
          onPageSizeChange={newPageSize => setPageSize(newPageSize)}
          sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
        />
        <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
          <DialogTitle id='form-dialog-title'>Create Event</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ mb: 3 }}>Please fill in the information to create an Event.</DialogContentText>
            <Grid item xs={12}>
              <FormCreateEventSchema handleClickCloseModal={handleClose} />
            </Grid>
          </DialogContent>
        </Dialog>
      </Card>
    )
  } else {
    return null
  }
}

export default CompanyEventListTable
