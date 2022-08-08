// ** React Imports

import { Box, Button, Grid } from '@mui/material'

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
      <Grid container sx={{ mt: 4.75, display: 'flex', justifyContent: 'flex-end' }}>
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
