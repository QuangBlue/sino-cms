// ** React Imports
import { useState, ElementType, ChangeEvent, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button, { ButtonProps } from '@mui/material/Button'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import FormHelperText from '@mui/material/FormHelperText'
import { EventMapTypes, EventTypes } from 'src/types/eventTypes'
import { AppDispatch } from 'src/store'
import { useDispatch } from 'react-redux'
import { deleteEvent, editEventDetail, resumeEvent, uploadEventMap, uploadLogo } from 'src/store/event/view'
import DialogAlertDeleteEvent from 'src/views/company/view/DialogAlertDeleteEvent'
import { formatDate } from 'src/@core/utils/format'

interface TabInformationProps {
  eventData: EventTypes
  eventMap: EventMapTypes | undefined
}

const ImgStyled = styled('img')(({ theme }) => ({
  width: 300,
  height: 300,
  objectFit: 'contain',
  marginBottom: theme.spacing(5),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)<ButtonProps & { component?: ElementType; htmlFor?: string }>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const schema = yup.object().shape({
  name: yup.string().required('Event Name field is required'),
  address: yup.string().required('Address field is required'),
  host: yup.object().shape({
    email: yup.string().email().required('Email field is required')
  })
})

const TabInformation = (data: TabInformationProps) => {
  const { eventData, eventMap } = data

  // ** Redux
  const dispatch = useDispatch<AppDispatch>()

  // ** State
  const [mapImg, setMapImg] = useState<string>('/images/misc/upload.png')

  const [logoImg, setLogoImg] = useState<string>('/images/misc/upload.png')
  const [open, setOpen] = useState<boolean>(false)
  const handleClickOpenAlert = () => setOpen(true)
  const handleCloseAlert = () => setOpen(false)

  useEffect(() => {
    if (eventMap) {
      setMapImg(eventMap.imgUrl)
      setLogoImg(eventData.logo)
    }
  }, [eventData.logo, eventMap])

  const defaultValues = {
    name: eventData.name,
    baseName: eventData.baseName,
    status: eventData.status,
    address: eventData.address,
    companyName: eventData.company.name,
    createdAt: eventData.createdAt,
    host: {
      email: eventData.host?.email
    }
  }

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const onChangeMap = (file: ChangeEvent) => {
    const readerMap = new FileReader()
    const { files } = file.target as HTMLInputElement
    if (files && files.length !== 0) {
      readerMap.onload = () => setMapImg(readerMap.result as string)

      readerMap.readAsDataURL(files[0])

      dispatch(uploadEventMap(files[0]))
    }
  }

  const onChangeLogo = (file: ChangeEvent) => {
    const readerLogo = new FileReader()
    const { files } = file.target as HTMLInputElement
    if (files && files.length !== 0) {
      readerLogo.onload = () => setLogoImg(readerLogo.result as string)

      readerLogo.readAsDataURL(files[0])

      dispatch(uploadLogo(files[0]))
    }
  }

  const onSubmit = async (payload: any) => {
    dispatch(editEventDetail({ payload }))
  }

  const handleDeleteEvent = () => {
    dispatch(deleteEvent(eventData.id)).then(() => {
      handleCloseAlert()
    })
  }
  const handleResumeEvent = () => {
    dispatch(resumeEvent(eventData.id)).then(() => {
      handleCloseAlert()
    })
  }

  return (
    <CardContent>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6} sx={{ my: 5 }}>
            <Typography variant='h6' sx={{ mb: 5 }}>
              Event Logo
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
              <ImgStyled src={logoImg} alt='Profile Pic' />

              <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-logo'>
                Upload Logo
                <input
                  hidden
                  type='file'
                  onChange={onChangeLogo}
                  accept='image/png, image/jpeg'
                  id='account-settings-upload-logo'
                />
              </ButtonStyled>

              <Typography sx={{ mt: 4 }} component='p' variant='caption'>
                Allowed PNG or JPEG. Max size of 800K.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ my: 5 }}>
            <Typography variant='h6' sx={{ mb: 5 }}>
              Event Map
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
              <ImgStyled src={mapImg} alt='Profile Pic' />

              <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-map'>
                Upload Event Map
                <input
                  hidden
                  type='file'
                  onChange={onChangeMap}
                  accept='image/png, image/jpeg'
                  id='account-settings-upload-map'
                />
              </ButtonStyled>

              <Typography sx={{ mt: 4 }} component='p' variant='caption'>
                Files must be PNG or JPEG. Max size of 800K.
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
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
                    aria-describedby='validation-schema-event-name'
                  />
                )}
              />
              {errors.name && (
                <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-event-name'>
                  {errors.name.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Controller
                name='baseName'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    disabled
                    inputProps={{
                      autoComplete: 'new-password'
                    }}
                    value={value}
                    label='Slug'
                    onChange={onChange}
                    placeholder='Slug'
                    error={Boolean(errors.baseName)}
                    aria-describedby='validation-schema-slug-event'
                  />
                )}
              />
              {errors.baseName && (
                <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-slug-event'>
                  {errors.baseName.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
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
                    placeholder='Slug'
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
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Controller
                name='companyName'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    disabled
                    inputProps={{
                      autoComplete: 'new-password'
                    }}
                    value={value}
                    label='Company Event'
                    onChange={onChange}
                    placeholder='Slug'
                    error={Boolean(errors.companyName)}
                    aria-describedby='validation-schema-companyName-event'
                  />
                )}
              />
              {errors.companyName && (
                <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-companyName-event'>
                  {errors.companyName.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                disabled
                inputProps={{
                  autoComplete: 'new-password'
                }}
                value={eventData.status ? 'Active' : 'Inactive'}
                label='Status'
                placeholder='Slug'
                aria-describedby='validation-schema-status-event'
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Controller
                name='createdAt'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    disabled
                    inputProps={{
                      autoComplete: 'new-password'
                    }}
                    value={formatDate(value || '')}
                    label='Created On'
                    onChange={onChange}
                    placeholder='Created On'
                    error={Boolean(errors.createdAt)}
                    aria-describedby='validation-schema-createdAt-event'
                  />
                )}
              />
              {errors.createdAt && (
                <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-createdAt-event'>
                  {errors.createdAt.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Controller
                name='host.email'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    inputProps={{
                      autoComplete: 'new-password'
                    }}
                    disabled
                    value={value}
                    label='Host Email'
                    onChange={onChange}
                    placeholder='Host Email'
                    error={Boolean(errors.host?.email)}
                    aria-describedby='validation-schema-host-email-event'
                  />
                )}
              />
              {errors.host?.email && (
                <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-host-email-event'>
                  {errors.host?.email.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button type='submit' variant='contained' sx={{ mr: 4 }}>
              Save Changes
            </Button>
            <Button type='button' variant='outlined' color='error' onClick={handleClickOpenAlert}>
              {eventData.status ? 'Delete' : 'Resume'}
            </Button>
          </Grid>
        </Grid>
      </form>
      <DialogAlertDeleteEvent
        open={open}
        eventData={eventData}
        handleCloseAlert={handleCloseAlert}
        handleSubmit={() => (eventData.status ? handleDeleteEvent() : handleResumeEvent())}
      />
    </CardContent>
  )
}

export default TabInformation
