import { Box, CardHeader, IconButton, Tooltip, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { Pencil, DeleteOutline } from 'mdi-material-ui'
import * as React from 'react'
import { useState } from 'react'

interface ContactInfoTypes {
  url: string
  title: string
  startDate: string
  endDate: string
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
  }
]

const ContactUs = [
  {
    id: 1,
    url: 'https://mooviejs.com/trailer/trailer.mp4',
    title: 'SIFW Opening Ceremony',

    startDate: 'Aug 15, 2022',
    endDate: 'Aug 20, 2022'
  },
  {
    id: 2,
    url: 'https://mooviejs.com/trailer/trailer.mp4',
    title: 'SIOF',

    startDate: 'Aug 15, 2022',
    endDate: 'Aug 20, 2022'
  },
  {
    id: 3,
    url: 'https://mooviejs.com/trailer/trailer.mp4',
    title: 'SIFW OC + SIOF',

    startDate: 'Aug 15, 2022',
    endDate: 'Aug 20, 2022'
  },
  {
    id: 4,
    url: 'https://mooviejs.com/trailer/trailer.mp4',
    title: 'SIFW Opening Ceremony',

    startDate: 'Aug 15, 2022',
    endDate: 'Aug 20, 2022'
  },
  {
    id: 5,
    url: 'https://mooviejs.com/trailer/trailer.mp4',
    title: 'SIOF',

    startDate: 'Aug 15, 2022',
    endDate: 'Aug 20, 2022'
  }
]

export default function TabLiveStream() {
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
              <IconButton size='small' sx={{ mr: 0.5 }}>
                <Pencil />
              </IconButton>
            </Tooltip>
            <Tooltip title={'Delete Package'}>
              <IconButton size='small'>
                <DeleteOutline />
              </IconButton>
            </Tooltip>
          </Box>
        )
      }
    }
  ]

  return (
    <Box sx={{ boxShadow: 0, mb: 4 }}>
      <CardHeader title='List Live Stream' />

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
    </Box>
  )
}
