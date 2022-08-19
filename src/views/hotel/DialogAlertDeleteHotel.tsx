import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { HotelTypes } from 'src/types/hotelTypes'

interface DialogAlertDeleteProps {
  open: boolean
  dataHotel: HotelTypes
  handleCloseAlert: () => void
  handleSubmit: () => void
}

const DialogAlertDeleteHotel = (props: DialogAlertDeleteProps) => {
  const { open, dataHotel, handleCloseAlert, handleSubmit } = props

  return (
    <Dialog
      open={open}
      onClose={handleCloseAlert}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>
        {dataHotel.status ? `Are you sure you want to delete hotel ` : `Are you sure you want to resume hotel `}
        <b>{dataHotel.name}</b> ?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {dataHotel.status
            ? `Make sure you understand what you're doing.`
            : `Make sure you understand what you're doing.`}
        </DialogContentText>
      </DialogContent>
      <DialogActions className='dialog-actions-dense'>
        <Button onClick={handleCloseAlert}>Cancel</Button>
        <Button onClick={handleSubmit} color='secondary'>
          {dataHotel.status ? 'Delete' : 'Resume'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogAlertDeleteHotel
