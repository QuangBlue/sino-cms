// ** React Imports
import { useState } from 'react'

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
import { CompanyTypes } from 'src/types/companyTypes'
import { EventTypes } from 'src/types/eventTypes'
import DialogAlertDeleteEvent from 'src/views/company/view/DialogAlertDeleteEvent'
import { BackupRestore } from 'mdi-material-ui'
import { deleteEvent, resumeEvent } from 'src/store/agent/view'

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
    renderCell: ({ row }: CellType) => (
      <Typography variant='body2'>{row.name || ''}</Typography>
    )
  },
  {
    flex: 0.25,
    minWidth: 90,
    field: 'slug',
    headerName: 'Slug',
    renderCell: ({ row }: CellType) => (
      <Typography variant='body2'>{row.baseName || ''}</Typography>
    )
  }
]

const EventListTable = () => {
  // ** State
  const [pageSize, setPageSize] = useState<number>(7)

  // ** Redux
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.agentDetail)

  const getEventList = (companies: CompanyTypes[]) => {
    const eventList: EventTypes[] = []
    if (companies)
      for (const company of companies) {
        eventList.push(...company.events)
      }

    return eventList
  }

  const handleSubmitDeleteEvent = (
    rowId: number,
    handleCloseAlert: () => void
  ) => {
    dispatch(deleteEvent(rowId)).then(() => {
      handleCloseAlert()
    })
  }

  const handleSubmitResumeEvent = (
    rowId: number,
    handleCloseAlert: () => void
  ) => {
    dispatch(resumeEvent(rowId)).then(() => {
      handleCloseAlert()
    })
  }

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
                  <IconButton
                    size='small'
                    component='a'
                    sx={{ textDecoration: 'none' }}
                  >
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

  if (store.agentData.companies) {
    return (
      <Card>
        <CardHeader
          title='Event List'
          sx={{ '& .MuiCardHeader-action': { m: 0 } }}
          titleTypographyProps={{
            variant: 'h6',
            sx: {
              lineHeight: '32px !important',
              letterSpacing: '0.15px !important'
            }
          }}
        />
        <DataGrid
          autoHeight
          columns={columns}
          rows={getEventList(store.agentData.companies)}
          pageSize={pageSize}
          disableSelectionOnClick
          rowsPerPageOptions={[7, 10, 25, 50]}
          onPageSizeChange={newPageSize => setPageSize(newPageSize)}
          sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
        />
      </Card>
    )
  } else {
    return null
  }
}

export default EventListTable
