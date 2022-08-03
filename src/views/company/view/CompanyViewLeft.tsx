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

// ** Icons Imports
import StarOutline from 'mdi-material-ui/StarOutline'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import DialogContentText from '@mui/material/DialogContentText'
import DialogAlertDeleteCompany from '../DialogAlertDeleteCompany'

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { Controller, useForm } from 'react-hook-form'

// ** Redux
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'src/store'
import { useRouter } from 'next/router'
import { CompanyTypes } from 'src/types/companyTypes'
import { deleteCompany } from 'src/store/company'
import { editCompanyDetail, fetchCompanyDetail } from 'src/store/company/view'

interface Props {
  data: CompanyTypes
}

interface ColorsType {
  [key: string]: ThemeColor
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

const CompanyViewLeft = ({ data }: Props) => {
  // ** States
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const handleClickOpenAlert = () => setOpen(true)
  const handleCloseAlert = () => setOpen(false)

  // ** Hook
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()

  const defaultValues = {
    name: data.name,
    email: data.email,
    phone: data.phone,
    website: data.website
  }

  const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email(),
    phone: yup
      .string()
      .typeError('Phone field is required')
      .min(8, obj => showErrors('Phone', obj.value.length, obj.min))
      .max(15, obj => showErrors('Phone', obj.value.length, obj.max))
      .matches(phoneRegExp, 'Phone number is not valid'),
    website: yup.string()
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
      editCompanyDetail({
        params,
        id: data.id
      })
    ).then(() => {
      handleEditClose()
    })
  }

  // Handle Detele Company
  const handleSubmitDeleteCompany = () => {
    dispatch(deleteCompany(data.id)).then(() => {
      router.replace('/company')
    })
  }

  const handleSubmitResumeCompany = () => {
    dispatch(editCompanyDetail({ params: { status: true }, id: data.id })).then(() => {
      dispatch(fetchCompanyDetail(data.id))
    })
  }

  const renderCompanyAvatar = () => {
    if (data.name) {
      return (
        <CustomAvatar
          skin='light'
          variant='rounded'
          color={'primary'}
          sx={{ width: 120, height: 120, fontWeight: 600, mb: 4, fontSize: '3rem' }}
        >
          {getInitials(data.name)}
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
            <CardContent sx={{ pt: 15, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              {renderCompanyAvatar()}
              <Typography variant='h6' sx={{ mb: 4 }}>
                {data.name}
              </Typography>
            </CardContent>

            <CardContent sx={{ my: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CustomAvatar skin='light' variant='rounded' sx={{ mr: 4, width: 44, height: 44 }}>
                    <StarOutline />
                  </CustomAvatar>
                  <Box>
                    <Typography variant='h5' sx={{ lineHeight: 1.3 }}>
                      {data.events && data.events.length}
                    </Typography>
                    <Typography variant='body2'>Event</Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>

            <CardContent>
              <Typography variant='h6'>Details</Typography>
              <Divider sx={{ mt: 4 }} />
              <Box sx={{ pt: 2, pb: 1 }}>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Slug:
                  </Typography>
                  <Typography variant='body2'>@{data.baseName}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    ID Event:
                  </Typography>
                  <Typography variant='body2'>{data.id || ''}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Email:
                  </Typography>
                  <Typography variant='body2'>{data.email || ''}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Website:
                  </Typography>
                  <Typography variant='body2'>{data.website || ''}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
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
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Manager:</Typography>
                  <Typography variant='body2' sx={{ textTransform: 'capitalize' }}>
                    {data.agent && data.agent.firstName + ' ' + data.agent.lastName}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Phone:</Typography>
                  <Typography variant='body2'>{data.phone}</Typography>
                </Box>
              </Box>
            </CardContent>

            <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant='contained' sx={{ mr: 2 }} onClick={handleEditClickOpen}>
                Edit
              </Button>
              <Button color='error' variant='outlined' onClick={handleClickOpenAlert}>
                {data.status ? 'Suspend' : 'Resume'}
              </Button>
            </CardActions>

            <Dialog
              open={openEdit}
              onClose={handleEditClose}
              aria-labelledby='user-view-edit'
              sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650, p: [2, 10] } }}
              aria-describedby='user-view-edit-description'
            >
              <DialogTitle id='user-view-edit' sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>
                Edit Company Information
              </DialogTitle>
              <DialogContent>
                <DialogContentText variant='body2' id='user-view-edit-description' sx={{ textAlign: 'center', mb: 7 }}>
                  Updating company details will receive a privacy audit.
                </DialogContentText>
                <form id='edit-company-form' onSubmit={handleSubmit(onSubmit)}>
                  <Grid container spacing={6}>
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
                              label='Company Name'
                              onChange={onChange}
                              placeholder='Company Name'
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
                          name='phone'
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { value, onChange } }) => (
                            <TextField
                              value={value}
                              type='phone'
                              label='Phone'
                              inputProps={{
                                autoComplete: 'new-password'
                              }}
                              onChange={onChange}
                              placeholder='+65 0000 0000'
                              error={Boolean(errors.phone)}
                              aria-describedby='validation-schema-phone'
                            />
                          )}
                        />
                        {errors.phone && (
                          <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-phone'>
                            {errors.phone.message}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <Controller
                          name='website'
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { value, onChange } }) => (
                            <TextField
                              inputProps={{
                                autoComplete: 'new-password'
                              }}
                              value={value}
                              label='Website'
                              onChange={onChange}
                              error={Boolean(errors.website)}
                              placeholder='www.example.com'
                              aria-describedby='validation-schema-website'
                            />
                          )}
                        />
                        {errors.website && (
                          <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-website'>
                            {errors.website.message}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                  </Grid>
                </form>
              </DialogContent>
              <DialogActions sx={{ justifyContent: 'center' }}>
                <Button variant='contained' sx={{ mr: 1 }} type='submit' form='edit-company-form'>
                  Submit
                </Button>
                <Button variant='outlined' color='secondary' onClick={handleEditClose}>
                  Discard
                </Button>
              </DialogActions>
            </Dialog>
          </Card>
        </Grid>
        <DialogAlertDeleteCompany
          open={open}
          dataCompany={data}
          handleCloseAlert={handleCloseAlert}
          handleSubmit={data.status ? handleSubmitDeleteCompany : handleSubmitResumeCompany}
        />
      </Grid>
    )
  } else {
    return null
  }
}

export default CompanyViewLeft
