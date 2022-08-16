// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import TextField from '@mui/material/TextField'

import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { Close, Plus } from 'mdi-material-ui'

// ** Third Party Styles Imports
import {
  Box,
  BoxProps,
  CardContent,
  CardContentProps,
  Chip,
  Collapse,
  FormControl,
  Grid,
  GridProps,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  styled,
  Typography
} from '@mui/material'

// ** Types
import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import CustomInput from './CustomInput'
import { SyntheticEvent, useState } from 'react'
import { DateType } from 'src/types/forms/reactDatepickerTypes'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import Repeater from 'src/@core/components/repeater'

interface DialogAddAlbumProps {
  handleDialogClose: () => void
  open: boolean
}

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      width: 250,
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
    }
  }
}

const names = [
  'Hotel Oliver Hansen',
  'Hotel Van Henry',
  'Hotel April Tucker',
  'Hotel Ralph Hubbard',
  'Hotel Omar Alexander',
  'Hotel Carlos Abbott',
  'Hotel Miriam Wagner',
  'Hotel Bradley Wilkerson',
  'Hotel Virginia Andrews',
  'Hotel Kelly Snyder'
]

const InvoiceAction = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  padding: theme.spacing(2, 1),
  borderLeft: `1px solid ${theme.palette.divider}`
}))

const RepeaterWrapper = styled(CardContent)<CardContentProps>(({ theme }) => ({
  // paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(5.5),
  paddingRight: 0,
  paddingLeft: 0,
  '& .repeater-wrapper + .repeater-wrapper': {
    marginTop: theme.spacing(12)
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

const DialogAddPackage = (props: DialogAddAlbumProps) => {
  const { handleDialogClose, open } = props
  const [dateStart, setDateStart] = useState<DateType>(new Date())
  const [dateEnd, setDateEnd] = useState<DateType>(new Date())
  const [personName, setPersonName] = useState<string[]>([])
  const [count, setCount] = useState<number>(1)
  const handleChange = (event: SelectChangeEvent<string[]>) => {
    setPersonName(event.target.value as string[])
  }

  // ** Deletes form
  const deleteForm = (e: SyntheticEvent) => {
    e.preventDefault()

    // @ts-ignore
    e.target.closest('.repeater-wrapper').remove()
  }

  return (
    <DatePickerWrapper>
      <Dialog fullWidth open={open} scroll='body' onClose={handleDialogClose} onBackdropClick={handleDialogClose}>
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
              Add Package
            </Typography>
          </Box>
          <Grid container spacing={6}>
            <Grid item sm={12} xs={12}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel id='contact-type'>Type</InputLabel>
                <Select label='Type' labelId='contact-type'>
                  <MenuItem value='diamond'>Live Stream</MenuItem>
                  <MenuItem value='gold'>In-Person</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item sm={12} xs={12}>
              <TextField fullWidth label='Title' placeholder='Title' />
            </Grid>
            <Grid item sm={12} xs={12}>
              <TextField fullWidth label='Price' placeholder='Price' />
            </Grid>
            <Grid item sm={6} xs={12}>
              <FormControl fullWidth>
                <DatePicker
                  selected={dateStart}
                  id='basic-input'
                  onChange={(date: Date) => setDateStart(date)}
                  placeholderText='Click to select a date'
                  customInput={<CustomInput label='Start Date' />}
                />
              </FormControl>
            </Grid>
            <Grid item sm={6} xs={12}>
              <FormControl fullWidth>
                <DatePicker
                  selected={dateEnd}
                  id='basic-input'
                  onChange={(date: Date) => setDateEnd(date)}
                  placeholderText='Click to select a date'
                  customInput={<CustomInput label='End Date' />}
                />
              </FormControl>
            </Grid>
            <Grid item sm={12} xs={12}>
              <FormControl fullWidth>
                <InputLabel id='demo-multiple-chip-label'>Hotels</InputLabel>
                <Select
                  multiple
                  label='Hotels'
                  value={personName}
                  MenuProps={MenuProps}
                  id='demo-multiple-chip'
                  onChange={handleChange}
                  labelId='demo-multiple-chip-label'
                  renderValue={selected => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                      {(selected as unknown as string[]).map(value => (
                        <Chip key={value} label={value} sx={{ m: 0.75 }} />
                      ))}
                    </Box>
                  )}
                >
                  {names.map(name => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item sm={12} xs={12}>
              <RepeaterWrapper>
                <Repeater count={count}>
                  {(i: number) => {
                    const Tag = i === 0 ? Box : Collapse

                    return (
                      <Tag key={i} className='repeater-wrapper' {...(i !== 0 ? { in: true } : {})}>
                        <Grid container>
                          <RepeatingContent item xs={12}>
                            <Grid container sx={{ py: 4, width: '100%', pr: { lg: 0, xs: 4 } }}>
                              <Grid item xs={12} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
                                <Typography
                                  variant='subtitle2'
                                  className='col-title'
                                  sx={{ mb: { md: 2, xs: 0 }, color: 'text.primary' }}
                                >
                                  Benefit #{i + 1}
                                </Typography>

                                <TextField
                                  rows={2}
                                  fullWidth
                                  multiline
                                  size='small'
                                  sx={{ mt: 3.5 }}
                                  defaultValue='Virtual Exhibition'
                                />
                              </Grid>
                            </Grid>
                            <InvoiceAction>
                              <IconButton size='small' onClick={deleteForm}>
                                <Close fontSize='small' />
                              </IconButton>
                            </InvoiceAction>
                          </RepeatingContent>
                        </Grid>
                      </Tag>
                    )
                  }}
                </Repeater>

                <Grid container sx={{ mt: 4.75 }}>
                  <Grid item xs={12} sx={{ px: 0 }}>
                    <Button
                      size='small'
                      variant='contained'
                      startIcon={<Plus fontSize='small' />}
                      onClick={() => setCount(count + 1)}
                    >
                      Add Benefit
                    </Button>
                  </Grid>
                </Grid>
              </RepeaterWrapper>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ pb: { xs: 8, sm: 12.5 }, justifyContent: 'center' }}>
          <Button variant='outlined' color='secondary' onClick={handleDialogClose}>
            Cancel
          </Button>
          <Button variant='contained' sx={{ mr: 2 }} onClick={handleDialogClose}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </DatePickerWrapper>
  )
}

export default DialogAddPackage
