// ** React Imports

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import TextField from '@mui/material/TextField'

import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { Close } from 'mdi-material-ui'

// ** Third Party Styles Imports
import { Box, Grid, IconButton, Typography } from '@mui/material'

interface DialogAddAgendaProps {
  handleDialogClose: () => void
  open: boolean
  isVideo?: boolean
}

const DialogAddAgenda = (props: DialogAddAgendaProps) => {
  const { handleDialogClose, open } = props

  return (
    <Dialog fullWidth open={open} scroll='body' onClose={handleDialogClose} onBackdropClick={handleDialogClose}>
      <DialogContent sx={{ position: 'relative' }}>
        <IconButton size='small' onClick={handleDialogClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
          <Close />
        </IconButton>
        <Box sx={{ mb: 8, textAlign: 'center' }}>
          <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
            Add Agenda
          </Typography>
        </Box>
        <Grid container spacing={6}>
          <Grid item sm={12} xs={12}>
            <TextField fullWidth label='Agenda Title' placeholder='Agenda Title' />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ pb: { xs: 8, sm: 12.5 }, justifyContent: 'center' }}>
        <Button variant='outlined' color='secondary' onClick={handleDialogClose}>
          Discard
        </Button>
        <Button variant='contained' sx={{ mr: 2 }} onClick={handleDialogClose}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogAddAgenda
