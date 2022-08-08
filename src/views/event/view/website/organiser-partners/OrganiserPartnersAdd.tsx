import Box, { BoxProps } from '@mui/material/Box'
import Button, { ButtonProps } from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import Grid, { GridProps } from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Close from 'mdi-material-ui/Close'
import { ChangeEvent, ElementType, useState } from 'react'

// ** Third Party Imports

import { Controller } from 'react-hook-form'
import FormHelperText from '@mui/material/FormHelperText'
import { uploadAvarta } from 'src/store/event/view/website/speakerStore'
import { InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'

// import { AppDispatch } from 'src/store'
// import { useDispatch } from 'react-redux'

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

const SponsorAction = styled(Box)<BoxProps>(({ theme }) => ({
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

export const OrganiserPartnersAdd = ({ index, control, errors, remove }: any) => {
  // const dispatch = useDispatch<AppDispatch>()

  // ** Deletes form
  const deleteForm = async () => {
    remove(index)

    // if (id != 0) {
    //   await dispatch(deleteSpeaker(id))
    // }
  }

  const [value, setValue] = useState<string>('')

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string)
  }

  const handleChangeLogo = async (file: ChangeEvent, onChange: any) => {
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
              name={`createSponsors.${index}.avatar`}
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
                    {errors.createSponsors && errors.createSponsors[index]?.avatar && (
                      <FormHelperText sx={{ color: 'error.main', mb: 2 }}>
                        {errors.createSponsors[index].avatar.message}
                      </FormHelperText>
                    )}
                    <Box>
                      <ButtonStyled size='small' component='label' variant='contained'>
                        Upload Logo
                        <input
                          hidden
                          type='file'
                          onChange={e => handleChangeLogo(e, onChange)}
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
                name={`createSponsors.${index}.sponsorName`}
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    inputProps={{
                      autoComplete: 'new-password'
                    }}
                    value={value}
                    label='Sponsor Name'
                    onChange={onChange}
                    placeholder='Full Name'
                    error={Boolean(errors.name)}
                    aria-describedby='validation-schema-full-name'
                  />
                )}
              />
              {errors.createSponsors && errors.createSponsors[index]?.sponsorName && (
                <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-full-name'>
                  {errors.createSponsors[index].sponsorName.message}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth sx={{ mb: 4 }}>
              <InputLabel id='controlled-select-label'>Type</InputLabel>
              <Select
                value={value}
                label='Type'
                id='controlled-select'
                onChange={handleChange}
                labelId='controlled-select-label'
              >
                <MenuItem value='diamond'>Organised</MenuItem>
                <MenuItem value='gold'>Supported</MenuItem>
                <MenuItem value='silver'>Event Partner</MenuItem>
                <MenuItem value='bronze'>Media Partners</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 4 }}>
              <Controller
                name={`createSponsors.${index}.introduction`}
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    inputProps={{
                      autoComplete: 'new-password'
                    }}
                    value={value}
                    multiline
                    rows={8}
                    label='Introduction'
                    onChange={onChange}
                    placeholder='Introduction'
                    error={Boolean(errors.introduction)}
                    aria-describedby='validation-schema-introduction'
                  />
                )}
              />
              {errors.introduction && (
                <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-introduction'>
                  {errors.introduction.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>
        <SponsorAction>
          <IconButton size='small' onClick={deleteForm}>
            <Close fontSize='small' />
          </IconButton>
        </SponsorAction>
      </RepeatingContent>
    </Grid>
  )
}
