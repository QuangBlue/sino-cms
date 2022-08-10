// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CircularProgress from '@mui/material/CircularProgress'
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
import { createAgent } from 'src/store/agent'

interface FormValidationSchemaProps {
  handleClickCloseModal: () => void
}

const defaultValues = {
  email: '',
  hotelName: '',
  phone: '',
  googleMap: '',
  star: 0,
  price: ''
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
  hotelName: yup
    .string()
    .min(1, obj => showErrors('Last Name', obj.value.length, obj.min))
    .required(),
  googleMap: yup
    .string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      'Enter correct url!'
    )
    .required('Please enter google url'),
  phone: yup
    .string()
    .min(8, obj => showErrors('Phone', obj.value.length, obj.min))
    .max(15, obj => showErrors('Phone', obj.value.length, obj.max))
    .matches(phoneRegExp, 'Phone number is not valid')
    .required(),
  star: yup
    .number()
    .typeError('Star field must a number')
    .max(5, obj => `Star cannot be greater than ${obj.max}`)
    .required(),
  price: yup.number().typeError('Price field must a number').required('Price field is required')
})

const FormCreateHotelSchema = (props: FormValidationSchemaProps) => {
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

  const onSubmit = async (params: any) => {
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
                  name='hotelName'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      inputProps={{
                        autoComplete: 'new-password'
                      }}
                      value={value}
                      label='Hotel Name'
                      onChange={onChange}
                      placeholder='Hotel Name'
                      error={Boolean(errors.hotelName)}
                      aria-describedby='validation-schema-hotel-name'
                    />
                  )}
                />
                {errors.hotelName && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-hotel-name'>
                    {errors.hotelName.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <Controller
                  name='star'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='Star'
                      type='number'
                      inputProps={{
                        autoComplete: 'new-password',
                        min: 0,
                        max: 5
                      }}
                      onChange={onChange}
                      placeholder='Star'
                      error={Boolean(errors.star)}
                      aria-describedby='validation-schema-star'
                    />
                  )}
                />
                {errors.star && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-star'>
                    {errors.star.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <Controller
                  name='googleMap'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      inputProps={{
                        autoComplete: 'new-password'
                      }}
                      value={value}
                      label='Google Map'
                      onChange={onChange}
                      error={Boolean(errors.googleMap)}
                      placeholder='Link google map'
                      aria-describedby='validation-schema-google-map'
                    />
                  )}
                />
                {errors.googleMap && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-google-map'>
                    {errors.googleMap.message}
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
                      placeholder='hotel@brand.com'
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
                  name='price'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      type='number'
                      inputProps={{
                        autoComplete: 'new-password'
                      }}
                      value={value}
                      label='Price'
                      onChange={onChange}
                      error={Boolean(errors.price)}
                      placeholder='0'
                      aria-describedby='validation-schema-price'
                    />
                  )}
                />
                {errors.price && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-price'>
                    {errors.price.message}
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

export default FormCreateHotelSchema
