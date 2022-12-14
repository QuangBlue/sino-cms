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
import LoadingButton from '@mui/lab/LoadingButton'

// ** Third Party Styles Imports
import { Box, Grid, IconButton, Typography } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'

import { NumberInput } from 'src/layouts/components/input'

interface DialogAddAlbumProps {
  handleDialogClose: () => void
  open: boolean
  isVideo?: boolean
  handleAddAlbum: (params: any) => void
  handleEditAlbum?: (params: any) => void
  editParams?: any
  isLoading: boolean
}

const DialogAddAlbumForm = (props: DialogAddAlbumProps) => {
  const { handleDialogClose, open, handleAddAlbum, editParams, handleEditAlbum, isLoading } = props

  // ** State
  const schema = yup.object().shape({
    name: yup.string().required('Album name is required'),
    year: yup.number().required('Year is required').typeError('Year is required')
  })

  const initialValues = {
    name: '',
    year: ''
  }

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: initialValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    if (editParams) {
      reset(editParams)
    } else {
      reset(initialValues)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const onSubmit = async (payload: any) => {
    editParams ? handleEditAlbum && handleEditAlbum(payload) : handleAddAlbum(payload)
  }

  return (
    <Dialog fullWidth open={open} scroll='body' onClose={handleDialogClose} onBackdropClick={handleDialogClose}>
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
              {editParams ? 'Edit Album' : 'Add New Album'}
            </Typography>
          </Box>
          <Grid container spacing={6}>
            <Grid item sm={8} xs={12}>
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
                      label='Album Title'
                      placeholder='Album Title'
                      onChange={onChange}
                      error={Boolean(errors.name)}
                      aria-describedby='validation-schema-company-name'
                      autoFocus
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
            <Grid item sm={4} xs={12}>
              <FormControl fullWidth>
                <Controller
                  name='year'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => {
                    const MAX_VAL = new Date().getFullYear()

                    return (
                      <NumberInput
                        value={value}
                        name='year'
                        label='Year of Album'
                        placeholder='Year of Album'
                        onChange={({ value }: { value: number }) => onChange(value)}
                        error={Boolean(errors.year)}
                        limit={MAX_VAL}
                      />
                    )
                  }}
                />
                {errors.year && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-company-name'>
                    {errors.year.message}
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

          <LoadingButton loading={isLoading} variant='contained' type='submit' autoFocus>
            {editParams ? 'Save' : 'Create'}
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default DialogAddAlbumForm
