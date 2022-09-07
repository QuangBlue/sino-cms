// ** React Imports
import ReactPlayer from 'react-player'

// ** MUI Imports
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

const VideoModal = ({ link, open, handleClose }: any) => {
  // ** State

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby='full-screen-dialog-title'
        open={open}
        maxWidth={'md'}
        fullWidth={true}
      >
        <DialogTitle id='full-screen-dialog-title'>
          <IconButton
            aria-label='close'
            onClick={handleClose}
            sx={{
              top: 8,
              right: 10,
              position: 'absolute',
              color: theme => theme.palette.grey[500]
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <ReactPlayer url={link} controls width='100%' />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default VideoModal
