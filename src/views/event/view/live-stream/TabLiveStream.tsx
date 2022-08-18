import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'
import { Box, CardHeader, IconButton, Tooltip, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { ArrowLeft, EyeOutline } from 'mdi-material-ui'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import LiveStreamDetail from './LiveSteamDetail'

interface ContactInfoTypes {
  id: number
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
  const [value, setValue] = useState<string>('list')
  const router = useRouter()

  const { id, idLive } = router.query

  const handleClickBack = () => {
    router.push(`${router.pathname.replace('[id]', `${id}`)}?tab=live-stream`, undefined, {
      shallow: true
    })
  }

  const handleClickDetail = (idLive: number) => {
    router.push(`${router.pathname.replace('[id]', `${id}`)}?tab=live-stream&idLive=${idLive}`, undefined, {
      shallow: true
    })
  }

  useEffect(() => {
    if (idLive) {
      setValue('detail')
    } else {
      setValue('list')
    }
  }, [idLive])

  const columns = [
    ...defaultColumns,
    {
      flex: 0.5,
      minWidth: 50,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }: CellType) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title={'View Detail'}>
              <IconButton
                size='small'
                component='a'
                sx={{ textDecoration: 'none', mr: 0.5 }}
                onClick={() => handleClickDetail(row.id)}
              >
                <EyeOutline />
              </IconButton>
            </Tooltip>
          </Box>
        )
      }
    }
  ]

  return (
    <TabContext value={value}>
      <Box sx={{ display: 'flex', height: '100%' }}>
        <TabPanel sx={{ p: 0, width: '100%' }} value='list'>
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
        </TabPanel>
        <TabPanel sx={{ p: 0, width: '100%' }} value='detail'>
          {idLive && (
            <Box sx={{ m: 4 }}>
              <Box sx={{ boxShadow: 0, mb: 4, ml: 4, display: 'flex' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Tooltip title={'Back'}>
                    <IconButton
                      size='small'
                      component='a'
                      sx={{ textDecoration: 'none', mr: 0.5 }}
                      onClick={handleClickBack}
                    >
                      <ArrowLeft />
                    </IconButton>
                  </Tooltip>
                </Box>
                <CardHeader title={`Live Stream Detail ${idLive}`} />
              </Box>
              <LiveStreamDetail />
            </Box>
          )}
        </TabPanel>
      </Box>
    </TabContext>
  )
}
