import { Box, Button, Card, CardHeader, Collapse, IconButton, Tooltip, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { Plus, ChevronDown, ChevronUp, Pencil } from 'mdi-material-ui'
import * as React from 'react'
import { useState } from 'react'
import DialogAddSponsorship from './DialogAddSponsorship'

interface SponsorshipOverviewTypes {
  title: string
  quality: string
  price: string
}

interface CellType {
  row: SponsorshipOverviewTypes
}

const defaultColumns = [
  {
    flex: 2,
    field: 'title',
    minWidth: 150,
    headerName: 'Title',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{`${row.title || ''}`}</Typography>
  },

  {
    flex: 1,
    field: 'quality',
    minWidth: 90,
    headerName: 'Quality',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{`${row.quality || ''}`}</Typography>
  },
  {
    flex: 1,
    minWidth: 90,
    field: 'price',
    headerName: 'Price',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{`${row.price || 0}`}</Typography>
  }
]

const SponsorshipOverview = [
  {
    id: 1,
    title: 'DIAMOND',
    quality: '1',
    price: 'S$30,0000'
  },
  {
    id: 2,
    title: 'PLATINUM',
    quality: '3',
    price: 'S$25,0000'
  },
  {
    id: 3,
    title: 'GOLD',
    quality: '5',
    price: 'S$20,0000'
  },
  {
    id: 4,
    title: 'SILVER',
    quality: '10',
    price: 'S$15,0000'
  }
]

export default function SponsorshipOpportunitiesItem() {
  const [open, setOpen] = useState<boolean>(false)
  const handleClickOpen = () => setOpen(true)
  const handleDialogClose = () => setOpen(false)
  const [collapsed, setCollapsed] = useState<boolean>(false)

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
    <Card variant='outlined' sx={{ boxShadow: 0, mb: 4 }}>
      <CardHeader
        title='Sponsorship Group'
        action={
          <Box>
            {collapsed && (
              <Button
                size='small'
                sx={{ mr: 10 }}
                variant='contained'
                startIcon={<Plus fontSize='small' />}
                onClick={handleClickOpen}
              >
                Add Sponsorship
              </Button>
            )}

            <IconButton
              size='small'
              aria-label='collapse'
              sx={{ color: 'text.secondary' }}
              onClick={() => setCollapsed(!collapsed)}
            >
              {!collapsed ? <ChevronDown fontSize='small' /> : <ChevronUp fontSize='small' />}
            </IconButton>
          </Box>
        }
      />
      <Collapse in={collapsed}>
        <DataGrid
          autoHeight
          pagination
          rows={SponsorshipOverview}
          columns={columns}
          disableSelectionOnClick
          pageSize={Number(pageSize)}
          rowsPerPageOptions={[10, 25, 50]}
          sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
          onPageSizeChange={newPageSize => setPageSize(newPageSize)}
        />
      </Collapse>
      <DialogAddSponsorship handleDialogClose={handleDialogClose} open={open} />
    </Card>
  )
}
