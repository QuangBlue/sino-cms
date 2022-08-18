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

interface DialogAddAlbumProps {
  handleDialogClose: () => void
  open: boolean
  handleAddSponsorGroup: (name: string) => void
  editParams: any
  handleEditSponsorGroup?: (params: any) => void
}

const schema = yup.object().shape({
  name: yup.string().required('Sponsor group name is required')
})

const DialogAddSponsorshipGroup = (props: DialogAddAlbumProps) => {
  const { handleDialogClose, open, handleAddSponsorGroup, editParams, handleEditSponsorGroup } = props

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: { name: '' },
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    if (editParams) {
      reset({ name: editParams.name })
    } else {
      reset({ name: '' })
    }
  }, [open, editParams, reset])

  const onSubmit = async (params: any) => {
    editParams
      ? handleEditSponsorGroup && handleEditSponsorGroup({ groupId: editParams.groupId, params })
      : handleAddSponsorGroup(params)
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
              Add Sponsorship Group
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
                      label='Sponsorship Group Name'
                      inputProps={{
                        autoComplete: 'new-password'
                      }}
                      onChange={onChange}
                      placeholder='Sponsorship Group Name'
                      error={Boolean(errors.name)}
                      aria-describedby='validation-schema-last-name'
                    />
                  )}
                />
                {errors.name && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-last-name'>
                    {errors.name.message}
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
          <Button variant='contained' sx={{ mr: 2 }} type='submit'>
            {editParams ? 'Save' : 'Create'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default DialogAddSponsorshipGroup
