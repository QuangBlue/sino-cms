// ** React Imports

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import TextField from '@mui/material/TextField'

import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { Close } from 'mdi-material-ui'
import FormControl from '@mui/material/FormControl'

import FormHelperText from '@mui/material/FormHelperText'

// ** Third Party Styles Imports
import { Box, Grid, IconButton, Typography } from '@mui/material'
import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import CustomInput from './CustomInput'
import slugify from 'slugify'

import { formatDate } from 'src/@core/utils/dateTime'

// ** Redux
import { addAgenda } from 'src/store/event/view/website/agendaStore'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'

interface DialogAddAgendaProps {
  handleDialogClose: () => void
  open: boolean
  isVideo?: boolean
}

const DialogAddAgenda = (props: DialogAddAgendaProps) => {
  const { handleDialogClose, open } = props

  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.eventDetail)

  const defaultValues = {
    name: '',
    slug: '',
    description: '',
    date: null
  }
  const schema = yup.object().shape({
    name: yup.string().required('Title is required'),
    date: yup.date().required('Date is required').typeError('Date is required')
  })

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const onSubmit = async (payload: any) => {
    const slug = slugify(payload.name, { lower: true })

    const result = await dispatch(
      addAgenda({ eventName: store.eventData.baseName, params: { ...payload, slug, date: formatDate(payload.date) } })
    )
    if (result?.payload?.id) {
      reset()
      handleDialogClose()
    }
  }

  return (
    <Dialog
      sx={{ overflow: 'hidden' }}
      fullWidth
      open={open}
      scroll='body'
      onClose={handleDialogClose}
      onBackdropClick={handleDialogClose}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx={{ position: 'relative' }}>
          <IconButton
            size='small'
            onClick={handleDialogClose}
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
          >
            <Close />
          </IconButton>
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
              Add Agenda
            </Typography>
          </Box>
          <Grid container spacing={6}>
            <Grid item sm={12} xs={12}>
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
                      label='Title'
                      onChange={onChange}
                      placeholder='Title'
                      error={Boolean(errors.name)}
                      aria-describedby='validation-schema-agenda'
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
            <Grid item sm={12} xs={12}>
              <FormControl fullWidth>
                <Controller
                  name='description'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      inputProps={{
                        autoComplete: 'new-password'
                      }}
                      value={value}
                      fullWidth
                      label='Description'
                      placeholder='Description'
                      onChange={onChange}
                      error={Boolean(errors.description)}
                      aria-describedby='validation-schema-agenda'
                    />
                  )}
                />
                {errors.description && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-company-name'>
                    {errors.description.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item sm={12} xs={12}>
              <FormControl fullWidth>
                <Controller
                  name='date'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <DatePickerWrapper>
                      <DatePicker
                        selected={value}
                        onChange={onChange}
                        showYearDropdown
                        showMonthDropdown
                        id='account-settings-date'
                        placeholderText='MM-DD-YYYY'
                        customInput={<CustomInput fullWidth label='Date' error={Boolean(errors.date)} />}
                      />
                    </DatePickerWrapper>
                  )}
                />
                {errors.date && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-company-name'>
                    {errors.date.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ pb: { xs: 8, sm: 12.5 }, justifyContent: 'center' }}>
          <Button variant='outlined' color='secondary' onClick={handleDialogClose}>
            Cancel
          </Button>
          <Button type='submit' variant='contained'>
            Create
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default DialogAddAgenda
