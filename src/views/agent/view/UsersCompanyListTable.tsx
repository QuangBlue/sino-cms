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
import DialogAlertDeleteCompany from './DialogAlertDeleteCompany'
import { BackupRestore } from 'mdi-material-ui'
import { deleteCompany, resumeCompany } from 'src/store/agent/view'

interface CellType {
  row: CompanyTypes
}

const StyledLink = styled('a')(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const defaultColums = [
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
    field: 'totalEvent',
    headerName: 'Total Event',
    renderCell: ({ row }: CellType) => (
      <Typography variant='body2'>{row.totalEvent || 0}</Typography>
    )
  }
]

const CompanyListTable = () => {
  // ** State
  const [pageSize, setPageSize] = useState<number>(7)

  // ** Redux
  const store = useSelector((state: RootState) => state.agentDetail)

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()

  const handleSubmitDeleteCompany = (
    rowId: number,
    handleCloseAlert: () => void
  ) => {
    dispatch(deleteCompany(rowId)).then(() => {
      handleCloseAlert()
    })
  }

  const handleSubmitResumeCompany = (
    rowId: number,
    handleCloseAlert: () => void
  ) => {
    dispatch(resumeCompany(rowId)).then(() => {
      handleCloseAlert()
    })
  }

  const columns = [
    ...defaultColums,
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
            <Tooltip title='Delete Company'>
              <IconButton size='small' onClick={handleClickOpenAlert}>
                {row.status ? <DeleteOutline /> : <BackupRestore />}
              </IconButton>
            </Tooltip>
            <Tooltip title='View'>
              <Box>
                <Link href={`/company/view/${row.id}`} passHref>
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

  if (store.agentData.companies) {
    return (
      <Card>
        <CardHeader
          title='Company List'
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
          rows={store.agentData.companies}
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

export default CompanyListTable
