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

// ** Custom Components Imports
import TableHeaderCompany from 'src/views/company/TableHeaderCompany'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

// ** Redux Imports
import { CompanyTypes } from 'src/types/companyTypes'
import { companySlice, deleteCompany, fetchCompany, resumeCompany } from 'src/store/company'
import DialogAlertDeleteCompany from 'src/views/company/DialogAlertDeleteCompany'
import { BackupRestore } from 'mdi-material-ui'
import { formatDate } from 'src/@core/utils/format'

interface CellType {
  row: CompanyTypes
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
      <Link href={`/company/view/${row.id}`} passHref>
        <StyledLink>{`#${row.id}`}</StyledLink>
      </Link>
    )
  },
  {
    flex: 2,
    minWidth: 120,
    field: 'name',
    headerName: 'Name',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{`${row.name || ''}`}</Typography>
  },
  {
    flex: 2,
    field: 'baseName',
    minWidth: 90,
    headerName: 'Slug',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{`${row.baseName || ''}`}</Typography>
  },
  {
    flex: 1,
    minWidth: 90,
    field: 'agent',
    headerName: 'Agent',
    renderCell: ({ row }: CellType) => (
      <Link href={`/agent/view/${row.agent.id}`} passHref>
        <StyledLink>{`${row.agent.firstName + ' ' + row.agent.lastName || ''}`}</StyledLink>
      </Link>
    )
  },

  {
    flex: 1,
    minWidth: 120,
    field: 'createdAt',
    headerName: 'Created At',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{formatDate(row.createdAt.toString())}</Typography>
  }
]

const CompanyList = () => {
  // ** State
  const [value, setValue] = useState<string>('')
  const [pageSize, setPageSize] = useState<number>(10)

  // const [selectedRows, setSelectedRows] = useState<GridRowId[]>([])

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.company)

  useEffect(() => {
    dispatch(fetchCompany())

    return () => {
      companySlice.actions.handlePageChange()
    }
  }, [dispatch])

  const handleFilter = (val: string) => {
    setValue(val)
    dispatch(fetchCompany(val))
  }

  // Handle Detele Company
  const handleSubmitDeleteCompany = (rowId: number, handleCloseAlert: () => void) => {
    dispatch(deleteCompany(rowId)).then(() => {
      handleCloseAlert()
    })
  }

  const handleSubmitResumeCompany = (rowId: number, handleCloseAlert: () => void) => {
    dispatch(resumeCompany(rowId)).then(() => {
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
            <Tooltip title={row.status ? 'Delete Company' : 'Resume Company'}>
              <IconButton size='small' sx={{ mr: 0.5 }} onClick={handleClickOpenAlert}>
                {row.status ? <DeleteOutline /> : <BackupRestore />}
              </IconButton>
            </Tooltip>
            <Tooltip title='View'>
              <Box>
                <Link href={`/company/view/${row.id}`} passHref>
                  <IconButton size='small' component='a' sx={{ textDecoration: 'none', mr: 0.5 }}>
                    <EyeOutline />
                  </IconButton>
                </Link>
              </Box>
            </Tooltip>
            {/* <RowOptions id={row.id} /> */}
            <DialogAlertDeleteCompany
              open={open}
              dataCompany={row}
              handleCloseAlert={handleCloseAlert}
              handleSubmit={() =>
                row.status
                  ? handleSubmitDeleteCompany(row.id, handleCloseAlert)
                  : handleSubmitResumeCompany(row.id, handleCloseAlert)
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
          <TableHeaderCompany value={value} handleFilter={handleFilter} />
          <DataGrid
            autoHeight
            pagination
            rows={store.listCompany}
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

CompanyList.acl = {
  action: 'read',
  subject: 'agent-view'
}

export default CompanyList
