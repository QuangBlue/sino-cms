import React from 'react'

// ** MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import Grid from '@mui/material/Grid'

// ** Form Imports
import FormCreateHotelSchema from './FormCreateHotelSchema'

// ** Types Imports
import { HotelTypes } from 'src/types/hotelTypes'


interface DialogHotelTypes {
  open: boolean
  params: HotelTypes | undefined
  handleClose: () => void
}

function DialogHotel(props : DialogHotelTypes) {
  // ** Props
  const { open, params ,handleClose } = props;

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
      <DialogTitle id='form-dialog-title'>{params && params !== null ? "Edit Hotel" : "Create Hotel"}</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 3 }}>Please fill in the information to create an Hotel.</DialogContentText>
        <Grid item xs={12}>
          <FormCreateHotelSchema  fieldData={params} handleClickCloseModal={handleClose} />
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

export default DialogHotel