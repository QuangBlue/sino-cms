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
import { useSelector } from 'react-redux'
import { RootState } from 'src/store'
import { EventTypes } from 'src/types/eventTypes'

interface CellType {
  row: EventTypes
}

const StyledLink = styled('a')(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const columns = [
  {
    flex: 0.2,
    field: 'id',
    minWidth: 90,
    headerName: '# ID',
    renderCell: ({ row }: CellType) => (
      <Link href={`/apps/invoice/preview/${row.id}`} passHref>
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
  },
  {
    flex: 0.1,
    minWidth: 130,
    sortable: false,
    field: 'actions',
    headerName: 'Actions',
    renderCell: ({ row }: CellType) => (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Tooltip title='Delete Invoice'>
          <IconButton size='small'>
            <DeleteOutline />
          </IconButton>
        </Tooltip>
        <Tooltip title='View'>
          <Box>
            <Link href={`/apps/invoice/preview/${row.id}`} passHref>
              <IconButton size='small' component='a' sx={{ textDecoration: 'none' }}>
                <EyeOutline />
              </IconButton>
            </Link>
          </Box>
        </Tooltip>
      </Box>
    )
  }
]

const CompanyEventListTable = () => {
  // ** State
  const [pageSize, setPageSize] = useState<number>(7)

  // ** Redux
  const store = useSelector((state: RootState) => state.companyDetail)

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
        />
        <DataGrid
          autoHeight
          columns={columns}
          rows={store.companyData.events}
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

export default CompanyEventListTable