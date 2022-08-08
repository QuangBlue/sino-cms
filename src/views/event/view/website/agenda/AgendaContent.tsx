// ** React Imports

import { Box, Button, Grid } from '@mui/material'

import { Plus } from 'mdi-material-ui'
import AgengaItem from './AgendaItem'

const AgendaContent = () => {
  return (
    <Box>
      <Grid container sx={{ mt: 4.75, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          sx={{ mb: 5 }}
          size='small'
          variant='contained'
          startIcon={<Plus fontSize='small' />}
          onClick={() => console.log('open')}
        >
          Add Agenda
        </Button>
      </Grid>
      <AgengaItem />
      <AgengaItem />
      <AgengaItem />
    </Box>
  )
}

export default AgendaContent
