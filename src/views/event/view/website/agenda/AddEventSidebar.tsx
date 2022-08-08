// ** React Imports
import { useState, useCallback, Fragment } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

// ** Third Party Imports
import DatePicker from 'react-datepicker'
import { useForm, Controller } from 'react-hook-form'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import DeleteOutline from 'mdi-material-ui/DeleteOutline'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

import Chip from '@mui/material/Chip'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import CustomInput from './CustomInput'
import { DateType } from 'src/types/forms/reactDatepickerTypes'

interface DefaultStateType {
  url: string
  title: string
  allDay: boolean
  calendar: string
  description: string
  endDate: Date | string
  startDate: Date | string
  speakers: string[] | string | undefined
}

const defaultState: DefaultStateType = {
  url: '',
  title: '',
  speakers: [],
  allDay: true,
  description: '',
  endDate: new Date(),
  calendar: 'Business',
  startDate: new Date()
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
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder'
]

const AddEventSidebar = (props: any) => {
  // ** Props
  const { drawerWidth, addEventSidebarOpen, handleAddEventSidebarToggle } = props

  // ** States
  const [values, setValues] = useState<DefaultStateType>(defaultState)
  const [personName, setPersonName] = useState<string[]>([])
  const [timeStart, setTimeStart] = useState<DateType>(new Date())
  const [timeEnd, setTimeEnd] = useState<DateType>(new Date())

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    setPersonName(event.target.value as string[])
  }

  const {
    control,
    setValue,
    clearErrors,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: { title: '' } })

  const handleSidebarClose = async () => {
    setValues(defaultState)
    clearErrors()

    handleAddEventSidebarToggle()
  }

  const onSubmit = () => {
    console.log('submit')
  }

  const handleDeleteEvent = () => {
    // calendarApi.getEventById(store.selectedEvent.id).remove()
    handleSidebarClose()
  }

  const resetToStoredValues = useCallback(() => {
    console.log('reset')
  }, [])

  const resetToEmptyValues = useCallback(() => {
    setValue('title', '')
    setValues(defaultState)
  }, [setValue])

  const RenderSidebarFooter = () => {
    if (true) {
      return (
        <Fragment>
          <Button size='large' type='submit' variant='contained' sx={{ mr: 4 }}>
            Add
          </Button>
          <Button size='large' variant='outlined' color='secondary' onClick={resetToEmptyValues}>
            Reset
          </Button>
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <Button size='large' type='submit' variant='contained' sx={{ mr: 4 }}>
            Update
          </Button>
          <Button size='large' variant='outlined' color='secondary' onClick={resetToStoredValues}>
            Reset
          </Button>
        </Fragment>
      )
    }
  }

  return (
    <Drawer
      anchor='right'
      open={addEventSidebarOpen}
      onClose={handleSidebarClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: ['100%', drawerWidth] } }}
    >
      <Box
        className='sidebar-header'
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: 'background.default',
          p: theme => theme.spacing(3, 3.255, 3, 5.255)
        }}
      >
        <Typography variant='h6'>{false ? 'Update Event' : 'Add Event'}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {true ? (
            <DeleteOutline fontSize='small' sx={{ cursor: 'pointer', mr: 2 }} onClick={handleDeleteEvent} />
          ) : null}
          <Close fontSize='small' onClick={handleSidebarClose} sx={{ cursor: 'pointer' }} />
        </Box>
      </Box>
      <Box className='sidebar-body' sx={{ p: theme => theme.spacing(5, 6) }}>
        <DatePickerWrapper>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name='title'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField label='Title' value={value} onChange={onChange} error={Boolean(errors.title)} />
                )}
              />
              {errors.title && (
                <FormHelperText sx={{ color: 'error.main' }} id='event-title-error'>
                  This field is required
                </FormHelperText>
              )}
            </FormControl>

            <Box sx={{ mb: 6 }}>
              <DatePicker
                selectsStart
                showTimeSelect
                selected={timeStart}
                timeIntervals={5}
                showTimeSelectOnly
                dateFormat='h:mm aa'
                id='time-only-picker'
                timeCaption='Time Picker'
                onChange={(date: Date) => setTimeStart(date)}
                customInput={<CustomInput label='Start Time' />}
              />
            </Box>
            <Box sx={{ mb: 6 }}>
              <FormControl fullWidth>
                <DatePicker
                  selectsEnd
                  showTimeSelect
                  selected={timeEnd}
                  timeIntervals={5}
                  showTimeSelectOnly
                  dateFormat='h:mm aa'
                  id='time-only-picker'
                  timeCaption='Time Picker'
                  onChange={(date: Date) => setTimeEnd(date)}
                  customInput={<CustomInput label='End Time' />}
                />
              </FormControl>
            </Box>

            <Box sx={{ mb: 6 }}>
              <FormControl fullWidth>
                <InputLabel id='demo-multiple-chip-label'>Speaker</InputLabel>
                <Select
                  multiple
                  label='Speaker'
                  value={personName}
                  MenuProps={MenuProps}
                  id='multiple-speaker'
                  onChange={handleChange}
                  labelId='multiple-speaker-label'
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
            </Box>
            <TextField
              rows={4}
              multiline
              fullWidth
              sx={{ mb: 6 }}
              label='Description'
              id='event-description'
              value={values.description}
              onChange={e => setValues({ ...values, description: e.target.value })}
            />
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <RenderSidebarFooter />
            </Box>
          </form>
        </DatePickerWrapper>
      </Box>
    </Drawer>
  )
}

export default AddEventSidebar