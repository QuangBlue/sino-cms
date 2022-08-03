// ** React Imports
import { useEffect } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

// ** Icon Imports
import Plus from 'mdi-material-ui/Plus'

// ** Custom Component Imports
import { SpeakerAdd } from './SpeakerAdd'
import Button from '@mui/material/Button'
import { AppDispatch, RootState } from 'src/store'
import { useDispatch, useSelector } from 'react-redux'

import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { useForm, useFieldArray } from 'react-hook-form'
import Spinner from 'src/@core/components/spinner'

import { array, object, string } from 'yup'
import { handleSaveSpeaker, speakerWebsiteSlice } from 'src/store/event/view/website/speakerStore'

const SpeakerContent = () => {
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.speakerWebsite)

  const defaultValues = {
    createSpeaker: store.listSpeaker
  }

  const validationSchema = object().shape({
    createSpeaker: array()
      .of(
        object().shape({
          avatar: string().required('Avarta field is required'),
          name: string().required('Full Name field is required')
        })
      )
      .required()
  })

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(validationSchema)
  })

  const { fields, prepend, remove } = useFieldArray({
    control,
    name: 'createSpeaker'
  })

  useEffect(() => {
    dispatch(speakerWebsiteSlice.actions.handleSetIsChange({ isDirty }))
  }, [dispatch, isDirty])

  useEffect(() => {
    if (store.listSpeaker.length > 0) {
      reset({ createSpeaker: store.listSpeaker })
    }
  }, [reset, store.listSpeaker])

  const addSpeakerFiled = () => {
    prepend({
      avatar: '',
      name: '',
      jobTitle: '',
      biography: '',
      id: 0
    })
  }

  const onSubmit = (data: any) => {
    dispatch(handleSaveSpeaker(data.createSpeaker))
  }

  if (store.isLoading) return <Spinner />

  return (
    <Box sx={{ my: 4, ml: 4 }}>
      <Grid container sx={{ mt: 4.75, display: 'flex', justifyContent: 'flex-end' }}>
        <Button size='small' variant='contained' startIcon={<Plus fontSize='small' />} onClick={addSpeakerFiled}>
          Add Speaker
        </Button>
      </Grid>
      <form onSubmit={handleSubmit(onSubmit)} id='speaker-form'>
        {fields.map((item, index) => {
          return (
            <SpeakerAdd
              key={item.id}
              id={store.listSpeaker[index]?.id || 0}
              index={index}
              control={control}
              errors={errors}
              remove={remove}
            />
          )
        })}
      </form>
    </Box>
  )
}

export default SpeakerContent
