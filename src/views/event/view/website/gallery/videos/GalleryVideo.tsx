import { useEffect } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Plus from 'mdi-material-ui/Plus'
import { useState } from 'react'

import Grid from '@mui/material/Grid'
import DialogUploadVideo from './DialogUploadVideo'

import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'
import { getVideos } from 'src/store/event/view/website/galleryStore'

import { deleteVideo } from 'src/@core/api/upload-api'

import VideoCard from './VideoCard'
import toast from 'react-hot-toast'
import { useDisclosure } from 'react-use-disclosure'
import EditVideoModal from './EditVideoModal'

const GalleryVideo = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [editParams, setEditParams] = useState<any>(null)

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
      <Grid
        container
        gap={4}
        style={{ maxHeight: '60vh', overflowY: 'scroll' }}
      >
        {videos.map(video => {
          return (
            <Grid item xs={12} key={video.id}>
              <VideoCard
                video={video}
                handleDeleteVideo={handleDeleteVideo}
                handleOpenEditModal={handleOpenEditModal}
              />
            </Grid>
          )
        })}
      </Grid>
      <EditVideoModal
        open={isOpen}
        handleClose={handleCloseEditModal}
        editParams={editParams}
        handleFetchVideos={handleFetchVideos}
      />
    </Box>
  )
}

export default GalleryVideo
