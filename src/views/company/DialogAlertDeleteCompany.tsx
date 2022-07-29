import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { CompanyTypes } from 'src/types/companyTypes'

interface DialogAlertDeleteProps {
  open: boolean
  dataCompany: CompanyTypes
  handleCloseAlert: () => void
  handleSubmit: () => void
}

const DialogAlertDelete = (props: DialogAlertDeleteProps) => {
  const { open, dataCompany, handleCloseAlert, handleSubmit } = props

  return (
    <Dialog
      open={open}
      onClose={handleCloseAlert}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{`Are you sure you want to delete company ${dataCompany.name}?`}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          All events managed by this company will be subject to immediate shutdown and affecting members of that event.
          Make sure you understand what you're doing.
        </DialogContentText>
      </DialogContent>
      <DialogActions className='dialog-actions-dense'>
        <Button onClick={handleCloseAlert}>Cancel</Button>
        <Button onClick={handleSubmit} color='secondary'>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogAlertDelete
