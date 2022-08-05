import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Plus from 'mdi-material-ui/Plus'
import { useState } from 'react'
import AlbumItem from './AlbumItem'
import DialogAddAlbumForm from './DialogAddAlbum'

const GalleryPhoto = () => {
  const [open, setOpen] = useState<boolean>(false)
  const handleClickOpen = () => setOpen(true)
  const handleDialogClose = () => setOpen(false)

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
      <DialogAddAlbumForm handleDialogClose={handleDialogClose} open={open} />

      <AlbumItem />
      <AlbumItem />
      <AlbumItem />
      <AlbumItem />
      <AlbumItem />
    </Box>
  )
}

export default GalleryPhoto
