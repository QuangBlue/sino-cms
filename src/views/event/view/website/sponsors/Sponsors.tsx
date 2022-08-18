// ** React Imports
import React, { useEffect } from 'react'

import Box from '@mui/material/Box'

// ** Icon Imports
import Plus from 'mdi-material-ui/Plus'

// ** Custom Component Imports
import { SponsorsAdd } from './SponsorsAdd'
import Button from '@mui/material/Button'

import { AppDispatch, RootState } from 'src/store'
import { useDispatch, useSelector } from 'react-redux'

import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, useFieldArray } from 'react-hook-form'

import { array, object, string, number } from 'yup'

import TextField from '@mui/material/TextField'
import groupBy from 'lodash/groupBy'

import { Card, CardContent, CardHeader } from '@mui/material'
import { updateSponsors } from 'src/@core/api/sponsor-api'

import flattenDeep from 'lodash/flattenDeep'

import { getSponsors } from 'src/store/event/view/website/sponsorStore'

const Sponsors = ({ handleChangeHeaderTitle, headerTitle }: any) => {
  const store = useSelector((state: RootState) => state.sponsorWebsite)
  const eventStore = useSelector((state: RootState) => state.eventDetail)
  const dispatch = useDispatch<AppDispatch>()

  const { baseName } = eventStore?.eventData

  const { sponsors } = store

  const validationSchema = object().shape({
    createSponsors: array()
      .of(
        object().shape({
          logoUrl: string().required('Logo is required'),
          name: string().required('Sponsor name is required'),
          description: string().required('Description is required'),
          sponsorType: number()
            .required('Type is required')
            .typeError('Type is required')
        })
      )
      .required()
  })

  const {
    control,
    handleSubmit,
    reset,
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

  useEffect(() => {
    const sponsorList = sponsors.map(sponsor => {
      return sponsor.sponsors.map((item: any) => {
        return { ...item, sponsorType: sponsor.id, sponsorId: item.id }
      })
    })

    if (sponsorList) {
      reset({ createSponsors: flattenDeep(sponsorList) })
    } else {
      reset({
        createSponsors: {
          logoUrl: '',
          name: '',
          description: '',
          sponsorType: '',
          sponsorId: null
        }
      })
    }
  }, [reset, sponsors])

  const addSpeakerFiled = () => {
    prepend({
      logoUrl: '',
      name: '',
      description: '',
      sponsorType: '',
      sponsorId: null
    })
  }

  const onSubmit = (sponsors: any) => {
    const sponsorList = Object.values(
      groupBy(sponsors.createSponsors, 'sponsorType')
    )

    sponsorList.forEach(async (sponsor: any) => {
      //* Add Sponsor
      const levelId = sponsor[0].sponsorType
      const params = { items: sponsor }

      await updateSponsors(levelId, params)
    })

    setTimeout(() => {
      dispatch(getSponsors(baseName))
    }, 1000)
  }

  const handleDeleteSponsor = (value: any) => {
    const levelId = value.sponsorType
    const params = { deleteIds: [value.sponsorId] }

    updateSponsors(levelId, params)
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }} gap={6}>
      <Card>
        <CardHeader title='Title' />
        <CardContent>
          <TextField
            fullWidth
            sx={{
              '& .MuiInputBase-input': {
                color: 'text.secondary',
                fontWeight: 600
              }
            }}
            placeholder='Title Header'
            onChange={e => handleChangeHeaderTitle(e.target.value)}
            value={headerTitle}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader
          title='List Sponsor'
          action={
            <Box>
              <TextField
                size='small'
                placeholder='Search Sponsor'
                sx={{ mr: 4, mb: 2, maxWidth: '180px' }}
              />
              <Button
                variant='contained'
                startIcon={<Plus fontSize='small' />}
                onClick={addSpeakerFiled}
              >
                Add Sponsor
              </Button>
            </Box>
          }
        />
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} id='sponsor-form'>
            {fields.map((item, index) => {
              return (
                <SponsorsAdd
                  key={item.id}
                  index={index}
                  control={control}
                  errors={errors}
                  remove={remove}
                  handleDeleteSponsor={handleDeleteSponsor}
                  {...item}
                />
              )
            })}
          </form>
        </CardContent>
      </Card>
    </Box>
  )
}

export default React.memo(Sponsors)
