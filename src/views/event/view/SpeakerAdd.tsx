import Box, { BoxProps } from '@mui/material/Box'
import Button, { ButtonProps } from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import Grid, { GridProps } from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Close from 'mdi-material-ui/Close'
import { ChangeEvent, ElementType, SyntheticEvent, useEffect, useState } from 'react'
import { SpeakerTypes } from 'src/types/website'

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

export const SpeakerAdd = ({ speaker }: { speaker?: SpeakerTypes }) => {
  const [imgSrc, setImgSrc] = useState<string>('/images/avatars/1.png')

  const [name, setName] = useState<string>('')
  const [jobTitle, setJobTitle] = useState<string>('')
  const [biography, setBiography] = useState<string>('')

  useEffect(() => {
    if (speaker) {
      setName(speaker.languages.find(x => x.field == 'name')?.value || '')
      setJobTitle(speaker.languages.find(x => x.field == 'jobTitle')?.value || '')
      setBiography(speaker.languages.find(x => x.field == 'biography')?.value || '')
    }
  }, [speaker])

  const onChange = (file: ChangeEvent) => {
    const reader = new FileReader()
    const { files } = file.target as HTMLInputElement
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result as string)

      reader.readAsDataURL(files[0])
    }
  }

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }
  const handleChangeJobTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setJobTitle(event.target.value)
  }
  const handleChangeBiography = (event: ChangeEvent<HTMLInputElement>) => {
    setBiography(event.target.value)
  }

  // ** Deletes form
  const deleteForm = (e: SyntheticEvent) => {
    e.preventDefault()

    // @ts-ignore
    e.target.closest('.repeater-wrapper').remove()
  }

  return (
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

            <FormControl
              fullWidth
              sx={{
                mb: 4
              }}
            >
              <TextField
                value={name}
                label='Full Name'
                placeholder='Full Name'
                onChange={handleChangeName}
                id='controlled-text-field'
              />
            </FormControl>
            <FormControl
              fullWidth
              sx={{
                mb: 4
              }}
            >
              <TextField
                value={jobTitle}
                label='Job Title'
                placeholder='Job Title'
                onChange={handleChangeJobTitle}
                id='controlled-text-field'
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                rows={6}
                value={biography}
                onChange={handleChangeBiography}
                multiline
                label='Biography'
                placeholder='Biography'
                id='textarea-outlined-static'
              />
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
  )
}
