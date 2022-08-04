import Box, { BoxProps } from '@mui/material/Box'
import Button, { ButtonProps } from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import Grid, { GridProps } from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Close from 'mdi-material-ui/Close'
import { ChangeEvent, ElementType } from 'react'

// ** Third Party Imports

import { Controller } from 'react-hook-form'
import FormHelperText from '@mui/material/FormHelperText'
import { deleteSpeaker, uploadAvarta } from 'src/store/event/view/website/speakerStore'

import { AppDispatch } from 'src/store'
import { useDispatch } from 'react-redux'

const ImgStyled = styled('img')(({ theme }) => ({
  width: '100%',
  maxWidth: '240px',
  marginBottom: theme.spacing(4),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)<ButtonProps & { component?: ElementType; htmlFor?: string }>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const SpeakerAction = styled(Box)<BoxProps>(({ theme }) => ({
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

export const SpeakerAdd = ({ index, control, errors, id, remove }: any) => {
  const dispatch = useDispatch<AppDispatch>()

  // ** Deletes form
  const deleteForm = async () => {
    remove(index)
    if (id != 0) {
      await dispatch(deleteSpeaker(id))
    }
  }

  const handleChange = async (file: ChangeEvent, onChange: any) => {
    const { files } = file.target as HTMLInputElement
    if (files && files.length !== 0) {
      const urlImg = await uploadAvarta(files[0])
      if (urlImg) {
        onChange(urlImg.data)
      }
    }
  }

  return (
    <Grid container sx={{ mt: 12 }}>
      <RepeatingContent item xs={12}>
        <Grid container sx={{ py: 4, width: '100%', pr: { lg: 0, xs: 4 } }}>
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
            <Controller
              name={`createSpeaker.${index}.avatar`}
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => {
                return (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'column',
                      justifyContent: 'center'
                    }}
                  >
                    <ImgStyled
                      src={value}
                      alt='Profile Pic'
                      onError={e => {
                        e.currentTarget.src = '/images/avatars/1.png'
                      }}
                    />
                    {errors.createSpeaker && errors.createSpeaker[index]?.avatar && (
                      <FormHelperText sx={{ color: 'error.main', mb: 2 }}>
                        {errors.createSpeaker[index].avatar.message}
                      </FormHelperText>
                    )}
                    <Box>
                      <ButtonStyled size='small' component='label' variant='contained'>
                        Upload Avarta
                        <input
                          hidden
                          type='file'
                          onChange={e => handleChange(e, onChange)}
                          accept='image/png, image/jpeg'
                        />
                      </ButtonStyled>
                    </Box>
                  </Box>
                )
              }}
            />
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
                  xs: 4
                },
                color: 'text.primary'
              }}
            >
              Content
            </Typography>

            <FormControl fullWidth sx={{ mb: 4 }}>
              <Controller
                name={`createSpeaker.${index}.name`}
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
              {errors.createSpeaker && errors.createSpeaker[index]?.name && (
                <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-full-name'>
                  {errors.createSpeaker[index].name.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <Controller
                name={`createSpeaker.${index}.jobTitle`}
                control={control}
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
                    aria-describedby='validation-schema-jobTitle'
                  />
                )}
              />
              {errors.jobTitle && (
                <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-jobTitle'>
                  {errors.jobTitle.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <Controller
                name={`createSpeaker.${index}.biography`}
                control={control}
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
        <SpeakerAction>
          <IconButton size='small' onClick={deleteForm}>
            <Close fontSize='small' />
          </IconButton>
        </SpeakerAction>
      </RepeatingContent>
    </Grid>
  )
}
