// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import AgendaActions from './AgendaActions'
import AgendaContent from './AgendaContent'

const AgendaTabView = () => {
  return (
    <Box sx={{ my: 4, mx: 4 }}>
      <Grid container spacing={6}>
        <Grid item xl={9} md={8} xs={12}>
          <AgendaContent />
        </Grid>
        <Grid item xl={3} md={4} xs={12}>
          <AgendaActions />
        </Grid>
      </Grid>
    </Box>
  )
}

export default AgendaTabView
