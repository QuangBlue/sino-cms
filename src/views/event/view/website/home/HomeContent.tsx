import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  styled,
  Switch,
  TextField,
  Typography
} from '@mui/material'
import { useState } from 'react'
import DialogUploadBanner from './DialogUploadBanner'

import { EditorState } from 'draft-js'
import ReactDraftWysiwyg from 'src/@core/components/react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { EditorWrapper } from 'src/@core/styles/libs/react-draft-wysiwyg'
import HomeListSpeaker from './ListSpeaker'
import HomeListSponsor from './ListSponsor'

const ImgStyled = styled('img')(({ theme }) => ({
  width: '100%',
  maxWidth: '80%',
  marginBottom: theme.spacing(4),
  borderRadius: theme.shape.borderRadius
}))

const HomeContent = () => {
  const [openUpload, setOpenUpload] = useState<boolean>(false)
  const handleClickOpen = () => setOpenUpload(true)
  const handleDialogClose = () => setOpenUpload(false)

  const [value, setValue] = useState(EditorState.createEmpty())

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }} gap={6}>
      <Card>
        <CardHeader
          title='Banner'
          action={
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Button size='small' variant='contained' onClick={handleClickOpen} sx={{ mr: 6 }}>
                Upload Banner
              </Button>
              <InputLabel htmlFor='go-live' sx={{ cursor: 'pointer', fontSize: '0.875rem', color: 'text.secondary' }}>
                Hide / Show
              </InputLabel>
              <Switch id='go-live' />
            </Box>
          }
        />
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
          </Box>
        </CardContent>
      </Card>

      <Card>
        <CardHeader
          title='Organiser & Partners Banner'
          action={
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <InputLabel htmlFor='go-live' sx={{ cursor: 'pointer', fontSize: '0.875rem', color: 'text.secondary' }}>
                Hide / Show
              </InputLabel>
              <Switch id='go-live' />
            </Box>
          }
        />
        <CardContent>
          {' '}
          <Box sx={{ display: 'flex', flexDirection: 'column' }} gap={6}>
            <Box sx={{ display: 'flex', alignItems: 'center' }} gap={6}>
              <Typography>Organised By</Typography>
              <Select defaultValue='singapore-exchange'>
                <MenuItem value='singapore-exchange'>Singapore Exchange </MenuItem>
                <MenuItem value='enterprise-singapore'>Enterprise Singapore </MenuItem>
                <MenuItem value='sino-elite'>Sino Elite </MenuItem>
              </Select>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }} gap={6}>
              <Typography>Supported By</Typography>
              <Select defaultValue='enterprise-singapore'>
                <MenuItem value='singapore-exchange'>Singapore Exchange </MenuItem>
                <MenuItem value='enterprise-singapore'>Enterprise Singapore </MenuItem>
                <MenuItem value='sino-elite'>Sino Elite </MenuItem>
              </Select>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }} gap={6}>
              <Typography>Event Partner</Typography>
              <Select defaultValue='sino-elite'>
                <MenuItem value='singapore-exchange'>Singapore Exchange </MenuItem>
                <MenuItem value='enterprise-singapore'>Enterprise Singapore </MenuItem>
                <MenuItem value='sino-elite'>Sino Elite </MenuItem>
              </Select>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Card>
        <CardHeader
          title='About Event'
          action={
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Button size='small' variant='contained' onClick={handleClickOpen} sx={{ mr: 6 }}>
                Upload Image
              </Button>
              <InputLabel htmlFor='go-live' sx={{ cursor: 'pointer', fontSize: '0.875rem', color: 'text.secondary' }}>
                Hide / Show
              </InputLabel>
              <Switch id='go-live' />
            </Box>
          }
        />
        <CardContent>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField label='Title' />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={8}>
              <EditorWrapper>
                <ReactDraftWysiwyg editorState={value} onEditorStateChange={data => setValue(data)} />
              </EditorWrapper>
            </Grid>
            <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'center' }}>
              <ImgStyled
                src={''}
                alt='Profile Pic'
                onError={e => {
                  e.currentTarget.src = '/images/avatars/1.png'
                }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Grid container spacing={6}>
        <Grid item xs={12} sm={6}>
          <HomeListSpeaker />
        </Grid>
        <Grid item xs={12} sm={6}>
          <HomeListSponsor />
        </Grid>
      </Grid>

      <Card>
        <CardHeader title='Footer' />
        <CardContent>
          <FormControl fullWidth>
            <TextField label='Footer' />
          </FormControl>
        </CardContent>
      </Card>

      <DialogUploadBanner handleDialogClose={handleDialogClose} open={openUpload} />
    </Box>
  )
}

export default HomeContent
