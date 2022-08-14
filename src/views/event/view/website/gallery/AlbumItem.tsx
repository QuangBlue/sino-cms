import { useEffect } from 'react'
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  IconButton
} from '@mui/material'
import { ChevronDown, ChevronUp, Plus } from 'mdi-material-ui'
import { useState } from 'react'
import DialogUploadPhoto from './DialogUploadPhoto'
import DialogUploadVideo from './DialogUploadVideo'
import axiosClient from 'src/configs/axiosClient'

import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'
import { addPhotos } from 'src/store/event/view/website/galleryStore'
import { PhotoTypes } from 'src/types/website'

interface AlbumItemProps {
  isVideo?: boolean
  title: string
  albumId: number | undefined
}

const AlbumItem = (prop: AlbumItemProps) => {
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const [photos, setPhotos] = useState<any>([])

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
    // TODO: Put this in api folder
    const result = await axiosClient.get(`/gallery/${albumId}`)
    setPhotos(result.data)
  }

  console.log('photos', photos)

  return (
    <Card variant='outlined' sx={{ boxShadow: 0, mb: 4 }}>
      <CardHeader
        title={title}
        action={
          <Box>
            {collapsed && (
              <Button
                sx={{ mr: 10 }}
                size='small'
                variant='contained'
                startIcon={<Plus fontSize='small' />}
                onClick={handleClickOpen}
              >
                {isVideo ? 'Add Video' : 'Add Photo'}
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
        <CardContent>
          <Box component='ul' sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', p: 0, m: 0 }}>
            {photos?.photos?.map((photo: PhotoTypes) => {
              return (
                <Card sx={{ maxWidth: 345 }} key={photo.id}>
                  <CardActionArea>
                    <CardMedia component='img' src={photo.imgUrl} alt='event picture' />
                  </CardActionArea>
                </Card>
              )
            })}
          </Box>
        </CardContent>
      </Collapse>

      {isVideo ? (
        <DialogUploadVideo handleDialogClose={handleDialogClose} open={open} />
      ) : (
        <DialogUploadPhoto handleDialogClose={handleDialogClose} open={open} />
      )}
    </Card>
  )
}

export default AlbumItem
