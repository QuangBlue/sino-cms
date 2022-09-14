// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CircularProgress from '@mui/material/CircularProgress'

// import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'

import FormHelperText from '@mui/material/FormHelperText'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Icons Imports
import Button from '@mui/material/Button'

// ** Redux Inports
import { AppDispatch, RootState } from 'src/store'
import { useDispatch, useSelector } from 'react-redux'
import { convertToSlug } from 'src/@core/utils/convert-to-slug'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { MouseEvent, useEffect, useState } from 'react'
import { createEvent, fetchCompany } from 'src/store/event'
import { useAuth } from 'src/hooks/useAuth'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import { Box, Divider, Typography } from '@mui/material'

import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from 'react-datepicker'
import AdapterDateFns from '@mui/lab/AdapterDateFns'

// ** Custom Component Imports
import CustomInput from './PickersCustomInput'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { formatDateToEventTime } from 'src/@core/utils/dateTime'

interface FormCreateEventSchemaProps {
  handleClickCloseModal: () => void
}

const defaultValues = {
  name: '',
  companyName: '',
  address: '',
  endDateTime: null,
  startDateTime: null,
  host: {
    email: '',
    password: '',
    confirmPassword: ''
  }
}

interface State {
  password: string
  showPassword: boolean
  confirmPassword: string
  showConfirmPassword: boolean
}

const schema = yup.object().shape({
  name: yup.string().required('Event Name field is required'),
  address: yup.string().required('Event Address field is required'),
  companyName: yup.string().required('Company Name field is required'),

  host: yup.object().shape({
    email: yup.string().email().required('Email field is required'),
    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Password length should be at least 6 characters')
      .max(16, 'Password cannot exceed more than 16 characters'),
    confirmPassword: yup
      .string()
      .required('Confirm Password is required')
      .min(6, 'Password length should be at least 6 characters')
      .max(16, 'Password cannot exceed more than 16 characters')
      .oneOf([yup.ref('password')], 'Passwords do not match')
  })
})

const FormCreateEventSchema = (props: FormCreateEventSchemaProps) => {
  // ** Props
  const { handleClickCloseModal } = props

  // ** States
  const [state, setState] = useState<State>({
    password: '',
    showPassword: false,
    confirmPassword: '',
    showConfirmPassword: false
  })

  // ** Hook
  const dispatch = useDispatch<AppDispatch>()

  const store = useSelector((state: RootState) => state.event)

  const auth = useAuth()

  const handleClickShowPassword = () => {
    setState({ ...state, showPassword: !state.showPassword })
  }

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }
  const handleClickShowConfirmPassword = () => {
    setState({ ...state, showConfirmPassword: !state.showConfirmPassword })
  }

  const handleMouseDownConfirmPassword = (
    event: MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    dispatch(fetchCompany())
  }, [dispatch])

  const onSubmit = async (payload: any) => {
    const { name, companyName, address, host, endDateTime, startDateTime } =
      payload
    const baseName = convertToSlug(name)

    const params = {
      name,
      baseName,
      address,
      startDateTime: formatDateToEventTime(startDateTime),
      endDateTime: formatDateToEventTime(endDateTime),
      host: {
        email: host.email,
        password: host.password
      }
    }

    console.log(params)

    dispatch(
      createEvent({
        params,
        handleClickCloseModal,
        companyName,
        agentId: auth.user?.id || 0
      })
    )
  }

  return (
    <DatePickerWrapper>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name='name'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        inputProps={{
                          autoComplete: 'new-password'
                        }}
                        value={value}
                        label='Event Name'
                        onChange={onChange}
                        placeholder='Event Name'
                        error={Boolean(errors.name)}
                        aria-describedby='validation-schema-company-name'
                      />
                    )}
                  />
                  {errors.name && (
                    <FormHelperText
                      sx={{ color: 'error.main' }}
                      id='validation-schema-company-name'
                    >
                      {errors.name.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name='address'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        inputProps={{
                          autoComplete: 'new-password'
                        }}
                        value={value}
                        label='Event Address'
                        onChange={onChange}
                        placeholder='Event Address'
                        error={Boolean(errors.address)}
                        aria-describedby='validation-schema-address-event'
                      />
                    )}
                  />
                  {errors.address && (
                    <FormHelperText
                      sx={{ color: 'error.main' }}
                      id='validation-schema-address-event'
                    >
                      {errors.address.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='company-select-label'>
                    Choose Company
                  </InputLabel>
                  <Controller
                    name='companyName'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        label='Choose Company'
                        value={value}
                        onChange={onChange}
                        id='company-select'
                        labelId='company-select-label'
                      >
                        {store.listCompany.map(company => (
                          <MenuItem key={company.id} value={company.baseName}>
                            {company.name}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  {errors.companyName && (
                    <FormHelperText
                      sx={{ color: 'error.main' }}
                      id='validation-schema-company-name'
                    >
                      {errors.companyName.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth sx={{ width: '100%' }}>
                  <Controller
                    name='startDateTime'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <DatePicker
                        className=''
                        selected={value}
                        onChange={onChange}
                        showTimeSelect
                        timeFormat='HH:mm'
                        timeIntervals={15}
                        id='date-time-picker'
                        timeCaption='Time Picker'
                        dateFormat='MM/dd/yyyy h:mm aa'
                        customInput={<CustomInput label='Start Date' />}
                      />
                    )}
                  />
                  {errors.startDateTime && (
                    <FormHelperText
                      sx={{ color: 'error.main' }}
                      id='validation-schema-company-startDateTime'
                    >
                      {errors.startDateTime.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name='endDateTime'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Box sx={{ width: '100%' }}>
                          <DatePicker
                            className=''
                            selected={value}
                            onChange={onChange}
                            showTimeSelect
                            timeFormat='HH:mm'
                            timeIntervals={15}
                            id='date-time-picker'
                            timeCaption='Time Picker'
                            dateFormat='MM/dd/yyyy h:mm aa'
                            customInput={<CustomInput label='End Date' />}
                          />
                        </Box>
                      </LocalizationProvider>
                    )}
                  />
                  {errors.endDateTime && (
                    <FormHelperText
                      sx={{ color: 'error.main' }}
                      id='validation-schema-company-endDateTime'
                    >
                      {errors.endDateTime.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Divider />
                <Typography variant='h6'>Default Admin Account</Typography>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name='host.email'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        type='email'
                        inputProps={{
                          autoComplete: 'new-password'
                        }}
                        value={value}
                        label='Admin Email'
                        onChange={onChange}
                        error={Boolean(errors.host?.email)}
                        placeholder='host.event@sinoelite.com'
                        aria-describedby='validation-schema-phone'
                      />
                    )}
                  />
                  {errors.host?.email && (
                    <FormHelperText
                      sx={{ color: 'error.main' }}
                      id='validation-schema-phone'
                    >
                      {errors.host?.email.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel
                    htmlFor='validation-schema-password'
                    error={Boolean(errors.host?.password)}
                  >
                    Admin Password
                  </InputLabel>
                  <Controller
                    name='host.password'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <OutlinedInput
                        value={value}
                        label='Admin Password'
                        onChange={onChange}
                        id='validation-schema-password'
                        error={Boolean(errors.host?.password)}
                        type={state.showPassword ? 'text' : 'password'}
                        endAdornment={
                          <InputAdornment position='end'>
                            <IconButton
                              edge='end'
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              aria-label='toggle password visibility'
                            >
                              {state.showPassword ? (
                                <EyeOutline />
                              ) : (
                                <EyeOffOutline />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    )}
                  />
                  {errors.host?.password && (
                    <FormHelperText
                      sx={{ color: 'error.main' }}
                      id='validation-schema-password'
                    >
                      {errors.host?.password.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='user-view-security-confirm-password'>
                    Confirm Password
                  </InputLabel>
                  <Controller
                    name='host.confirmPassword'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <OutlinedInput
                        label='Admin Confirm Password'
                        value={value}
                        id='user-view-security-confirm-password'
                        error={Boolean(errors.host?.confirmPassword)}
                        type={state.showConfirmPassword ? 'text' : 'password'}
                        onChange={onChange}
                        endAdornment={
                          <InputAdornment position='end'>
                            <IconButton
                              edge='end'
                              aria-label='toggle password visibility'
                              onClick={handleClickShowConfirmPassword}
                              onMouseDown={handleMouseDownConfirmPassword}
                            >
                              {state.showConfirmPassword ? (
                                <EyeOutline />
                              ) : (
                                <EyeOffOutline />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    )}
                  />
                  {errors.host?.confirmPassword && (
                    <FormHelperText
                      sx={{ color: 'error.main' }}
                      id='validation-schema-password'
                    >
                      {errors.host?.confirmPassword.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid
                item
                xs={12}
                sx={{ display: 'flex', justifyContent: 'flex-end' }}
              >
                <Button
                  size='large'
                  variant='text'
                  style={{ minWidth: 120 }}
                  onClick={handleClickCloseModal}
                >
                  Cancel
                </Button>
                <Button
                  size='large'
                  type='submit'
                  variant='contained'
                  style={{ minWidth: 120 }}
                >
                  {store.isCreating ? (
                    <CircularProgress size='1.6rem' color='inherit' />
                  ) : (
                    'Create'
                  )}
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </DatePickerWrapper>
  )
}

export default FormCreateEventSchema
