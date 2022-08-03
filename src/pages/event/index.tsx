// ** React Imports
import { useState, useEffect } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import DeleteOutline from 'mdi-material-ui/DeleteOutline'
import { styled } from '@mui/material/styles'

// ** Store & Actions Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Types Imports
import { AppDispatch, RootState } from 'src/store'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

// ** Redux Imports
import { deleteEvent, eventSlice, fetchEvent, resumeEvent } from 'src/store/event'
import { useAuth } from 'src/hooks/useAuth'
import TableHeaderEvent from 'src/views/event/TableHeaderEvent'
import DialogAlertDeleteEvent from 'src/views/company/view/DialogAlertDeleteEvent'
import BackupRestore from 'mdi-material-ui/BackupRestore'
import { EventTypes } from 'src/types/eventTypes'

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
    field: 'company',
    headerName: 'Company',
    renderCell: ({ row }: CellType) => (
      <Link href={`/company/view/${row.company.id}`} passHref>
        <StyledLink>{`${row.company.name}`}</StyledLink>
      </Link>
    )
  },

  // {
  //   flex: 0.25,
  //   minWidth: 90,
  //   field: 'agent',
  //   headerName: 'agent',
  //   renderCell: ({ row }: CellType) => (
  //     <Link href={`/agent/view/${row.company.agent.id}`} passHref>
  //       <StyledLink>{`${row.company.agent.firstName + ' ' + row.company.agent.lastName}`}</StyledLink>
  //     </Link>
  //   )
  // },
  {
    flex: 0.25,
    minWidth: 90,
    field: 'address',
    headerName: 'Address',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row.address || ''}</Typography>
  }
]
const EventList = () => {
  // ** State
  const [value, setValue] = useState<string>('')
  const [pageSize, setPageSize] = useState<number>(10)

  // const [selectedRows, setSelectedRows] = useState<GridRowId[]>([])

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.event)
  const auth = useAuth()

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

  useEffect(() => {
    if (auth.user) {
      dispatch(fetchEvent(auth.user.id))
    }

    return () => {
      eventSlice.actions.handlePageChange()
    }
  }, [auth.user, dispatch])

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

  const handleFilter = (val: string) => {
    setValue(val)

    // dispatch(fetchCompany(val))
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <TableHeaderEvent value={value} handleFilter={handleFilter} />
          <DataGrid
            autoHeight
            pagination
            rows={store.listEvent}
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

EventList.acl = {
  action: 'read',
  subject: 'host-view'
}

export default EventList
