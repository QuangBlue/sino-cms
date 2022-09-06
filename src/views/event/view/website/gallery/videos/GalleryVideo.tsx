import { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Plus from 'mdi-material-ui/Plus'
import { DataGrid } from '@mui/x-data-grid'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import DialogUploadVideo from './DialogUploadVideo'
import Tooltip from '@mui/material/Tooltip'
import EditIcon from '@mui/icons-material/Edit'
import Chip from '@mui/material/Chip'

import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'
import { getVideos } from 'src/store/event/view/website/galleryStore'

import { deleteVideo } from 'src/@core/api/upload-api'

import toast from 'react-hot-toast'
import { useDisclosure } from 'react-use-disclosure'
import EditVideoModal from './EditVideoModal'
import { UPLOADING } from 'src/constants/upload-status'
import VideoModal from './VideoCard'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import DeleteOutline from 'mdi-material-ui/DeleteOutline'

interface CellType {
  row: any
}

const GalleryVideo = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [editParams, setEditParams] = useState<any>(null)
  const [isOpenVideoModal, setIsOpenVideoModal] = useState<boolean>(false)
  const [linkUrl, setLinkUrl] = useState<any>('')

  const handleClickOpen = () => setOpen(true)
  const handleDialogClose = () => setOpen(false)

  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.eventDetail)
  const galleyStore = useSelector((state: RootState) => state.galleryWebsite)

  const { videos } = galleyStore
  const {
    isOpen,
    open: openEditModal,
    close: closeEditModal
  } = useDisclosure(false)

  const eventName = store.eventData.baseName

  useEffect(() => {
    if (eventName) {
      handleFetchVideos()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, eventName])

  const handleFetchVideos = () => {
    dispatch(getVideos(eventName))
  }

  const handleDeleteVideo = async (videoId: number) => {
    const response = await deleteVideo(videoId)

    // @ts-ignore
    if (response?.status === 200) {
      toast.success('Delete video successfully')
      setTimeout(() => {
        handleFetchVideos()
      }, 1000)
    }
  }

  const handleOpenEditModal = (params: any) => {
    setEditParams(params)
    openEditModal()
  }

  const handleCloseEditModal = () => {
    setEditParams(null)
    closeEditModal()
  }

  const defaultColumns = [
    {
      field: 'id',
      headerName: 'ID',
      renderCell: ({ row }: CellType) => row.id
    },

    {
      flex: 0.25,
      minWidth: 90,
      field: 'name',
      headerName: 'Name',
      renderCell: ({ row }: CellType) => {
        const title =
          row?.process?.status === UPLOADING ? (
            <Typography>
              {row?.name} <Chip label='Video is being processed' />
            </Typography>
          ) : (
            row?.name
          )

        return <Typography variant='body2'>{title}</Typography>
      }
    }
  ]

  const columns = [
    ...defaultColumns,
    {
      flex: 0.1,
      minWidth: 130,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }: CellType) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title='View'>
              <Box>
                <IconButton
                  size='small'
                  component='a'
                  sx={{ textDecoration: 'none' }}
                  onClick={() => {
                    setIsOpenVideoModal(true)
                    setLinkUrl(row.link)
                  }}
                  disabled={!row.link}
                >
                  <EyeOutline />
                </IconButton>
              </Box>
            </Tooltip>
            <Tooltip title='Edit'>
              <IconButton size='small' onClick={() => handleOpenEditModal(row)}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title='Delete Video'>
              <IconButton
                size='small'
                onClick={() => handleDeleteVideo(row.id)}
              >
                <DeleteOutline />
              </IconButton>
            </Tooltip>
          </Box>
        )
      }
    }
  ]

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 4 }}>
        <Typography variant='h6' sx={{ mb: 3 }}>
          Videos
        </Typography>
        <Button
          size='small'
          variant='contained'
          startIcon={<Plus fontSize='small' />}
          onClick={handleClickOpen}
        >
          Upload Video
        </Button>
      </Box>
      {open && (
        <DialogUploadVideo
          handleDialogClose={handleDialogClose}
          open={open}
          handleFetchVideos={handleFetchVideos}
        />
      )}

      <DataGrid
        autoHeight
        columns={columns}
        rows={videos}
        disableSelectionOnClick
        rowsPerPageOptions={[7, 10, 25, 50]}
        sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
      />

      <EditVideoModal
        open={isOpen}
        handleClose={handleCloseEditModal}
        editParams={editParams}
        handleFetchVideos={handleFetchVideos}
      />

      <VideoModal
        open={isOpenVideoModal}
        handleClose={() => setIsOpenVideoModal(false)}
        link={linkUrl}
      />
    </Box>
  )
}

export default GalleryVideo
