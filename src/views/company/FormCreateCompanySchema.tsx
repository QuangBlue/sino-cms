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
import { createCompany } from 'src/store/company'
import { CreateCompanyParams } from 'src/types/companyTypes'
import { convertToSlug } from 'src/@core/utils/convert-to-slug'

interface FormValidationSchemaProps {
  handleClickCloseModal: () => void
}

const defaultValues = {
  name: '',
  contactPerson: '',
  email: '',
  phone: ''
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
  name: yup.string().required('Company Name field is required'),
  contactPerson: yup.string().required('Contact Person field is required'),
  email: yup.string().email().required('Email field is required'),
  phone: yup
    .string()
    .min(8, obj => showErrors('Phone', obj.value.length, obj.min))
    .max(15, obj => showErrors('Phone', obj.value.length, obj.max))
    .matches(phoneRegExp, 'Phone number is not valid')
    .required()
})

const FormValidationSchema = (props: FormValidationSchemaProps) => {
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

  const onSubmit = async (payload: any) => {
    const { name, phone, email, contractPerson } = payload
    const baseName = convertToSlug(name)

    const params: CreateCompanyParams = {
      name,
      baseName,
      phone,
      email,
      contractPerson
    }

    dispatch(createCompany({ params, handleClickCloseModal }))
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
                      label='Company Name'
                      onChange={onChange}
                      placeholder='Company Name'
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
                  name='email'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      inputProps={{
                        autoComplete: 'new-password'
                      }}
                      value={value}
                      label='Company Email'
                      onChange={onChange}
                      placeholder='Company Email'
                      error={Boolean(errors.email)}
                      aria-describedby='validation-schema-company-email'
                    />
                  )}
                />
                {errors.email && (
                  <FormHelperText
                    sx={{ color: 'error.main' }}
                    id='validation-schema-company-email'
                  >
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
                  <FormHelperText
                    sx={{ color: 'error.main' }}
                    id='validation-schema-email'
                  >
                    {errors.phone.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <Controller
                  name='contactPerson'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      inputProps={{
                        autoComplete: 'new-password'
                      }}
                      value={value}
                      label='Contact Person'
                      onChange={onChange}
                      placeholder='Contact Person'
                      error={Boolean(errors.contactPerson)}
                      aria-describedby='validation-schema-company-contactPerson'
                    />
                  )}
                />
                {errors.contactPerson && (
                  <FormHelperText
                    sx={{ color: 'error.main' }}
                    id='validation-schema-company-contactPerson'
                  >
                    {errors.contactPerson.message}
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
  )
}

export default FormValidationSchema
