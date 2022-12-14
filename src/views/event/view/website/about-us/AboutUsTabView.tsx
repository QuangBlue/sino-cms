// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import AboutUsActions from './AboutUsActions'
import AboutUsContent from './AboutUsContent'

const SpeakerTabView = () => {
  return (
    <Box sx={{ my: 4, mx: 4 }}>
      <Grid container spacing={6}>
        <Grid item xl={9} md={8} xs={12}>
          <AboutUsContent />
        </Grid>
        <Grid item xl={3} md={4} xs={12}>
          <AboutUsActions />
        </Grid>
      </Grid>
    </Box>
  )
}

export default SpeakerTabView
