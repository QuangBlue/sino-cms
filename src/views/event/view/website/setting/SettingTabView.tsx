import { Box, Grid } from '@mui/material'
import * as React from 'react'
import MenuSetting from './MenuSetting'
import StylesSite from './StylesSite'

export default function SettingTabView() {
  return (
    <Box sx={{ my: 4, mx: 4 }}>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={6} md={4}>
          <MenuSetting />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StylesSite />
        </Grid>
      </Grid>
    </Box>
  )
}
