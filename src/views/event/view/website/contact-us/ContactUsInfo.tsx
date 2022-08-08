import { Box, Button, CardHeader, IconButton, Tooltip, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { Plus, Pencil } from 'mdi-material-ui'
import * as React from 'react'
import { useState } from 'react'
import DialogAddContactInfo from './DialogAddContactInfo'

interface ContactInfoTypes {
  title: string
  hostName: string
  phone: string
  email: string
}

interface CellType {
  row: ContactInfoTypes
}

const defaultColumns = [
  {
    flex: 1,
    field: 'title',
    minWidth: 150,
    headerName: 'Title',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{`${row.title || ''}`}</Typography>
  },

  {
    flex: 1,
    field: 'hostName',
    minWidth: 90,
    headerName: 'Host Name',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{`${row.hostName || ''}`}</Typography>
  },
  {
    flex: 1,
    minWidth: 90,
    field: 'phone',
    headerName: 'Phone',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{`${row.phone || ''}`}</Typography>
  },
  {
    flex: 1,
    minWidth: 90,
    field: 'email',
    headerName: 'Email',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{`${row.email || ''}`}</Typography>
  }
]

const ContactUs = [
  {
    id: 1,
    title: 'Hotline',
    hostName: 'Ms Fan Ruxuan',
    phone: '+65 9830 3471',
    email: 'info@ironoreforum.sg'
  },
  {
    id: 2,
    title: 'Registration',
    hostName: 'Ms Kong Tinyi',
    phone: '+65 8660 9180',
    email: 'registration@ironoreforum.sg'
  },
  {
    id: 3,
    title: 'Sponsorship',
    hostName: 'Ms Winnie Chen Hui Jun',
    phone: '+65 9060 0725',
    email: 'sponsorship@ironoreforum.sg'
  },
  {
    id: 4,
    title: 'Media',
    hostName: 'Ms Elizabeth Yeong',
    phone: '+65 9834 1187',
    email: 'media@ironoreforum.sg'
  }
]

export default function ContactUsInfoList() {
  const [open, setOpen] = useState<boolean>(false)
  const handleClickOpen = () => setOpen(true)
  const handleDialogClose = () => setOpen(false)

  const [pageSize, setPageSize] = useState<number>(10)

  const columns = [
    ...defaultColumns,
    {
      flex: 0.5,
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
        title='Sponsorship Group'
        action={
          <Box>
            <Button size='small' variant='contained' startIcon={<Plus fontSize='small' />} onClick={handleClickOpen}>
              Add Contact Info
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
