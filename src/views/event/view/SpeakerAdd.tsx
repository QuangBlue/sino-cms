import Box, { BoxProps } from '@mui/material/Box'
import Button, { ButtonProps } from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import Grid, { GridProps } from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Close from 'mdi-material-ui/Close'
import { ChangeEvent, ElementType, SyntheticEvent, useState } from 'react'
import { SpeakerTypes } from 'src/types/website'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import FormHelperText from '@mui/material/FormHelperText'

const ImgStyled = styled('img')(({ theme }) => ({
  width: '100%',
  marginBottom: theme.spacing(5),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)<ButtonProps & { component?: ElementType; htmlFor?: string }>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const InvoiceAction = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  padding: theme.spacing(2, 1),
  borderLeft: `1px solid ${theme.palette.divider}`
}))

const RepeatingContent = styled(Grid)<GridProps>(({ theme }) => ({
  paddingRight: 0,
  display: 'flex',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  '& .col-title': {
    top: '-1.5rem',
    position: 'absolute'
  },
  '& .MuiInputBase-input': {
    color: theme.palette.text.secondary
  },
  [theme.breakpoints.down('lg')]: {
    '& .col-title': {
      top: '0',
      position: 'relative'
    }
  }
}))

export const SpeakerAdd = ({ speaker, index }: { speaker?: SpeakerTypes; index?: number }) => {
  const [imgSrc, setImgSrc] = useState<string>('/images/avatars/1.png')

  // const [name, setName] = useState<string>('')
  // const [jobTitle, setJobTitle] = useState<string>('')
  // const [biography, setBiography] = useState<string>('')

  // useEffect(() => {
  //   if (speaker) {

  //     setName(speaker.languages.find(x => x.field == 'name')?.value || '')
  //     setJobTitle(speaker.languages.find(x => x.field == 'jobTitle')?.value || '')
  //     setBiography(speaker.languages.find(x => x.field == 'biography')?.value || '')
  //   }
  // }, [speaker])

  const defaultValues = {
    name: speaker ? speaker.languages.find(x => x.field == 'name')?.value : '',
    jobTitle: speaker ? speaker.languages.find(x => x.field == 'jobTitle')?.value : '',
    biography: speaker ? speaker.languages.find(x => x.field == 'biography')?.value : ''
  }

  const schema = yup.object().shape({
    name: yup.string().required('Full Name field is required'),
    jobTitle: yup.string().required('Job Title field is required'),
    biography: yup.string().required('Biography field is required')
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

  const onChange = (file: ChangeEvent) => {
    const reader = new FileReader()
    const { files } = file.target as HTMLInputElement
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result as string)

      reader.readAsDataURL(files[0])
    }
  }

  // const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
  //   setName(event.target.value)
  // }
  // const handleChangeJobTitle = (event: ChangeEvent<HTMLInputElement>) => {
  //   setJobTitle(event.target.value)
  // }
  // const handleChangeBiography = (event: ChangeEvent<HTMLInputElement>) => {
  //   setBiography(event.target.value)
  // }

  // ** Deletes form
  const deleteForm = (e: SyntheticEvent) => {
    e.preventDefault()

    // @ts-ignore
    e.target.closest('.repeater-wrapper').remove()
  }

  const onSubmit = async (params: any) => {
    console.log(params)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} id={`add-speaker-form-${index}`}>
      <Grid container>
        <RepeatingContent item xs={12}>
          <Grid
            container
            sx={{
              py: 4,
              width: '100%',
              pr: {
                lg: 0,
                xs: 4
              }
            }}
          >
            <Grid
              item
              lg={4}
              md={4}
              xs={12}
              sx={{
                px: 4,
                my: {
                  lg: 0,
                  xs: 4
                }
              }}
            >
              <Typography
                variant='subtitle2'
                className='col-title'
                sx={{
                  mb: {
                    md: 2,
                    xs: 0
                  },
                  color: 'text.primary'
                }}
              >
                Image
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'start',
                  flexDirection: 'column',
                  justifyContent: 'flex-start'
                }}
              >
                <ImgStyled src={imgSrc} alt='Profile Pic' />
                <Box>
                  <ButtonStyled
                    size='small'
                    component='label'
                    variant='contained'
                    htmlFor='account-settings-upload-image'
                  >
                    Upload Avarta
                    <input
                      hidden
                      type='file'
                      onChange={onChange}
                      accept='image/png, image/jpeg'
                      id='account-settings-upload-image'
                    />
                  </ButtonStyled>
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              lg={8}
              md={8}
              xs={12}
              sx={{
                px: 4,
                my: {
                  lg: 0,
                  xs: 4
                }
              }}
            >
              <Typography
                variant='subtitle2'
                className='col-title'
                sx={{
                  mb: {
                    md: 2,
                    xs: 0
                  },
                  color: 'text.primary'
                }}
              >
                Content
              </Typography>

              <FormControl fullWidth sx={{ mb: 4 }}>
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
                      label='Full Name'
                      onChange={onChange}
                      placeholder='Full Name'
                      error={Boolean(errors.name)}
                      aria-describedby='validation-schema-full-name'
                    />
                  )}
                />
                {errors.name && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-full-name'>
                    {errors.name.message}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='jobTitle'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      inputProps={{
                        autoComplete: 'new-password'
                      }}
                      value={value}
                      label='Job Title'
                      onChange={onChange}
                      placeholder='Job Title'
                      error={Boolean(errors.jobTitle)}
                      aria-describedby='validation-schema-first-name'
                    />
                  )}
                />
                {errors.jobTitle && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-first-name'>
                    {errors.jobTitle.message}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='biography'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      inputProps={{
                        autoComplete: 'new-password'
                      }}
                      value={value}
                      multiline
                      rows={6}
                      label='Biography'
                      onChange={onChange}
                      placeholder='Biography'
                      error={Boolean(errors.biography)}
                      aria-describedby='validation-schema-biography'
                    />
                  )}
                />
                {errors.biography && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-B=biography'>
                    {errors.biography.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>
          <InvoiceAction>
            <IconButton size='small' onClick={deleteForm}>
              <Close fontSize='small' />
            </IconButton>
          </InvoiceAction>
        </RepeatingContent>
      </Grid>
    </form>
  )
}
