import { Box, Button, CardHeader, IconButton, Tooltip, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { Plus, Pencil } from 'mdi-material-ui'
import * as React from 'react'
import { useState } from 'react'
import DialogAddContactInfo from './DialogAddPackage'

interface ContactInfoTypes {
  title: string
  price: string
  startDate: string
  endDate: string
  benefit: string[]
  type: string
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
    field: 'price',
    minWidth: 90,
    headerName: 'Price',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{`${row.price || ''}`}</Typography>
  },
  {
    flex: 1,
    minWidth: 90,
    field: 'startDate',
    headerName: 'Start Date',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{`${row.startDate || ''}`}</Typography>
  },
  {
    flex: 1,
    minWidth: 90,
    field: 'endDate',
    headerName: 'End Date',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{`${row.endDate || ''}`}</Typography>
  },
  {
    flex: 1,
    minWidth: 90,
    field: 'type',
    headerName: 'Type',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{`${row.type || ''}`}</Typography>
  }
]

const ContactUs = [
  {
    id: 1,
    title: 'SIFW Opening Ceremony',
    price: 'S$ 49',
    startDate: 'Aug 15, 2022',
    endDate: 'Aug 20, 2022',
    benefit: [
      'Virtual Exhibition',
      'Live Streaming of SIFW Opening Ceremony',
      'Virtual Exhibition Hall - Communication Exchanges with Sponsors (16 May - 20 May：9:00 -18:00)'
    ],
    type: 'live-stream'
  },
  {
    id: 2,
    title: 'SIOF',
    price: 'S$ 229',
    startDate: 'Aug 15, 2022',
    endDate: 'Aug 20, 2022',
    benefit: [
      'Virtual Exhibition',
      'Live Streaming of SIFW Opening Ceremony',
      'Virtual Exhibition Hall - Communication Exchanges with Sponsors (16 May - 20 May：9:00 -18:00)'
    ],
    type: 'live-stream'
  },
  {
    id: 3,
    title: 'SIFW OC + SIOF',
    price: 'S$ 249',
    startDate: 'Aug 15, 2022',
    endDate: 'Aug 20, 2022',
    benefit: [
      'Virtual Exhibition',
      'Live Streaming of SIFW Opening Ceremony',
      'Virtual Exhibition Hall - Communication Exchanges with Sponsors (16 May - 20 May：9:00 -18:00)'
    ],
    type: 'live-stream'
  },
  {
    id: 4,
    title: 'SIFW Opening Ceremony',
    price: 'By Invitation Only',
    startDate: 'Aug 15, 2022',
    endDate: 'Aug 20, 2022',
    benefit: [
      'Virtual Exhibition',
      'Live Streaming of SIFW Opening Ceremony',
      'Virtual Exhibition Hall - Communication Exchanges with Sponsors (16 May - 20 May：9:00 -18:00)'
    ],
    type: 'in-person'
  },
  {
    id: 5,
    title: 'SIOF',
    price: 'S$ 649',
    startDate: 'Aug 15, 2022',
    endDate: 'Aug 20, 2022',
    benefit: [
      'Virtual Exhibition',
      'Live Streaming of SIFW Opening Ceremony',
      'Virtual Exhibition Hall - Communication Exchanges with Sponsors (16 May - 20 May：9:00 -18:00)'
    ],
    type: 'in-person'
  }
]

export default function TabPackage() {
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
        title='List Package'
        action={
          <Box>
            <Button size='small' variant='contained' startIcon={<Plus fontSize='small' />} onClick={handleClickOpen}>
              Add Package
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
