// ** React Imports
import { Fragment, MouseEvent, useState } from 'react'

// ** MUI Imports

import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'

import Alert from '@mui/material/Alert'

import Button from '@mui/material/Button'
import CardHeader from '@mui/material/CardHeader'
import AlertTitle from '@mui/material/AlertTitle'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'

import InputAdornment from '@mui/material/InputAdornment'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import FormHelperText from '@mui/material/FormHelperText'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'
import { editAgentDetail } from 'src/store/agent/view'
import { AgentTypes } from 'src/types/agentTypes'

interface State {
  newPassword: string
  showNewPassword: boolean
  confirmNewPassword: string
  showConfirmNewPassword: boolean
}

const UserViewSecurity = () => {
  // ** States
  const [values, setValues] = useState<State>({
    newPassword: '',
    showNewPassword: false,
    confirmNewPassword: '',
    showConfirmNewPassword: false
  })

  // ** Hook
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.agentDetail)

  // Handle Password
  const handleClickShowNewPassword = () => {
    setValues({ ...values, showNewPassword: !values.showNewPassword })
  }
  const handleMouseDownNewPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  // Handle Confirm Password
  const handleClickShowConfirmNewPassword = () => {
    setValues({ ...values, showConfirmNewPassword: !values.showConfirmNewPassword })
  }
  const handleMouseDownConfirmNewPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const schema = yup.object().shape({
    newPassword: yup
      .string()
      .required('Password is required')
      .min(6, 'Password length should be at least 6 characters')
      .max(16, 'Password cannot exceed more than 16 characters'),
    confirmNewPassword: yup
      .string()
      .required('Confirm Password is required')
      .min(6, 'Password length should be at least 6 characters')
      .max(16, 'Password cannot exceed more than 16 characters')
      .oneOf([yup.ref('newPassword')], 'Passwords do not match')
  })

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: { newPassword: '', confirmNewPassword: '' },
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: any) => {
    dispatch(
      editAgentDetail({
        params: { password: data.newPassword } as AgentTypes,
        id: store.agentData.id,
        isChangePassword: true
      })
    ).then(() => {
      reset({
        newPassword: '',
        confirmNewPassword: ''
      })
    })
  }

  return (
    <Fragment>
      <Card sx={{ mb: 6 }}>
        <CardHeader title='Change Password' titleTypographyProps={{ variant: 'h6' }} />
        <CardContent>
          <Alert icon={false} severity='warning' sx={{ mb: 4 }}>
            <AlertTitle sx={{ mb: theme => `${theme.spacing(1)} !important` }}>
              Ensure that these requirements are met
            </AlertTitle>
            Minimum 6 characters long and maximum 16 characters long.
          </Alert>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2.5}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size='small'>
                  <InputLabel htmlFor='user-view-security-new-password'>New Password</InputLabel>
                  <Controller
                    name='newPassword'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <OutlinedInput
                        label='New Password'
                        value={value}
                        id='user-view-security-new-password'
                        onChange={onChange}
                        error={Boolean(errors.newPassword)}
                        type={values.showNewPassword ? 'text' : 'password'}
                        endAdornment={
                          <InputAdornment position='end'>
                            <IconButton
                              edge='end'
                              onClick={handleClickShowNewPassword}
                              aria-label='toggle password visibility'
                              onMouseDown={handleMouseDownNewPassword}
                            >
                              {values.showNewPassword ? <EyeOutline /> : <EyeOffOutline />}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    )}
                  />
                  {errors.newPassword && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-password'>
                      {errors.newPassword.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size='small'>
                  <InputLabel htmlFor='user-view-security-confirm-new-password'>Confirm New Password</InputLabel>
                  <Controller
                    name='confirmNewPassword'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <OutlinedInput
                        label='Confirm New Password'
                        value={value}
                        id='user-view-security-confirm-new-password'
                        error={Boolean(errors.confirmNewPassword)}
                        type={values.showConfirmNewPassword ? 'text' : 'password'}
                        onChange={onChange}
                        endAdornment={
                          <InputAdornment position='end'>
                            <IconButton
                              edge='end'
                              aria-label='toggle password visibility'
                              onClick={handleClickShowConfirmNewPassword}
                              onMouseDown={handleMouseDownConfirmNewPassword}
                            >
                              {values.showConfirmNewPassword ? <EyeOutline /> : <EyeOffOutline />}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    )}
                  />
                  {errors.confirmNewPassword && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-password'>
                      {errors.confirmNewPassword.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sx={{ mt: 1.5 }}>
                <Button type='submit' variant='contained'>
                  Change Password
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Fragment>
  )
}

export default UserViewSecurity
