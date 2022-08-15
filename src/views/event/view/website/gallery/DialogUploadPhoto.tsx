// ** React Imports

// ** MUI Imports
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import { Fragment } from 'react'

// ** Styled Component
import DropzoneWrapper from 'src/@core/styles/libs/react-dropzone'
import FileUploaderPhoto from './FileUploaderPhoto'

interface DialogUploadPhotoProps {
  handleDialogClose: () => void
  open: boolean
  handleAddPhotos: (file: any[]) => void
}

const DialogUploadPhoto = (props: DialogUploadPhotoProps) => {
  const { handleDialogClose, open, handleAddPhotos } = props

  return (
    <Fragment>
      <Dialog
        maxWidth='md'
        fullWidth={true}
        onClose={handleDialogClose}
        aria-labelledby='simple-dialog-title'
        open={open}
      >
        <DialogTitle id='simple-dialog-title'>Upload Photo</DialogTitle>
        <Box sx={{ p: 4 }}>
          <DropzoneWrapper>
            <FileUploaderPhoto handleAddPhotos={handleAddPhotos} />
          </DropzoneWrapper>
        </Box>
      </Dialog>
    </Fragment>
  )
}

export default DialogUploadPhoto
