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

interface AlbumItemProps {
  isVideo?: boolean
}

const AlbumItem = (prop: AlbumItemProps) => {
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const handleClickOpen = () => setOpen(true)
  const handleDialogClose = () => setOpen(false)

  const { isVideo } = prop

  return (
    <Card variant='outlined' sx={{ boxShadow: 0, mb: 4 }}>
      <CardHeader
        title='Album Title'
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
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component='img'
                  src='https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=4140&q=80'
                  alt='green iguana'
                />
              </CardActionArea>
            </Card>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component='img'
                  src='https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=4140&q=80'
                  alt='green iguana'
                />
              </CardActionArea>
            </Card>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component='img'
                  src='https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=4140&q=80'
                  alt='green iguana'
                />
              </CardActionArea>
            </Card>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component='img'
                  src='https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=4140&q=80'
                  alt='green iguana'
                />
              </CardActionArea>
            </Card>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component='img'
                  src='https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=4140&q=80'
                  alt='green iguana'
                />
              </CardActionArea>
            </Card>
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
