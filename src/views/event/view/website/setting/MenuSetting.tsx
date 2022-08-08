import { Box, Button, Card, CardContent, CardHeader, Switch, Typography } from '@mui/material'
import * as React from 'react'

export default function MenuSetting() {
  return (
    <Card>
      <CardHeader
        title='Menu Setting'
        subheader='You can hide/show the menus'
        subheaderTypographyProps={{ sx: { lineHeight: 1.429 } }}
        titleTypographyProps={{ sx: { letterSpacing: '0.15px' } }}
        action={
          <Button size='small' fullWidth sx={{ mb: 3.5 }} variant='contained'>
            Save
          </Button>
        }
      />
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography>About Us</Typography>
          <Switch />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Gallery</Typography>
          <Switch />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Agenda</Typography>
          <Switch />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Speaker</Typography>
          <Switch />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Sponsors</Typography>
          <Switch />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Organiser & Partners</Typography>
          <Switch />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Register</Typography>
          <Switch />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Contact Us</Typography>
          <Switch />
        </Box>
      </CardContent>
    </Card>
  )
}
