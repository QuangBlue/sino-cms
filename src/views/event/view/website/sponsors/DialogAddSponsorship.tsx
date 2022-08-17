import { useEffect } from 'react'
// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import TextField from '@mui/material/TextField'

import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { Close } from 'mdi-material-ui'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'

// ** Third Party Styles Imports
import { Box, Grid, IconButton, Typography } from '@mui/material'

import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { NumberInput } from 'src/layouts/components/input'

interface DialogAddAlbumProps {
  handleDialogClose: () => void
  open: boolean
  editParams: any
  handleAddSponsor: (params: any) => void
  handleEditSponsor: (params: any) => void
}

const initialValues = {
  name: '',
  price: '',
  slot: ''
}

const DialogAddSponsorship = (props: DialogAddAlbumProps) => {
  const {
    handleDialogClose,
    open,
    editParams,
    handleAddSponsor,
    handleEditSponsor
  } = props

  const schema = yup.object().shape({
    name: yup.string().required('Sponsorship name is required'),
    price: yup
      .number()
      .required('Price is required')
      .typeError('Price is required'),
    slot: yup
      .number()
      .required('Quality is required')
      .typeError('Quality is required')
  })

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: initialValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const onSubmit = async (params: any) => {
    editParams
      ? handleEditSponsor && handleEditSponsor(params)
      : handleAddSponsor(params)
  }
  useEffect(() => {
    if (editParams) {
      reset(editParams)
    } else {
      reset(initialValues)
    }
  }, [editParams, open, reset])

  return (
    <Dialog
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
              Add Sponsorship
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
                      value={value}
                      label='Sponsorship Title'
                      inputProps={{
                        autoComplete: 'new-password'
                      }}
                      onChange={onChange}
                      placeholder='Sponsorship Title'
                      error={Boolean(errors.name)}
                      aria-describedby='validation-schema-last-name'
                    />
                  )}
                />
                {errors.name && (
                  <FormHelperText
                    sx={{ color: 'error.main' }}
                    id='validation-schema-last-name'
                  >
                    {errors.name.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item sm={6} xs={12}>
              <FormControl fullWidth>
                <Controller
                  name='slot'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => {
                    const MAX_VAL = 2000

                    return (
                      <NumberInput
                        value={value}
                        name='slot'
                        label='Quality'
                        placeholder='Quality'
                        onChange={({ value }: { value: number }) =>
                          onChange(value)
                        }
                        error={Boolean(errors.slot)}
                        limit={MAX_VAL}
                      />
                    )
                  }}
                />
                {errors.slot && (
                  <FormHelperText
                    sx={{ color: 'error.main' }}
                    id='validation-schema-company-name'
                  >
                    {errors.slot.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item sm={6} xs={12}>
              <FormControl fullWidth>
                <Controller
                  name='price'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => {
                    const MAX_VAL = 99999

                    return (
                      <NumberInput
                        value={value}
                        name='price'
                        label='Price'
                        placeholder='Price'
                        onChange={({ value }: { value: number }) =>
                          onChange(value)
                        }
                        error={Boolean(errors.price)}
                        limit={MAX_VAL}
                        prefix='$'
                        thousandSeparator
                      />
                    )
                  }}
                />
                {errors.price && (
                  <FormHelperText
                    sx={{ color: 'error.main' }}
                    id='validation-schema-company-name'
                  >
                    {errors.price.message}
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
          <Button variant='contained' sx={{ mr: 2 }} type='submit'>
            Create
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default DialogAddSponsorship
