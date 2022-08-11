// ** React Imports
import { useEffect } from 'react'

import Box from '@mui/material/Box'

// ** Icon Imports
import Plus from 'mdi-material-ui/Plus'

// ** Custom Component Imports
import { SpeakerAdd } from './SpeakerAdd'
import Button from '@mui/material/Button'
import { AppDispatch, RootState } from 'src/store'
import { useDispatch, useSelector } from 'react-redux'

import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, useFieldArray } from 'react-hook-form'
import Spinner from 'src/@core/components/spinner'

import { array, object, string } from 'yup'
import { handleSaveSpeaker, speakerWebsiteSlice } from 'src/store/event/view/website/speakerStore'
import TextField from '@mui/material/TextField'
import { Card, CardContent, CardHeader } from '@mui/material'

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

  useEffect(() => {
    if (store.listSpeaker.length == 0) {
      addSpeakerFiled()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
    <Box sx={{ display: 'flex', flexDirection: 'column' }} gap={6}>
      <Card>
        <CardHeader title='Title' />
        <CardContent>
          <TextField
            fullWidth
            id='title-speaker'
            sx={{ '& .MuiInputBase-input': { color: 'text.secondary', fontWeight: 600 } }}
            placeholder='Title Header'
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader
          title='List Speaker'
          action={
            <Box>
              <TextField size='small' placeholder='Search Speaker' sx={{ mr: 4, mb: 2, maxWidth: '180px' }} />
              <Button variant='contained' startIcon={<Plus fontSize='small' />} onClick={addSpeakerFiled}>
                Add Speaker
              </Button>
            </Box>
          }
        />
        <CardContent>
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
        </CardContent>
      </Card>
    </Box>
  )
}

export default SpeakerContent
