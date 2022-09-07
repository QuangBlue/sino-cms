// ** React Imports
import { Fragment, useEffect } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { TextField, FormControl, FormHelperText } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { uploadVideoTitle } from 'src/@core/api/upload-api'
import toast from 'react-hot-toast'

export type EditVideoModalProps = {
  open: boolean
  handleClose: () => void
  editParams: any
  handleFetchVideos: () => void
}

const EditVideoModal = ({
  open,
  handleClose,
  editParams,
  handleFetchVideos
}: EditVideoModalProps) => {
  // ** State

  const schema = yup.object().shape({
    name: yup.string().required('Video title is required')
  })

  const initialValues = {
    name: ''
  }

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

  useEffect(() => {
    if (editParams) {
      reset({
        name: editParams?.name
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editParams])

  const onSubmit = async (payload: any) => {
    const params = {
      name: payload.name
    }
    const upload = await uploadVideoTitle(editParams?.id, params)

    if (upload) {
      toast.success('Update video title successfully!')
      handleFetchVideos()
      handleClose()
    } else {
      toast.error('Something went wrong!')
    }
  }

  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
        fullWidth
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle id='form-dialog-title'>Edit Video</DialogTitle>
          <DialogContent>
            {/* <DialogContentText sx={{ mb: 3 }}>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText> */}
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
                    label='Video Title'
                    onChange={onChange}
                    error={Boolean(errors.name)}
                    aria-describedby='validation-schema-company-name'
                    autoFocus
                    sx={{ mt: 2 }}
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
          </DialogContent>
          <DialogActions className='dialog-actions-dense'>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type='submit'>Save</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Fragment>
  )
}

export default EditVideoModal
