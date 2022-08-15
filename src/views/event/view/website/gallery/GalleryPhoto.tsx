import { useEffect } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Plus from 'mdi-material-ui/Plus'
import { useState } from 'react'
import AlbumItem from './AlbumItem'
import DialogAddAlbumForm from './DialogAddAlbum'

// * Redux
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'
import { getAlbum, addAlbum } from 'src/store/event/view/website/galleryStore'
import { AlbumTypes } from 'src/types/website'

const GalleryPhoto = () => {
  const [open, setOpen] = useState<boolean>(false)
  const handleClickOpen = () => setOpen(true)
  const handleDialogClose = () => setOpen(false)

  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.eventDetail)
  const galleyStore = useSelector((state: RootState) => state.galleryWebsite)

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
      <DialogAddAlbumForm handleDialogClose={handleDialogClose} open={open} handleAddAlbum={handleAddAlbum} />

      {galleyStore?.albums?.length > 0 &&
        galleyStore?.albums?.map(album => {
          return <AlbumItem key={album.id} title={`${album.name} (${album.year})`} albumId={album.id} />
        })}
    </Box>
  )
}

export default GalleryPhoto
