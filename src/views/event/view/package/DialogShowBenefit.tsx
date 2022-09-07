// ** MUI Imports

import Dialog from '@mui/material/Dialog'

import DialogContent from '@mui/material/DialogContent'
import { Close } from 'mdi-material-ui'

// ** Third Party Styles Imports
import {
  Box,
  CardContent,
  CardContentProps,
  Collapse,
  Grid,
  GridProps,
  IconButton,
  styled,
  TextField,
  Typography
} from '@mui/material'

// ** Types

import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import Repeater from 'src/@core/components/repeater'

interface DialogShowBenefitProps {
  handleDialogClose: () => void
  open: boolean
  benefits: string[]
}

const RepeaterWrapper = styled(CardContent)<CardContentProps>(({ theme }) => ({
  // paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(5.5),
  paddingRight: 0,
  paddingLeft: 0,
  '& .repeater-wrapper + .repeater-wrapper': {
    marginTop: theme.spacing(6)
  }
}))

const RepeatingContent = styled(Grid)<GridProps>(({ theme }) => ({
  paddingRight: 0,
  display: 'flex',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  '& .col-title': {
    top: '-1.5rem',
    position: 'absolute'
  },
  '& .MuiInputBase-input': {
    color: theme.palette.text.secondary
  },
  [theme.breakpoints.down('lg')]: {
    '& .col-title': {
      top: '0',
      position: 'relative'
    }
  }
}))

const Img = styled('img')(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: 250
  }
}))

const DialogShowBenefit = (props: DialogShowBenefitProps) => {
  const { handleDialogClose, open, benefits } = props

  return (
    <DatePickerWrapper>
      <Dialog
        fullWidth
        open={open}
        scroll='body'
        onClose={handleDialogClose}
        onBackdropClick={handleDialogClose}
      >
        <DialogContent sx={{ position: 'relative' }}>
          <IconButton
            size='small'
            onClick={handleDialogClose}
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
          >
            <Close />
          </IconButton>
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
              {'Benefits'}
            </Typography>
          </Box>
          {benefits.length == 0 && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}
              gap={4}
            >
              <Img
                width={300}
                alt='Upload img'
                src='/images/misc/no-data.png'
              />
              <Typography align='center'> No benefits</Typography>
            </Box>
          )}
          <RepeaterWrapper>
            <Repeater count={benefits.length}>
              {(i: number) => {
                const Tag = i === 0 ? Box : Collapse

                return (
                  <Tag
                    key={i}
                    className='repeater-wrapper'
                    {...(i !== 0 ? { in: true } : {})}
                  >
                    <Grid container>
                      <RepeatingContent item xs={12}>
                        <Grid
                          container
                          sx={{
                            py: 4,
                            width: '100%',
                            pr: { lg: 0, xs: 4 }
                          }}
                        >
                          <Grid
                            item
                            xs={12}
                            sx={{ px: 4, my: { lg: 0, xs: 4 } }}
                          >
                            <Typography
                              variant='subtitle2'
                              sx={{
                                color: 'text.primary'
                              }}
                            >
                              Benefit #{i + 1}
                            </Typography>

                            <TextField
                              rows={2}
                              value={benefits[i]}
                              fullWidth
                              multiline
                              size='small'
                              sx={{ mt: 3.5 }}
                            />
                          </Grid>
                        </Grid>
                      </RepeatingContent>
                    </Grid>
                  </Tag>
                )
              }}
            </Repeater>
          </RepeaterWrapper>
        </DialogContent>
      </Dialog>
    </DatePickerWrapper>
  )
}

export default DialogShowBenefit
