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
import { CreateEventPayload } from 'src/types/eventTypes'
import { createEvent } from 'src/store/company/view'

interface FormValidationSchemaProps {
  handleClickCloseModal: () => void
}

const defaultValues = {
  name: '',
  address: ''
}

const schema = yup.object().shape({
  name: yup.string().required('Company Name field is required'),
  address: yup.string().required('Address field is required')
})

const FormCreateEventSchema = (props: FormValidationSchemaProps) => {
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

  const onSubmit = async (data: { name: string; address: string }) => {
    const { name, address } = data
    const baseName = convertToSlug(name)

    const params: CreateEventPayload = {
      payload: {
        name,
        baseName,
        address,
        status: true
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
                      placeholder='Company Name'
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
                      label='Address'
                      onChange={onChange}
                      placeholder='Address Event'
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
