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
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'

// ** Icons Imports
import Button from '@mui/material/Button'

// ** Redux Inports
import { AppDispatch, RootState } from 'src/store'
import { useDispatch, useSelector } from 'react-redux'
import { convertToSlug } from 'src/@core/utils/convert-to-slug'
import { createEvent } from 'src/store/company/view'
import { MouseEvent, useState } from 'react'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import { Divider, Typography } from '@mui/material'

interface FormValidationSchemaProps {
  handleClickCloseModal: () => void
}

const defaultValues = {
  name: '',
  address: '',
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
  name: yup.string().required('Company Name field is required'),
  address: yup.string().required('Address field is required'),
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

const FormCreateEventSchema = (props: FormValidationSchemaProps) => {
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

  const onSubmit = async (data: { name: string; address: string; host: { email: string; password: string } }) => {
    const { name, address, host } = data
    const baseName = convertToSlug(name)

    const params = {
      payload: {
        name,
        baseName,
        address,
        host: {
          email: host.email,
          password: host.password
        }
      },
      handleClickCloseModal
    }

    dispatch(createEvent(params))
  }

  return (
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
                      aria-describedby='validation-schema-event-name'
                    />
                  )}
                />
                {errors.name && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-company-name'>
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
                      aria-describedby='validation-schema-event-address'
                    />
                  )}
                />
                {errors.address && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-event-address'>
                    {errors.address.message}
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
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-phone'>
                    {errors.host?.email.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor='validation-schema-password' error={Boolean(errors.host?.password)}>
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
                            {state.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  )}
                />
                {errors.host?.password && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-password'>
                    {errors.host?.password.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor='user-view-security-confirm-password'>Admin Confirm Password</InputLabel>
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
                            {state.showConfirmPassword ? <EyeOutline /> : <EyeOffOutline />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  )}
                />
                {errors.host?.confirmPassword && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-password'>
                    {errors.host?.confirmPassword.message}
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

export default FormCreateEventSchema
