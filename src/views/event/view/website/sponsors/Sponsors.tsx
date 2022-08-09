// ** React Imports
import { useEffect } from 'react'

import Box from '@mui/material/Box'

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

import TextField from '@mui/material/TextField'

import { Card, CardContent, CardHeader } from '@mui/material'

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
              <TextField size='small' placeholder='Search Sponsor' sx={{ mr: 4, mb: 2, maxWidth: '180px' }} />
              <Button variant='contained' startIcon={<Plus fontSize='small' />} onClick={addSpeakerFiled}>
                Add Sponsor
              </Button>
            </Box>
          }
        />
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} id='speaker-form'>
            {fields.map((item, index) => {
              return <SponsorsAdd key={item.id} index={index} control={control} errors={errors} remove={remove} />
            })}
          </form>
        </CardContent>
      </Card>
    </Box>
  )
}

export default Sponsors
