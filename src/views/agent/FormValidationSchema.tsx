// ** React Imports
import { MouseEvent, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CircularProgress from '@mui/material/CircularProgress'

// import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

// import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import Button from '@mui/material/Button'

// ** Types Imports
import { CreateAgentParams } from 'src/types/agentTypes'

// ** Redux Inports
import { AppDispatch, RootState } from 'src/store'
import { useDispatch, useSelector } from 'react-redux'
import { createAgent } from 'src/store/agent'

interface State {
  password: string
  showPassword: boolean
  confirmPassword: string
  showConfirmPassword: boolean
}

interface FormValidationSchemaProps {
  handleClickCloseModal: () => void
}

const defaultValues = {
  email: '',
  lastName: '',
  firstName: '',
  password: '',
  confirmPassword: '',
  phone: '',
  eventLimit: ''
}

const showErrors = (field: string, valueLen: number, min: number) => {
  if (valueLen === 0) {
    return `${field} field is required`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`
  } else if (valueLen > 0 && valueLen > min) {
    return `${field} must be smaller ${min} characters`
  } else {
    return ''
  }
}

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const schema = yup.object().shape({
  email: yup.string().email().required('Email field is required'),
  lastName: yup
    .string()
    .min(3, obj => showErrors('Last Name', obj.value.length, obj.min))
    .required(),
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
    .oneOf([yup.ref('password')], 'Passwords do not match'),
  firstName: yup
    .string()
    .min(3, obj => showErrors('First Name', obj.value.length, obj.min))
    .required(),
  phone: yup
    .string()
    .min(8, obj => showErrors('Phone', obj.value.length, obj.min))
    .max(15, obj => showErrors('Phone', obj.value.length, obj.max))
    .matches(phoneRegExp, 'Phone number is not valid')
    .required(),
  eventLimit: yup
    .number()
    .typeError('Event Limit field must a number')
    .max(9999, obj => `Event Limit cannot be greater than ${obj.max}`)
    .required()
})

const FormValidationSchema = (props: FormValidationSchemaProps) => {
  // ** States
  const [state, setState] = useState<State>({
    password: '',
    showPassword: false,
    confirmPassword: '',
    showConfirmPassword: false
  })

  // ** Props
  const { handleClickCloseModal } = props

  // ** Hook
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.agent)
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const handleClickShowPassword = () => {
    setState({ ...state, showPassword: !state.showPassword })
  }

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }
  const handleClickShowConfirmPassword = () => {
    setState({ ...state, showConfirmPassword: !state.showConfirmPassword })
  }

  const handleMouseDownConfirmPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const onSubmit = async (params: CreateAgentParams) => {
    dispatch(createAgent({ params, handleClickCloseModal }))
  }

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <Controller
                  name='firstName'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      inputProps={{
                        autoComplete: 'new-password'
                      }}
                      value={value}
                      label='First Name'
                      onChange={onChange}
                      placeholder='First Name'
                      error={Boolean(errors.firstName)}
                      aria-describedby='validation-schema-first-name'
                    />
                  )}
                />
                {errors.firstName && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-first-name'>
                    {errors.firstName.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <Controller
                  name='lastName'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='Last Name'
                      inputProps={{
                        autoComplete: 'new-password'
                      }}
                      onChange={onChange}
                      placeholder='Last Name'
                      error={Boolean(errors.lastName)}
                      aria-describedby='validation-schema-last-name'
                    />
                  )}
                />
                {errors.lastName && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-last-name'>
                    {errors.lastName.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <Controller
                  name='email'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      type='email'
                      inputProps={{
                        autoComplete: 'new-password'
                      }}
                      value={value}
                      label='Email'
                      onChange={onChange}
                      error={Boolean(errors.email)}
                      placeholder='carterleonard@gmail.com'
                      aria-describedby='validation-schema-phone'
                    />
                  )}
                />
                {errors.email && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-phone'>
                    {errors.email.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <Controller
                  name='phone'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      type='phone'
                      inputProps={{
                        autoComplete: 'new-password'
                      }}
                      value={value}
                      label='Phone'
                      onChange={onChange}
                      error={Boolean(errors.phone)}
                      placeholder='+65 0000 0000'
                      aria-describedby='validation-schema-email'
                    />
                  )}
                />
                {errors.phone && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-email'>
                    {errors.phone.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <Controller
                  name='eventLimit'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      type='number'
                      inputProps={{
                        autoComplete: 'new-password'
                      }}
                      value={value}
                      label='Event Limit'
                      onChange={onChange}
                      error={Boolean(errors.eventLimit)}
                      placeholder='0'
                      aria-describedby='validation-schema-eventLimit'
                    />
                  )}
                />
                {errors.eventLimit && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-eventLimit'>
                    {errors.eventLimit.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor='validation-schema-password' error={Boolean(errors.password)}>
                  Password
                </InputLabel>
                <Controller
                  name='password'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <OutlinedInput
                      value={value}
                      label='Password'
                      onChange={onChange}
                      id='validation-schema-password'
                      error={Boolean(errors.password)}
                      type={state.showPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            aria-label='toggle password visibility'
                          >
                            {state.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  )}
                />
                {errors.password && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-password'>
                    {errors.password.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor='user-view-security-confirm-password'>Confirm Password</InputLabel>
                <Controller
                  name='confirmPassword'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <OutlinedInput
                      label='Confirm Password'
                      value={value}
                      id='user-view-security-confirm-password'
                      error={Boolean(errors.confirmPassword)}
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
                            {state.showConfirmPassword ? <EyeOutline /> : <EyeOffOutline />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  )}
                />
                {errors.confirmPassword && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-password'>
                    {errors.confirmPassword.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button size='large' variant='text' style={{ minWidth: 120 }} onClick={handleClickCloseModal}>
                Cancel
              </Button>
              <Button size='large' type='submit' variant='contained' style={{ minWidth: 120 }}>
                {store.isCreating ? <CircularProgress size='1.6rem' color='inherit' /> : 'Create'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default FormValidationSchema
