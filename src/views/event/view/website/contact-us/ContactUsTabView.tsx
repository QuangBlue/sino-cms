// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import ContactUsActions from './ContactUsActions'
import ContactUsContent from './ContactUsContent'

const ContactUsTabView = () => {
  return (
    <Box sx={{ my: 4, mx: 4 }}>
      <Grid container spacing={6}>
        <Grid item xl={9} md={8} xs={12}>
          <ContactUsContent />
        </Grid>
        <Grid item xl={3} md={4} xs={12}>
          <ContactUsActions />
        </Grid>
      </Grid>
    </Box>
  )
}

export default ContactUsTabView
