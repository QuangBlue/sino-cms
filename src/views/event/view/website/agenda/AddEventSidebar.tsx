// ** React Imports
import { useState, Fragment, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Select from '@mui/material/Select'
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

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import CustomInput from './CustomInput'

import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { formatDateFromTime } from 'src/@core/utils/dateTime'

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
  speakers: '',
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

const schema = yup.object().shape({
  title: yup.string().required('Title field is required'),

  // description: yup.string().required('Description field is required'),

  speakerId: yup
    .number()
    .required('Speaker field is required')
    .typeError('Speaker field is required'),
  timeStart: yup.date().required('Start time is required'),
  timeEnd: yup
    .date()
    .when('timeStart', (timeStart, schema) => {
      if (timeStart) {
        const currentDay = new Date(timeStart.getTime())
        const nextDay = new Date(timeStart.getTime() + 86400000)

        return schema
          .min(currentDay, 'End time must be after Start time')
          .max(
            nextDay,
            'End time cannot be more than 24 hours after Start Date/Time'
          )
      } else {
        return schema
      }
    })
    .required('End Date/Time is required')
})

const AddEventSidebar = ({
  drawerWidth,
  isSidebarOpen,
  handleAddEventSidebarToggle,
  agendaId,
  handleAddAgendaDetail,
  editParams
}: any) => {
  // ** States
  const [, setValues] = useState<DefaultStateType>(defaultState)
  const speakerStore = useSelector((state: RootState) => state.speakerWebsite)

  const defaultValues = {
    title: '',
    timeStart: new Date(),
    timeEnd: new Date(),
    speakerId: '',
    description: ''
  }

  const {
    control,
    clearErrors,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    if (editParams) {
      reset({
        ...editParams,
        timeStart: formatDateFromTime(editParams.timeStart),
        timeEnd: formatDateFromTime(editParams.timeEnd),
        speakerId: editParams.speaker.id
      })
    }
  }, [editParams, reset])

  const handleSidebarClose = async () => {
    setValues(defaultState)
    clearErrors()

    handleAddEventSidebarToggle()
  }

  const onSubmit = (params: any) => {
    handleAddAgendaDetail({ agendaId, params })
  }

  const handleDeleteEvent = () => {
    handleSidebarClose()
  }

  const RenderSidebarFooter = () => (
    <Fragment>
      <Button size='large' type='submit' variant='contained' sx={{ mr: 4 }}>
        {editParams ? 'Save' : 'Add'}
      </Button>
      <Button
        size='large'
        variant='outlined'
        color='secondary'
        onClick={handleSidebarClose}
      >
        Cancel
      </Button>
    </Fragment>
  )

  return (
    <Drawer
      anchor='right'
      open={isSidebarOpen}
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
        <Typography variant='h6'>
          {editParams ? 'Update Event' : 'Add Event'}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <DeleteOutline
            fontSize='small'
            sx={{ cursor: 'pointer', mr: 2 }}
            onClick={handleDeleteEvent}
          />

          <Close
            fontSize='small'
            onClick={handleSidebarClose}
            sx={{ cursor: 'pointer' }}
          />
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
                  <TextField
                    label='Title'
                    value={value}
                    onChange={onChange}
                    error={Boolean(errors.title)}
                  />
                )}
              />
              {errors.title && (
                <FormHelperText
                  sx={{ color: 'error.main' }}
                  id='event-title-error'
                >
                  Title is required
                </FormHelperText>
              )}
            </FormControl>

            <Box sx={{ mb: 6 }}>
              <FormControl
                fullWidth
                sx={{ mb: 6 }}
                error={Boolean(errors.timeStart)}
              >
                <Controller
                  name='timeStart'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <DatePicker
                      selectsStart
                      showTimeSelect
                      selected={value}
                      timeIntervals={5}
                      showTimeSelectOnly
                      dateFormat='h:mm aa'
                      id='time-only-picker'
                      timeCaption='Time Picker'
                      onChange={(date: Date) => onChange(date)}
                      customInput={<CustomInput label='Start Time' />}
                    />
                  )}
                />
                {errors.timeStart && (
                  <FormHelperText
                    sx={{ color: 'error.main' }}
                    id='event-title-error'
                  >
                    {errors.timeStart.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Box>
            <Box sx={{ mb: 6 }}>
              <FormControl
                fullWidth
                sx={{ mb: 6 }}
                error={Boolean(errors.timeEnd)}
              >
                <Controller
                  name='timeEnd'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <DatePicker
                      selectsStart
                      showTimeSelect
                      selected={value}
                      timeIntervals={5}
                      showTimeSelectOnly
                      dateFormat='h:mm aa'
                      id='time-only-picker'
                      timeCaption='Time Picker'
                      onChange={(date: Date) => onChange(date)}
                      customInput={<CustomInput label='End Time' />}
                    />
                  )}
                />
                {errors.timeEnd && (
                  <FormHelperText
                    sx={{ color: 'error.main' }}
                    id='event-title-error'
                  >
                    {errors.timeEnd.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Box>

            <Box sx={{ mb: 6 }}>
              <Controller
                name='speakerId'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <FormControl fullWidth error={Boolean(errors.speakerId)}>
                    <InputLabel id='demo-multiple-chip-label'>
                      Speaker
                    </InputLabel>
                    <Select
                      label='Speaker'
                      value={value}
                      MenuProps={MenuProps}
                      id='multiple-speaker'
                      onChange={e => onChange(e.target.value)}
                      labelId='multiple-speaker-label'
                    >
                      {speakerStore?.listSpeaker?.map(speaker => (
                        <MenuItem key={speaker.id} value={speaker.id}>
                          {speaker.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
              {errors.speakerId && (
                <FormHelperText
                  sx={{ color: 'error.main' }}
                  id='event-title-error'
                >
                  Speaker is required
                </FormHelperText>
              )}
            </Box>

            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name='description'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    label='Description'
                    value={value}
                    onChange={onChange}
                    rows={4}
                    multiline
                    fullWidth
                    error={Boolean(errors.description)}
                  />
                )}
              />
            </FormControl>

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
