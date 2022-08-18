import { Box, Button, Card, CardActions, CardContent, Grid, TextField, Typography } from '@mui/material'
import * as React from 'react'

import Plyr from 'plyr-react'
import 'plyr-react/plyr.css'

// export interface ILiveStreamDetailProps {}

export default function LiveStreamDetail() {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Plyr
              source={{
                type: 'video',
                sources: [
                  {
                    src: 'yWtFb9LJs3o',
                    provider: 'youtube'
                  }
                ]
              }}
            />
          </CardContent>
          <CardContent className='card-action-dense'>
            <Box sx={{ display: 'flex', flexDirection: 'column' }} gap={6}>
              <TextField fullWidth label='English Url' placeholder='English Url' />
              <TextField fullWidth label='Chinese Url' placeholder='Chinese Url' />
              <Button variant='contained'>Save</Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant='h6' sx={{ mb: 2 }}>
              Influencing The Influencer
            </Typography>
            <Typography variant='body2' sx={{ mb: 2 }}>
              Computers have become ubiquitous in almost every facet of our lives. At work, desk jockeys spend hours in
              front of their desktops, while delivery people scan bar codes with handhelds and workers in the field stay
              in touch.
            </Typography>
            <Typography variant='body2'>
              If you’re in the market for new desktops, notebooks, or PDAs, there are a myriad of choices. Here’s a
              rundown of some of the best systems available.
            </Typography>
          </CardContent>
          <CardActions className='card-action-dense'>
            <Button>Read More</Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  )
}
