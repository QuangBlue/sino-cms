// ** React Imports
import { useState, forwardRef, useEffect } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
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

// ** Store & Actions Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Types Imports
import { AppDispatch, RootState } from 'src/store'
import { AgentTypes } from 'src/types/agentTypes'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import TableHeaderAgent from 'src/views/agent/TableHeaderAgent'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

// ** Redux Imports
import { agentSlice, deleteAgent, fetchAgent, resumeAgent } from 'src/store/agent'
import DialogAlertDelete from 'src/views/agent/DialogAlertDeleteAgent'
import BackupRestore from 'mdi-material-ui/BackupRestore'
import { formatDate } from 'src/@core/utils/format'

interface CustomInputProps {
  dates: Date[]
  label: string
  end: number | Date
  start: number | Date
  setDates?: (value: Date[]) => void
}

interface CellType {
  row: AgentTypes
}

// ** Styled component for the link for the avatar without image
const AvatarWithoutImageLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  marginRight: theme.spacing(3)
}))

// ** renders client column
const renderClient = (row: AgentTypes) => {
  return (
    <AvatarWithoutImageLink href={`/agent/view/${row.id}`}>
      <CustomAvatar
        skin='light'
        color={row.role === 'admin' ? 'primary' : 'error'}
        sx={{ mr: 3, width: 34, height: 34, fontSize: '1rem' }}
      >
        {getInitials(row.firstName + ' ' + row.lastName)}
      </CustomAvatar>
    </AvatarWithoutImageLink>
  )
}

const defaultColumns = [
  {
    flex: 2,
    minWidth: 120,
    field: 'fullName',
    headerName: 'User',

    // renderHeader: () => <TrendingUp fontSize='small' sx={{ color: 'action.active' }} />,
    renderCell: ({ row }: CellType) => {
      const { id, firstName, lastName } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClient(row)}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <Link href={`/agent/view/${id}`} passHref>
              <Typography
                noWrap
                component='a'
                variant='subtitle2'
                sx={{ color: 'text.primary', textDecoration: 'none' }}
              >
                {firstName + ' ' + lastName}
              </Typography>
            </Link>
            <Link href={`/agent/view/${id}`} passHref>
              <Typography noWrap component='a' variant='caption' sx={{ textDecoration: 'none' }}>
                @{(firstName + ' ' + lastName).toLowerCase().replace(/\s/g, '')}
              </Typography>
            </Link>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 2,
    field: 'email',
    minWidth: 150,
    headerName: 'Email',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{`${row.email || ''}`}</Typography>
  },

  {
    flex: 1,
    field: 'phone',
    minWidth: 90,
    headerName: 'Phone',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{`${row.phone || ''}`}</Typography>
  },
  {
    flex: 1,
    minWidth: 90,
    field: 'totalEvent',
    headerName: 'Total Created Event',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{`${row.totalEvent || 0}`}</Typography>
  },

  {
    flex: 1,
    minWidth: 90,
    field: 'eventLimit',
    headerName: 'Event Limit',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row.eventLimit}</Typography>
  },

  {
    flex: 1,
    minWidth: 120,
    field: 'createdAt',
    headerName: 'Created At',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{formatDate(row.createdAt.toString())}</Typography>
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

const AgentList = () => {
  // ** State
  const [value, setValue] = useState<string>('')
  const [pageSize, setPageSize] = useState<number>(10)

  // const [selectedRows, setSelectedRows] = useState<GridRowId[]>([])

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.agent)

  useEffect(() => {
    dispatch(fetchAgent())

    return () => {
      agentSlice.actions.handlePageChange()
    }
  }, [dispatch])

  const handleFilter = (val: string) => {
    setValue(val)
    dispatch(fetchAgent(val))
  }

  // Handle Detele Agent
  const handleSubmitDeleteAgent = (rowId: number, handleCloseAlert: () => void) => {
    dispatch(deleteAgent(rowId)).then(() => {
      handleCloseAlert()
    })
  }

  const handleSubmitResumeAgent = (rowId: number, handleCloseAlert: () => void) => {
    dispatch(resumeAgent(rowId)).then(() => {
      handleCloseAlert()
    })
  }

  // dispatch(deleteAgent(row.id))

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
            <Tooltip title={row.status ? 'Delete Agent' : 'Resume Agent'}>
              <IconButton size='small' sx={{ mr: 0.5 }} onClick={handleClickOpenAlert}>
                {row.status ? <DeleteOutline /> : <BackupRestore />}
              </IconButton>
            </Tooltip>
            <Tooltip title='View'>
              <Box>
                <Link href={`/agent/view/${row.id}`} passHref>
                  <IconButton size='small' component='a' sx={{ textDecoration: 'none', mr: 0.5 }}>
                    <EyeOutline />
                  </IconButton>
                </Link>
              </Box>
            </Tooltip>
            {/* <RowOptions id={row.id} /> */}
            <DialogAlertDelete
              open={open}
              dataAgent={row}
              handleCloseAlert={handleCloseAlert}
              handleSubmit={() =>
                row.status
                  ? handleSubmitDeleteAgent(row.id, handleCloseAlert)
                  : handleSubmitResumeAgent(row.id, handleCloseAlert)
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
          <TableHeaderAgent value={value} /* selectedRows={selectedRows} */ handleFilter={handleFilter} />
          <DataGrid
            autoHeight
            pagination
            rows={store.listAgent}
            columns={columns}
            disableSelectionOnClick
            pageSize={Number(pageSize)}
            rowsPerPageOptions={[10, 25, 50]}
            sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
            onSelectionModelChange={() => console.log('onSelectionMode') /*setSelectedRows(rows)*/}
            onPageSizeChange={newPageSize => setPageSize(newPageSize)}
          />
        </Card>
      </Grid>
    </Grid>
  )
}

export default AgentList
