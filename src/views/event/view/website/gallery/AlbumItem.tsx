import { useEffect, useCallback } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  IconButton,
  CardActionArea,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  DialogContentText
} from '@mui/material'
import { ChevronDown, ChevronUp, Plus } from 'mdi-material-ui'
import { useState } from 'react'
import DialogUploadPhoto from './DialogUploadPhoto'
import DialogUploadVideo from './DialogUploadVideo'
import CircularProgress from '@mui/material/CircularProgress'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import Tooltip from '@mui/material/Tooltip'
import LoadingButton from '@mui/lab/LoadingButton'

import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'
import { addPhotos, getAlbum } from 'src/store/event/view/website/galleryStore'
import { PhotoTypes } from 'src/types/website'

import { getPhotos, deletePhoto, deleteAlbum } from 'src/@core/api/gallery-api'
import toast from 'react-hot-toast'

interface AlbumItemProps {
  isVideo?: boolean
  title: string
  albumId: number | undefined
}

interface DeleteAlbumModalProps {
  open: boolean
  handleClose: () => void
  handleDelete: () => void
  isLoading: boolean
}

const AlbumItem = (prop: AlbumItemProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.eventDetail)

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const [photos, setPhotos] = useState<any>([])

  const [openDeletedModal, setOpenDeletedModal] = useState<boolean>(false)
  const [isDeletingModal, setIsDeletingModal] = useState<boolean>(false)

  const [open, setOpen] = useState<boolean>(false)
  const handleClickOpen = () => setOpen(true)
  const handleDialogClose = () => setOpen(false)

  const { isVideo, title, albumId } = prop

  useEffect(() => {
    if (albumId && collapsed) {
      handleGetPhotos(albumId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [albumId, collapsed])

  const handleGetPhotos = async (albumId: number) => {
    setIsLoading(true)
    const result = await getPhotos(albumId)
    setPhotos(result)
    setIsLoading(false)
  }

  const handleAddPhotos = (values: any) => {
    const params = values.map((photo: any) => {
      return {
        order: 0,
        imgUrl: photo.data
      }
    })

    if (albumId) {
      dispatch(addPhotos({ albumId, params }))
      handleDialogClose()
      setTimeout(() => {
        handleGetPhotos(albumId)
      }, 1000)
    }
  }

  const handleDeletePhoto = useCallback(
    (photoId: number) => {
      const newPhotos = photos.photos.filter((photo: any) => photo.id !== photoId)
      setPhotos({ ...photos, photos: newPhotos })
      deletePhoto(photoId)
    },
    [photos]
  )

  const handleDeleteAlbum = async () => {
    setIsDeletingModal(true)
    const result = await deleteAlbum(Number(albumId))
    const eventName = store.eventData.baseName

    if (result?.status === 200) {
      setOpenDeletedModal(false)
      toast.success('Delete album successfully')
      dispatch(getAlbum(eventName))
    }
    setIsDeletingModal(false)
  }

  return (
    <Card variant='outlined' sx={{ boxShadow: 0, mb: 4 }}>
      <CardHeader
        title={title}
        action={
          <Box>
            {collapsed && (
              <>
                <Button
                  sx={{ mr: 2 }}
                  size='small'
                  variant='contained'
                  startIcon={<Plus fontSize='small' />}
                  onClick={handleClickOpen}
                >
                  {isVideo ? 'Add Video' : 'Add Photo'}
                </Button>
                <Button
                  sx={{ mr: 10 }}
                  size='small'
                  variant='contained'
                  startIcon={<HighlightOffIcon fontSize='small' />}
                  onClick={() => setOpenDeletedModal(true)}
                >
                  {isVideo ? 'Delete Video' : 'Delete Album'}
                </Button>
              </>
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
        <CardContent>
          <Box component='ul' sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', p: 0, m: 0 }}>
            {isLoading ? (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                <CircularProgress disableShrink />
              </Box>
            ) : (
              photos?.photos?.map((photo: PhotoTypes) => {
                return (
                  <Card sx={{ maxWidth: 345 }} key={photo.id}>
                    <CardActionArea>
                      <CardMedia component='img' height={220} src={photo.imgUrl} alt='event picture' />

                      <Tooltip title='Delete'>
                        <IconButton
                          color='primary'
                          sx={{ position: 'absolute', top: 5, right: 5 }}
                          aria-label='delete photo'
                          onClick={() => handleDeletePhoto(Number(photo.id))}
                          component='span'
                        >
                          <HighlightOffIcon />
                        </IconButton>
                      </Tooltip>
                    </CardActionArea>
                  </Card>
                )
              })
            )}
          </Box>
        </CardContent>
      </Collapse>

      {isVideo ? (
        <DialogUploadVideo handleDialogClose={handleDialogClose} open={open} />
      ) : (
        <DialogUploadPhoto handleDialogClose={handleDialogClose} open={open} handleAddPhotos={handleAddPhotos} />
      )}

      {openDeletedModal && (
        <DeleteAlbumModal
          open={openDeletedModal}
          handleClose={() => setOpenDeletedModal(false)}
          handleDelete={() => handleDeleteAlbum()}
          isLoading={isDeletingModal}
        />
      )}
    </Card>
  )
}

export default AlbumItem

const DeleteAlbumModal = ({ open, handleClose, handleDelete, isLoading }: DeleteAlbumModalProps) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{'Confirm Delete Album'}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          Are you sure you want to delete this album? this will delete all photos in this album.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <LoadingButton loading={isLoading} onClick={handleDelete} autoFocus>
          Agree
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}
