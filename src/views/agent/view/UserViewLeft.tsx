// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import FormHelperText from '@mui/material/FormHelperText'
import LinearProgress from '@mui/material/LinearProgress'
import DialogContentText from '@mui/material/DialogContentText'

// ** Icons Imports
import Domain from 'mdi-material-ui/Domain'
import StarOutline from 'mdi-material-ui/StarOutline'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import DialogAlertDelete from '../DialogAlertDeleteAgent'

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'
import { AgentTypes } from 'src/types/agentTypes'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'

// ** Redux
import { editAgentDetail, fetchAgentDetail } from 'src/store/agent/view'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'src/store'
import { deleteAgent } from 'src/store/agent'
import { useRouter } from 'next/router'

interface Props {
  data: AgentTypes
}

interface ColorsType {
  [key: string]: ThemeColor
}

const roleColors: ColorsType = {
  admin: 'error',
  agent: 'warning'
}

const statusColors: ColorsType = {
  true: 'success',
  false: 'secondary'
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

const UserViewLeft = ({ data }: Props) => {
  // ** States
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const handleClickOpenAlert = () => setOpen(true)
  const handleCloseAlert = () => setOpen(false)

  // ** Hook
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const defaultValues = {
    lastName: data.lastName,
    firstName: data.firstName,
    phone: data.phone,
    eventLimit: data.eventLimit
  }

  const schema = yup.object().shape({
    lastName: yup
      .string()
      .min(1, obj => showErrors('Last Name', obj.value.length, obj.min))
      .required(),
    firstName: yup
      .string()
      .min(1, obj => showErrors('First Name', obj.value.length, obj.min))
      .required(),
    phone: yup
      .string()
      .typeError('Phone field is required')
      .min(8, obj => showErrors('Phone', obj.value.length, obj.min))
      .max(15, obj => showErrors('Phone', obj.value.length, obj.max))
      .matches(phoneRegExp, 'Phone number is not valid')
      .required(),
    eventLimit: yup
      .number()
      .typeError('Event Limit field must a number')
      .min(data.totalEvent, obj => `Event Limit cannot be less than ${obj.min}`)
      .max(9999, obj => `Event Limit cannot be greater than ${obj.max}`)
      .required('Event Limit field is required')
  })

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  // Handle Edit dialog
  const handleEditClickOpen = () => setOpenEdit(true)
  const handleEditClose = () => setOpenEdit(false)
  const onSubmit = (params: any) => {
    dispatch(
      editAgentDetail({
        params,
        id: data.id
      })
    ).then(() => {
      handleEditClose()
    })
  }

  // Handle Detele Agent
  const handleSubmitDeleteAgent = () => {
    dispatch(deleteAgent(data.id)).then(() => {
      router.replace('/agent')
    })
  }

  const handleSubmitResumeAgent = () => {
    dispatch(editAgentDetail({ params: { status: true }, id: data.id })).then(
      () => {
        dispatch(fetchAgentDetail(data.id))
      }
    )
  }

  const renderUserAvatar = () => {
    if (data) {
      return (
        <CustomAvatar
          skin='light'
          variant='rounded'
          color={data.role === 'admin' ? 'primary' : 'error'}
          sx={{
            width: 120,
            height: 120,
            fontWeight: 600,
            mb: 4,
            fontSize: '3rem'
          }}
        >
          {getInitials(data.firstName + ' ' + data.lastName)}
        </CustomAvatar>
      )
    } else {
      return null
    }
  }

  if (data) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardContent
              sx={{
                pt: 15,
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column'
              }}
            >
              {renderUserAvatar()}
              <Typography variant='h6' sx={{ mb: 4 }}>
                {data.firstName + ' ' + data.lastName}
              </Typography>
              <CustomChip
                skin='light'
                size='small'
                label={data.role}
                color={roleColors[data.role]}
                sx={{
                  borderRadius: '4px',
                  fontSize: '0.875rem',
                  textTransform: 'capitalize',
                  '& .MuiChip-label': { mt: -0.25 }
                }}
              />
            </CardContent>

            <CardContent sx={{ my: 1 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Box sx={{ mr: 6, display: 'flex', alignItems: 'center' }}>
                  <CustomAvatar
                    skin='light'
                    variant='rounded'
                    sx={{ mr: 4, width: 44, height: 44 }}
                  >
                    <Domain />
                  </CustomAvatar>
                  <Box>
                    <Typography variant='h5' sx={{ lineHeight: 1.3 }}>
                      {data.totalCompany}
                    </Typography>
                    <Typography variant='body2'>Company</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CustomAvatar
                    skin='light'
                    variant='rounded'
                    sx={{ mr: 4, width: 44, height: 44 }}
                  >
                    <StarOutline />
                  </CustomAvatar>
                  <Box>
                    <Typography variant='h5' sx={{ lineHeight: 1.3 }}>
                      {data.totalEvent}
                    </Typography>
                    <Typography variant='body2'>Event</Typography>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  mb: 1.5,
                  mt: 6,
                  justifyContent: 'space-between'
                }}
              >
                <Typography
                  variant='body2'
                  sx={{ fontWeight: 600, color: 'text.secondary' }}
                >
                  Events
                </Typography>
                <Typography
                  variant='body2'
                  sx={{ fontWeight: 600, color: 'text.secondary' }}
                >
                  {`${data.totalEvent} of ${data.eventLimit} Events`}
                </Typography>
              </Box>
              <LinearProgress
                value={(data.totalEvent / data.eventLimit) * 100}
                variant='determinate'
                sx={{ height: 8, borderRadius: '5px' }}
              />
            </CardContent>

            <CardContent>
              <Typography variant='h6'>Details</Typography>
              <Divider sx={{ mt: 4 }} />
              <Box sx={{ pt: 2, pb: 1 }}>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography
                    variant='subtitle2'
                    sx={{ mr: 2, color: 'text.primary' }}
                  >
                    Username:
                  </Typography>
                  <Typography variant='body2'>
                    @
                    {(data.firstName + ' ' + data.lastName)
                      .toLowerCase()
                      .replace(/\s/g, '')}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography
                    variant='subtitle2'
                    sx={{ mr: 2, color: 'text.primary' }}
                  >
                    Email:
                  </Typography>
                  <Typography variant='body2'>{data.email}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography
                    variant='subtitle2'
                    sx={{ mr: 2, color: 'text.primary' }}
                  >
                    ID:
                  </Typography>
                  <Typography variant='body2'>{data.id}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography
                    variant='subtitle2'
                    sx={{ mr: 2, color: 'text.primary' }}
                  >
                    Status:
                  </Typography>
                  <CustomChip
                    skin='light'
                    size='small'
                    label={data.status ? 'Active' : 'Inactive'}
                    color={statusColors[data.status ? 'true' : 'false']}
                    sx={{
                      height: 20,
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      borderRadius: '5px',
                      textTransform: 'capitalize'
                    }}
                  />
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography
                    sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}
                  >
                    Role:
                  </Typography>
                  <Typography
                    variant='body2'
                    sx={{ textTransform: 'capitalize' }}
                  >
                    {data.role}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography
                    sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}
                  >
                    Phone:
                  </Typography>
                  <Typography variant='body2'>{data.phone}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography
                    sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}
                  >
                    Language:
                  </Typography>
                  <Typography variant='body2'>English</Typography>
                </Box>
              </Box>
            </CardContent>

            <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                variant='contained'
                sx={{ mr: 2 }}
                onClick={handleEditClickOpen}
              >
                Edit
              </Button>
              {!(data.role === 'admin') && (
                <Button
                  color='error'
                  variant='outlined'
                  onClick={handleClickOpenAlert}
                >
                  {data.status ? 'Suspend' : 'Resume'}
                </Button>
              )}
            </CardActions>

            <Dialog
              open={openEdit}
              onClose={handleEditClose}
              aria-labelledby='user-view-edit'
              sx={{
                '& .MuiPaper-root': { width: '100%', maxWidth: 650, p: [2, 10] }
              }}
              aria-describedby='user-view-edit-description'
            >
              <DialogTitle
                id='user-view-edit'
                sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}
              >
                Edit Agent Information
              </DialogTitle>
              <DialogContent>
                <DialogContentText
                  variant='body2'
                  id='user-view-edit-description'
                  sx={{ textAlign: 'center', mb: 7 }}
                >
                  Updating agent details will receive a privacy audit.
                </DialogContentText>
                <form id='edit-agent-form' onSubmit={handleSubmit(onSubmit)}>
                  <Grid container spacing={6}>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <Controller
                          name='firstName'
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { value, onChange } }) => (
                            <TextField
                              inputProps={{
                                autoComplete: 'new-password'
                              }}
                              value={value}
                              label='First Name'
                              onChange={onChange}
                              placeholder='First Name'
                              error={Boolean(errors.firstName)}
                              aria-describedby='validation-schema-first-name'
                            />
                          )}
                        />
                        {errors.firstName && (
                          <FormHelperText
                            sx={{ color: 'error.main' }}
                            id='validation-schema-first-name'
                          >
                            {errors.firstName.message}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <Controller
                          name='lastName'
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { value, onChange } }) => (
                            <TextField
                              value={value}
                              label='Last Name'
                              inputProps={{
                                autoComplete: 'new-password'
                              }}
                              onChange={onChange}
                              placeholder='Carter'
                              error={Boolean(errors.lastName)}
                              aria-describedby='validation-schema-last-name'
                            />
                          )}
                        />
                        {errors.lastName && (
                          <FormHelperText
                            sx={{ color: 'error.main' }}
                            id='validation-schema-last-name'
                          >
                            {errors.lastName.message}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <Controller
                          name='eventLimit'
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { value, onChange } }) => (
                            <TextField
                              type='number'
                              inputProps={{
                                autoComplete: 'new-password'
                              }}
                              value={value}
                              label='Event Limit'
                              onChange={onChange}
                              error={Boolean(errors.eventLimit)}
                              placeholder='0'
                              aria-describedby='validation-schema-eventLimit'
                            />
                          )}
                        />
                        {errors.eventLimit && (
                          <FormHelperText
                            sx={{ color: 'error.main' }}
                            id='validation-schema-eventLimit'
                          >
                            {errors.eventLimit.message}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
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
                  </Grid>
                </form>
              </DialogContent>
              <DialogActions sx={{ justifyContent: 'center' }}>
                <Button
                  variant='contained'
                  sx={{ mr: 1 }}
                  type='submit'
                  form='edit-agent-form'
                >
                  Submit
                </Button>
                <Button
                  variant='outlined'
                  color='secondary'
                  onClick={handleEditClose}
                >
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
          </Card>
        </Grid>
        <DialogAlertDelete
          open={open}
          dataAgent={data}
          handleCloseAlert={handleCloseAlert}
          handleSubmit={
            data.status ? handleSubmitDeleteAgent : handleSubmitResumeAgent
          }
        />
      </Grid>
    )
  } else {
    return null
  }
}

export default UserViewLeft
