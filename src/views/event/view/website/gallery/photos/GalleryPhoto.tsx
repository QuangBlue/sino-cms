import { useEffect } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Plus from 'mdi-material-ui/Plus'
import { useState } from 'react'
import AlbumItem from '../AlbumItem'
import DialogAddAlbumForm from '../DialogAddAlbum'

// * Redux
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'
import { getAlbum, addAlbum, editAlbum } from 'src/store/event/view/website/galleryStore'
import { AlbumTypes } from 'src/types/website'

const GalleryPhoto = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [editParams, setEditParams] = useState<AlbumTypes | null>(null)

  const handleClickOpen = () => setOpen(true)
  const handleDialogClose = () => {
    setEditParams(null)
    setOpen(false)
  }

  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.eventDetail)
  const galleyStore = useSelector((state: RootState) => state.galleryWebsite)

  const { isLoading, albums } = galleyStore

  const eventName = store.eventData.baseName

  useEffect(() => {
    if (eventName) {
      dispatch(getAlbum(eventName))
    }
  }, [dispatch, eventName])

  const handleAddAlbum = async (params: AlbumTypes) => {
    const result = await dispatch(addAlbum({ eventName, params }))

    if (result?.payload?.id) {
      setOpen(false)
      dispatch(getAlbum(eventName))
    }
  }

  const handleEditAlbum = async (params: AlbumTypes) => {
    const result = await dispatch(editAlbum({ albumId: Number(params.id), params }))

    if (result?.payload?.id) {
      setOpen(false)
      dispatch(getAlbum(eventName))
    }
  }

  const handleOpenEditAlbumModal = (params: AlbumTypes) => {
    setEditParams(params)
    handleClickOpen()
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 4 }}>
        <Typography variant='h6' sx={{ mb: 3 }}>
          Albums
        </Typography>
        <Button size='small' variant='contained' startIcon={<Plus fontSize='small' />} onClick={handleClickOpen}>
          Add Album
        </Button>
      </Box>
      <DialogAddAlbumForm
        handleDialogClose={handleDialogClose}
        open={open}
        handleAddAlbum={handleAddAlbum}
        handleEditAlbum={handleEditAlbum}
        editParams={editParams}
        isLoading={isLoading}
      />

      {albums?.length > 0 &&
        albums?.map(album => {
          return (
            <AlbumItem
              key={album.id}
              name={album.name}
              year={album.year}
              albumId={album.id}
              handleOpenEditAlbumModal={handleOpenEditAlbumModal}
            />
          )
        })}
    </Box>
  )
}

export default GalleryPhoto
