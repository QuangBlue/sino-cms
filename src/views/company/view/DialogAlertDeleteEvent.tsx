import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { EventTypes } from 'src/types/eventTypes'

interface DialogAlertDeleteProps {
  open: boolean
  eventData: EventTypes
  handleCloseAlert: () => void
  handleSubmit: () => void
}

const DialogAlertDeleteEvent = (props: DialogAlertDeleteProps) => {
  const { open, eventData, handleCloseAlert, handleSubmit } = props

  return (
    <Dialog
      open={open}
      onClose={handleCloseAlert}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>
        {eventData.status ? `Are you sure you want to delete event` : 'Are you sure you want to resume event'}{' '}
        <b>{eventData.name}?</b>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {eventData.status
            ? `This event will be deactivated and affect participating members. Make sure you understand what you are doing.`
            : `This event will start again. Make sure you understand what you are doing.`}
        </DialogContentText>
      </DialogContent>
      <DialogActions className='dialog-actions-dense'>
        <Button onClick={handleCloseAlert}>Cancel</Button>
        <Button onClick={handleSubmit} color='secondary'>
          {eventData.status ? 'Delete' : 'Resume'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogAlertDeleteEvent
