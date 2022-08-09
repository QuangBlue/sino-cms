// ** React Imports

import { Box, Button, Divider, Grid, TextField, Typography } from '@mui/material'

import { Plus } from 'mdi-material-ui'
import { useState } from 'react'
import AgengaItem from './AgendaItem'
import DialogAddAgenda from './DialogAddAgenda'

const AgendaContent = () => {
  const [open, setOpen] = useState<boolean>(false)
  const handleClickOpen = () => setOpen(true)
  const handleDialogClose = () => setOpen(false)

  return (
    <Box>
      <Typography variant='h6' sx={{ mb: 3 }}>
        Title
      </Typography>
      <TextField
        fullWidth
        id='title-speaker'
        sx={{ '& .MuiInputBase-input': { color: 'text.secondary', fontWeight: 600 } }}
        placeholder='Title Header'
      />
      <Divider sx={{ mt: 4, mb: 4 }} />
      <Grid container sx={{ mt: 4.75, display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant='h6' sx={{ mb: 3 }}>
          List Agenda
        </Typography>
        <Button
          sx={{ mb: 5 }}
          size='small'
          variant='contained'
          startIcon={<Plus fontSize='small' />}
          onClick={handleClickOpen}
        >
          Add Agenda
        </Button>
        <DialogAddAgenda handleDialogClose={handleDialogClose} open={open} />
      </Grid>
      <AgengaItem />
      <AgengaItem />
      <AgengaItem />
    </Box>
  )
}

export default AgendaContent
