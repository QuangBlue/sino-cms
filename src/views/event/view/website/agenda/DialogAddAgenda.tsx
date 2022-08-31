// ** React Imports
import { useEffect } from 'react'

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
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'

import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import slugify from 'slugify'
import AdapterDateFns from '@mui/lab/AdapterDateFns'

import { formatDate } from 'src/@core/utils/dateTime'

// ** Redux
import { addAgenda } from 'src/store/event/view/website/agendaStore'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'

interface DialogAddAgendaProps {
  handleDialogClose: () => void
  open: boolean
  isVideo?: boolean
  editParams: any
  handleEditAgenda: (params: any) => void
}

const DialogAddAgenda = ({
  handleDialogClose,
  open,
  editParams,
  handleEditAgenda
}: DialogAddAgendaProps) => {
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
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    if (editParams) {
      reset(editParams)
    }
  }, [editParams, reset])

  const onSubmit = async (payload: any) => {
    const slug = slugify(payload.name, { lower: true })

    if (editParams) {
      const params = { ...payload, slug, date: formatDate(payload.date) }
      handleEditAgenda(params)
      return
    }

    const result = await dispatch(
      addAgenda({
        eventId: Number(store.eventData.id),
        params: { ...payload, slug, date: formatDate(payload.date) }
      })
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
              {editParams ? 'Edit Agenda' : 'Add Agenda'}
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
                  <FormHelperText
                    sx={{ color: 'error.main' }}
                    id='validation-schema-company-name'
                  >
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
                  <FormHelperText
                    sx={{ color: 'error.main' }}
                    id='validation-schema-company-name'
                  >
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
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        value={value}
                        onChange={onChange}
                        renderInput={(params: any) => (
                          <TextField
                            {...params}
                            placeholder='Date'
                            error={Boolean(errors.date)}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  )}
                />
                {errors.date && (
                  <FormHelperText
                    sx={{ color: 'error.main' }}
                    id='validation-schema-company-name'
                  >
                    {errors.date.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions
          sx={{ pb: { xs: 8, sm: 12.5 }, justifyContent: 'center' }}
        >
          <Button
            variant='outlined'
            color='secondary'
            onClick={handleDialogClose}
          >
            Cancel
          </Button>
          <Button type='submit' variant='contained'>
            {editParams ? 'Save' : 'Create'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default DialogAddAgenda
