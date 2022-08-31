// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import { Fragment } from 'react'
import { TextField, Grid, FormControl, FormHelperText } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { useSelector } from 'react-redux'
import { RootState } from 'src/store'

// ** Styled Component
import DropzoneWrapper from 'src/@core/styles/libs/react-dropzone'
import FileUploaderVideo from '../FileUploaderVideo'

import { uploadVideo, uploadVideoTitle } from 'src/@core/api/upload-api'
import toast from 'react-hot-toast'

interface DialogUploadPhotoProps {
  handleDialogClose: () => void
  open: boolean
  handleFetchVideos: () => void
}

const DialogUploadPhoto = (props: DialogUploadPhotoProps) => {
  const { handleDialogClose, open, handleFetchVideos } = props
  const [files, setFiles] = useState<File[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const storeEvent = useSelector((state: RootState) => state.eventDetail)

  // ** State
  const schema = yup.object().shape({
    name: yup.string().required('Video title is required')
  })

  const initialValues = {
    name: ''
  }

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: initialValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const onSubmit = async (payload: any) => {
    setIsLoading(true)
    const upload = await uploadVideo(files[0], storeEvent.eventData.baseName)

    if (upload.success) {
      const result = await uploadVideoTitle(upload.data.id, payload)
      if (result.id) {
        handleFetchVideos()
        handleDialogClose()
        setIsLoading(false)
        toast.success('Upload video successfully!')
      }
    }
  }

  // useInterval(async () => {
  //   if (videoId) {
  //     const response = await checkUploadVideoStatus(videoId)
  //     if (response.process.status === UPLOADING) return
  //     if (response.process.status === SUCCESS) {
  //       setVideoId(null)
  //       handleDialogClose()
  //       setIsLoading(false)
  //     }
  //     if (response.process.status === ERROR) {
  //       setVideoId(null)
  //       toast.error('Something went wrong!')
  //     }
  //   }

  //   // Re-check every 15s
  // }, 10000)

  return (
    <Fragment>
      <Dialog
        maxWidth='md'
        fullWidth={true}
        onClose={handleDialogClose}
        aria-labelledby='simple-dialog-title'
        open={open}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle id='simple-dialog-title'>Upload Video</DialogTitle>
          <Box sx={{ p: 4 }}>
            <Grid container gap={4}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name='name'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        inputProps={{
                          autoComplete: 'new-password'
                        }}
                        value={value}
                        label='Video Title'
                        onChange={onChange}
                        error={Boolean(errors.name)}
                        aria-describedby='validation-schema-company-name'
                        autoFocus
                      />
                    )}
                  />
                  {errors.name && (
                    <FormHelperText
                      sx={{ color: 'error.main' }}
                      id='validation-schema-company-name'
                    >
                      {errors.name.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <DropzoneWrapper>
                  <FileUploaderVideo
                    files={files}
                    setFiles={setFiles}
                    isLoading={isLoading}
                  />
                </DropzoneWrapper>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Dialog>
    </Fragment>
  )
}

export default DialogUploadPhoto
