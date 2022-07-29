// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Select from '@mui/material/Select'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import AlertTitle from '@mui/material/AlertTitle'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import DialogContent from '@mui/material/DialogContent'
import LinearProgress from '@mui/material/LinearProgress'
import DialogContentText from '@mui/material/DialogContentText'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'

// ** Styles Import
import 'react-credit-cards/es/styles-compiled.css'

// ** Styled <sup> component
const Sup = styled('sup')(({ theme }) => ({
  top: '0.2rem',
  left: '-0.6rem',
  position: 'absolute',
  color: theme.palette.primary.main
}))

// ** Styled <sub> component
const Sub = styled('sub')({
  fontWeight: 300,
  fontSize: '1rem',
  alignSelf: 'flex-end'
})

const UserViewBilling = () => {
  // ** States
  const [openUpgradePlans, setOpenUpgradePlans] = useState<boolean>(false)

  // Handle Edit Card dialog and get card ID

  // Handle Upgrade Plan dialog
  const handleUpgradePlansClickOpen = () => setOpenUpgradePlans(true)
  const handleUpgradePlansClose = () => setOpenUpgradePlans(false)

  return (
    <Fragment>
      <Card sx={{ mb: 6 }}>
        <CardHeader title='Current plan' titleTypographyProps={{ variant: 'h6' }} />
        <CardContent>
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 4 }}>
                <Typography variant='body2' sx={{ mb: 1 }}>
                  Your Current Plan is{' '}
                  <Typography component='span' sx={{ fontWeight: 500, fontSize: '.875rem' }}>
                    Basic
                  </Typography>
                </Typography>
                <Typography variant='body2'>A simple start for everyone</Typography>
              </Box>
              <Box sx={{ mb: 4.5 }}>
                <Typography sx={{ mb: 1, fontWeight: 500, fontSize: '.875rem' }}>Active until Dec 09, 2022</Typography>
                <Typography variant='body2'>We will send you a notification upon Subscription expiration</Typography>
              </Box>
              <Box>
                <Box sx={{ display: 'flex', mb: 1, alignItems: 'center' }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>$99 Per Month</Typography>
                  <CustomChip
                    skin='light'
                    label='Popular'
                    color='primary'
                    sx={{ height: 24, fontSize: '0.75rem', borderRadius: '5px' }}
                  />
                </Box>
                <Typography variant='body2'>Standard plan for small to medium businesses</Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={6} sx={{ mt: [4, 4, 0] }}>
              <Alert icon={false} severity='warning' sx={{ mb: 4 }}>
                <AlertTitle sx={{ fontWeight: 600, mb: theme => `${theme.spacing(1)} !important` }}>
                  We need your attention!
                </AlertTitle>
                Your plan requires updates
              </Alert>
              <Box sx={{ display: 'flex', mb: 2, justifyContent: 'space-between' }}>
                <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                  Days
                </Typography>
                <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                  26 of 30 Days
                </Typography>
              </Box>
              <LinearProgress value={86.6666666} variant='determinate' sx={{ height: 10, borderRadius: '5px' }} />
              <Typography variant='caption' sx={{ mt: 2, mb: 4 }}>
                Your plan requires update
              </Typography>
            </Grid>

            <Grid item xs={12} sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start' }}>
              <Button variant='contained' sx={{ mr: 4, mb: [3, 0] }} onClick={handleUpgradePlansClickOpen}>
                Upgrade Plan
              </Button>
              <Button variant='outlined' color='error'>
                Cancel Subscription
              </Button>
            </Grid>
          </Grid>
        </CardContent>

        <Dialog
          open={openUpgradePlans}
          onClose={handleUpgradePlansClose}
          aria-labelledby='user-view-plans'
          aria-describedby='user-view-plans-description'
          sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650, pt: 8, pb: 8 } }}
        >
          <DialogTitle id='user-view-plans' sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>
            Upgrade Plan
          </DialogTitle>

          <DialogContent>
            <DialogContentText variant='body2' sx={{ textAlign: 'center' }} id='user-view-plans-description'>
              Choose the best plan for the user.
            </DialogContentText>
          </DialogContent>

          <DialogContent
            sx={{
              pb: 8,
              pr: [6, 15],
              pl: [6, 15],
              display: 'flex',
              alignItems: 'center',
              flexWrap: ['wrap', 'nowrap'],
              pt: theme => `${theme.spacing(2)} !important`
            }}
          >
            <FormControl fullWidth size='small' sx={{ mr: [0, 3], mb: [3, 0] }}>
              <InputLabel id='user-view-plans-select-label'>Choose Plan</InputLabel>
              <Select
                label='Choose Plan'
                defaultValue='Standard'
                id='user-view-plans-select'
                labelId='user-view-plans-select-label'
              >
                <MenuItem value='Basic'>Basic - $0/month</MenuItem>
                <MenuItem value='Standard'>Standard - $99/month</MenuItem>
                <MenuItem value='Enterprise'>Enterprise - $499/month</MenuItem>
                <MenuItem value='Company'>Company - $999/month</MenuItem>
              </Select>
            </FormControl>
            <Button variant='contained' sx={{ minWidth: ['100%', 0] }}>
              Upgrade
            </Button>
          </DialogContent>

          <Divider sx={{ m: 0 }} />

          <DialogContent sx={{ pt: 8, pl: [6, 15], pr: [6, 15] }}>
            <Typography sx={{ fontWeight: 500, mb: 2, fontSize: '0.875rem' }}>
              User current plan is standard plan
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: ['wrap', 'nowrap'],
                justifyContent: 'space-between'
              }}
            >
              <Box sx={{ mr: 3, display: 'flex', ml: 2.4, position: 'relative' }}>
                <Sup>$</Sup>
                <Typography
                  variant='h3'
                  sx={{
                    mb: -1.2,
                    lineHeight: 1,
                    color: 'primary.main',
                    fontSize: '3rem !important'
                  }}
                >
                  99
                </Typography>
                <Sub>/ month</Sub>
              </Box>
              <Button color='error' variant='outlined' sx={{ mt: 2 }}>
                Cancel Subscription
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
      </Card>
    </Fragment>
  )
}

export default UserViewBilling
