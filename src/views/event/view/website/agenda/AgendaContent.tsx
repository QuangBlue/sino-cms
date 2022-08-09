// ** React Imports

import { Box, Button, Card, CardContent, CardHeader, TextField } from '@mui/material'

import { Plus } from 'mdi-material-ui'
import { useState } from 'react'
import AgengaItem from './AgendaItem'
import DialogAddAgenda from './DialogAddAgenda'

const AgendaContent = () => {
  const [open, setOpen] = useState<boolean>(false)
  const handleClickOpen = () => setOpen(true)
  const handleDialogClose = () => setOpen(false)

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }} gap={6}>
      <Card>
        <CardHeader title='Title' />
        <CardContent>
          <TextField
            fullWidth
            id='title-speaker'
            sx={{ '& .MuiInputBase-input': { color: 'text.secondary', fontWeight: 600 } }}
            placeholder='Title Header'
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader
          title=' List Agenda'
          action={
            <Box>
              <TextField size='small' placeholder='Search Agenda' sx={{ mr: 4, mb: 2, maxWidth: '180px' }} />
              <Button variant='contained' startIcon={<Plus fontSize='small' />} onClick={handleClickOpen}>
                Add Agenda
              </Button>
            </Box>
          }
        />

        <CardContent>
          <AgengaItem />
          <AgengaItem />
          <AgengaItem />
        </CardContent>
      </Card>
      <DialogAddAgenda handleDialogClose={handleDialogClose} open={open} />
    </Box>
  )
}

export default AgendaContent
