import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { PackageTypesData, PriceTypes } from 'src/types/eventTypes'

interface DialogAlertDeleteProps {
  open: boolean
  dataPackage: PackageTypesData
  priceSelected: PriceTypes | null
  handleCloseAlert: () => void
  handleSubmit: () => void
}

const DialogAlertDelete = (props: DialogAlertDeleteProps) => {
  const { open, dataPackage, handleCloseAlert, handleSubmit, priceSelected } =
    props

  return (
    <Dialog
      open={open}
      onClose={handleCloseAlert}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>
        {(priceSelected ? priceSelected.status : dataPackage.status)
          ? `Are you sure you want to delete  ${
              priceSelected ? 'price' : 'package'
            } `
          : `Are you sure you want to resume ${
              priceSelected ? 'price' : 'package'
            } `}
        <b>{priceSelected ? priceSelected.price : dataPackage.name}</b> ?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {(priceSelected ? priceSelected.status : dataPackage.status)
            ? ` ${
                priceSelected ? 'Price' : 'Package'
              } will be deleted. Make sure you understand what you're doing.`
            : ` ${
                priceSelected ? 'Price' : 'Package'
              } will be resume. Make sure you understand what you're doing.`}
        </DialogContentText>
      </DialogContent>
      <DialogActions className='dialog-actions-dense'>
        <Button onClick={handleCloseAlert}>Cancel</Button>
        <Button onClick={handleSubmit} color='secondary'>
          {(priceSelected ? priceSelected.status : dataPackage.status)
            ? 'Delete'
            : 'Resume'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogAlertDelete
