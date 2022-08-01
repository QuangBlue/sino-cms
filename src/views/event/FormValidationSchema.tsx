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
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { useEffect } from 'react'
import { createEvent, fetchCompany } from 'src/store/event'
import { useAuth } from 'src/hooks/useAuth'

interface FormCreateEventSchemaProps {
  handleClickCloseModal: () => void
}

const defaultValues = {
  name: '',
  companyName: '',
  address: ''
}

const schema = yup.object().shape({
  name: yup.string().required('Event Name field is required'),
  address: yup.string().required('Address Event field is required'),
  companyName: yup.string().required('Company Name field is required')
})

const FormCreateEventSchema = (props: FormCreateEventSchemaProps) => {
  // ** Props
  const { handleClickCloseModal } = props

  // ** Hook
  const dispatch = useDispatch<AppDispatch>()

  const store = useSelector((state: RootState) => state.event)

  const auth = useAuth()

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

  const onSubmit = async (payload: { name: string; companyName: string; address: string }) => {
    const { name, companyName, address } = payload
    const baseName = convertToSlug(name)

    const params = {
      name,
      baseName,
      address
    }

    dispatch(createEvent({ params, handleClickCloseModal, companyName, agentId: auth.user?.id || 0 }))
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
                      aria-describedby='validation-schema-company-name'
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
                      label='Address Name'
                      onChange={onChange}
                      placeholder='Addresst Name'
                      error={Boolean(errors.address)}
                      aria-describedby='validation-schema-address-event'
                    />
                  )}
                />
                {errors.address && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-address-event'>
                    {errors.address.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id='company-select-label'>Choose Company</InputLabel>
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
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-company-name'>
                    {errors.companyName.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button size='large' variant='text' style={{ minWidth: 120 }} onClick={handleClickCloseModal}>
                Disagree
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
