// ** React Imports
import { useEffect } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

// ** Icon Imports
import Plus from 'mdi-material-ui/Plus'

// ** Custom Component Imports
import { SponsorsAdd } from './SponsorsAdd'
import Button from '@mui/material/Button'

// import { AppDispatch, RootState } from 'src/store'
// import { useDispatch, useSelector } from 'react-redux'

import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { useForm, useFieldArray } from 'react-hook-form'

import { array, object, string } from 'yup'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

const Sponsors = () => {
  // const dispatch = useDispatch<AppDispatch>()
  // const store = useSelector((state: RootState) => state.speakerWebsite)

  // const defaultValues = {
  //   createSpeaker: store.listSpeaker
  // }

  const validationSchema = object().shape({
    createSponsors: array()
      .of(
        object().shape({
          avatar: string().required('Avarta field is required'),
          sponsorName: string().required('Sponsor Name field is required')
        })
      )
      .required()
  })

  const {
    control,
    handleSubmit,

    formState: { errors }
  } = useForm({
    // defaultValues,
    mode: 'onChange',
    resolver: yupResolver(validationSchema)
  })

  const { fields, prepend, remove } = useFieldArray({
    control,
    name: 'createSponsors'
  })

  // useEffect(() => {
  //   dispatch(speakerWebsiteSlice.actions.handleSetIsChange({ isDirty }))
  // }, [dispatch, isDirty])

  // useEffect(() => {
  //   if (store.listSpeaker.length > 0) {
  //     reset({ createSpeaker: store.listSpeaker })
  //   }
  // }, [reset, store.listSpeaker])

  useEffect(() => {
    // if (store.listSpeaker.length == 0) {
    //   addSpeakerFiled()
    // }
    addSpeakerFiled()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const addSpeakerFiled = () => {
    prepend({
      avatar: '',
      name: '',
      type: '',
      introduction: '',
      id: 0
    })
  }

  const onSubmit = (data: any) => {
    console.log(data)

    // dispatch(handleSaveSpeaker(data.createSpeaker))
  }

  // if (store.isLoading) return <Spinner />

  return (
    <Box>
      <Typography variant='h6' sx={{ mb: 3 }}>
        Title
      </Typography>
      <TextField
        fullWidth
        id='title-speaker'
        sx={{ '& .MuiInputBase-input': { color: 'text.secondary', fontWeight: 600 } }}
        placeholder='Title Header'
      />

      <Divider sx={{ mt: 4, mb: 4 }} />
      <Typography variant='h6' sx={{ mb: 3 }}>
        Sponsors List
      </Typography>

      <Grid container sx={{ mt: 4.75, display: 'flex', justifyContent: 'flex-end' }}>
        <Button size='small' variant='contained' startIcon={<Plus fontSize='small' />} onClick={addSpeakerFiled}>
          Add Sponsor
        </Button>
      </Grid>
      <form onSubmit={handleSubmit(onSubmit)} id='speaker-form'>
        {fields.map((item, index) => {
          return <SponsorsAdd key={item.id} index={index} control={control} errors={errors} remove={remove} />
        })}
      </form>
    </Box>
  )
}

export default Sponsors
