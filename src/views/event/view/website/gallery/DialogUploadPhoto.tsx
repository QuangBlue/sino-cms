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
}

const DialogUploadPhoto = (props: DialogUploadPhotoProps) => {
  const { handleDialogClose, open } = props

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
            <FileUploaderPhoto />
          </DropzoneWrapper>
        </Box>
      </Dialog>
    </Fragment>
  )
}

export default DialogUploadPhoto
