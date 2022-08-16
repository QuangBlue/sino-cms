import { Box, Button, CardHeader, IconButton, Tooltip, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { Plus, Pencil } from 'mdi-material-ui'
import * as React from 'react'
import { useState } from 'react'
import DialogAddContactInfo from './DialogAddRegister'

interface ContactInfoTypes {
  companyName: string
}

interface CellType {
  row: ContactInfoTypes
}

const defaultColumns = [
  {
    flex: 1,
    field: 'companyName',
    minWidth: 150,
    headerName: 'Company Name',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{`${row.companyName || ''}`}</Typography>
  }
]

const ContactUs = [
  {
    id: 1,
    companyName: 'CMP Services Asia Limited Ltd'
  },
  {
    id: 2,
    companyName: 'CONTANGO SHIPPING PTE LTD'
  },
  {
    id: 3,
    companyName: '住友商事（中国）有限公司'
  },
  {
    id: 4,
    companyName: 'Macarthur Minerals'
  }
]

export default function RegisterInfo() {
  const [open, setOpen] = useState<boolean>(false)
  const handleClickOpen = () => setOpen(true)
  const handleDialogClose = () => setOpen(false)

  const [pageSize, setPageSize] = useState<number>(10)

  const columns = [
    ...defaultColumns,
    {
      flex: 0.1,
      minWidth: 50,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: () => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title={'Edit Sponsorship'}>
              <IconButton size='small' sx={{ mr: 0.5 }} onClick={handleClickOpen}>
                <Pencil />
              </IconButton>
            </Tooltip>
          </Box>
        )
      }
    }
  ]

  return (
    <Box sx={{ boxShadow: 0, mb: 4 }}>
      <CardHeader
        title='REGISTERED ORGANISATIONS'
        action={
          <Box>
            <Button size='small' variant='contained' startIcon={<Plus fontSize='small' />} onClick={handleClickOpen}>
              Add Registered Organisations
            </Button>
          </Box>
        }
      />

      <DataGrid
        autoHeight
        pagination
        rows={ContactUs}
        columns={columns}
        disableSelectionOnClick
        pageSize={Number(pageSize)}
        rowsPerPageOptions={[10, 25, 50]}
        sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
        onPageSizeChange={newPageSize => setPageSize(newPageSize)}
      />

      <DialogAddContactInfo handleDialogClose={handleDialogClose} open={open} />
    </Box>
  )
}
