// ** React Imports

import { Box, Divider, Grid, TextField, Typography } from '@mui/material'
import ContactUsInfoList from './ContactUsInfo'

const ContactUsContent = () => {
  return (
    <Box>
      <Grid>
        <Typography variant='h6' sx={{ mb: 3 }}>
          Title
        </Typography>
        <TextField
          fullWidth
          sx={{ '& .MuiInputBase-input': { color: 'text.secondary', fontWeight: 600 } }}
          placeholder='Title'
        />
      </Grid>

      <Divider sx={{ mt: 4, mb: 4 }} />
      <Typography variant='h6' sx={{ mb: 3 }}>
        Email
      </Typography>
      <TextField
        fullWidth
        sx={{ '& .MuiInputBase-input': { color: 'text.secondary', fontWeight: 600 } }}
        placeholder='Email'
      />
      <Divider sx={{ mt: 4, mb: 4 }} />
      <ContactUsInfoList />
    </Box>
  )
}

export default ContactUsContent
