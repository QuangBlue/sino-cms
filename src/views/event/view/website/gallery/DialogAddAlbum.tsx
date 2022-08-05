// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import TextField from '@mui/material/TextField'

import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { Close } from 'mdi-material-ui'

// ** Third Party Styles Imports
import { Box, Grid, IconButton, Typography } from '@mui/material'

interface DialogAddAlbumProps {
  handleDialogClose: () => void
  open: boolean
  isVideo?: boolean
}

const maxValue = 2100

const DialogAddAlbumForm = (props: DialogAddAlbumProps) => {
  const { handleDialogClose, open, isVideo } = props

  // ** State

  const [year, setYear] = useState<string>()

  const handleYear = (e: any) => {
    const newValue = Math.min(e.target.value, maxValue)
    setYear(newValue == 0 ? '' : newValue.toString())
  }

  return (
    <Dialog
      fullWidth
      open={open}
      maxWidth='md'
      scroll='body'
      onClose={handleDialogClose}
      onBackdropClick={handleDialogClose}
    >
      <DialogContent sx={{ pb: 6, px: { xs: 8, sm: 15 }, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
        <IconButton size='small' onClick={handleDialogClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
          <Close />
        </IconButton>
        <Box sx={{ mb: 8, textAlign: 'center' }}>
          <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
            Add New Album
          </Typography>
        </Box>
        <Grid container spacing={6}>
          <Grid item sm={8}>
            <TextField fullWidth label='Album Title' placeholder='Album Title' />
          </Grid>
          <Grid item sm={4}>
            <TextField fullWidth label='Year of Album' placeholder='Year of Album' value={year} onChange={handleYear} />
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

export default DialogAddAlbumForm
