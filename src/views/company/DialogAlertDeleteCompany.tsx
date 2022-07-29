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
      <DialogTitle id='alert-dialog-title'>
        {dataCompany.status ? `Are you sure you want to delete company` : 'Are you sure you want to resume company'}{' '}
        <b>{dataCompany.name}?</b>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {dataCompany.status
            ? `All events managed by this company will be shutdown and affecting members of that event. Make sure you understand what you're doing.`
            : `All events managed by this company will be resume. Make sure you understand what you're doing.`}
        </DialogContentText>
      </DialogContent>
      <DialogActions className='dialog-actions-dense'>
        <Button onClick={handleCloseAlert}>Cancel</Button>
        <Button onClick={handleSubmit} color='secondary'>
          {dataCompany.status ? 'Delete' : 'Resume'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogAlertDelete
