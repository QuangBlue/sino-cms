// ** React Imports
import { useEffect } from 'react'

import Box from '@mui/material/Box'

// ** Icon Imports
import Plus from 'mdi-material-ui/Plus'

// ** Custom Component Imports
import { OrganiserPartnersAdd } from './OrganiserPartnersAdd'
import Button from '@mui/material/Button'

import { AppDispatch, RootState } from 'src/store'
import { useDispatch, useSelector } from 'react-redux'

import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, useFieldArray } from 'react-hook-form'

import { array, object, string } from 'yup'

import TextField from '@mui/material/TextField'

import { Card, CardContent, CardHeader, CircularProgress } from '@mui/material'
import { SettingHeaderTypes } from 'src/types/website'
import { editHeader } from 'src/store/event/view/website/settingsStore'
import { useRouter } from 'next/router'
import groupBy from 'lodash/groupBy'
import flattenDeep from 'lodash/flattenDeep'
import { updateOrganiserPartner } from 'src/@core/api/organiser-partner-api'
import slugify from 'slugify'
interface OrganiserPartnerContentProps {
  organiserPartnerHeader: SettingHeaderTypes
  title: string
  handleChangeHeaderTitle: (value: any) => void
  setKeyword: (value: any) => void
}


const OrganiserPartnerContent = ({ organiserPartnerHeader, title, handleChangeHeaderTitle, setKeyword }: OrganiserPartnerContentProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.organiserPartnerWebsite)

  const router = useRouter()
  
  const { id } = router.query

  const { listOrganiserPartner } = store

  const defaultValues = {
    createOrganiserPartner: listOrganiserPartner
  }

  const validationSchema = object().shape({
    createOrganiserPartner: array()
      .of(
        object().shape({
          logoUrl: string().required('Avatar field is required'),
          name: string().required('Name field is required'),
          description: string().required('Description field is required')
        })
      )
      .required()
  })

  const fieldSlugConvert = (value: string) => {
    if (value == null) {
      return ''
    } 
    return slugify(value, { lower: true })
  }

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(validationSchema)
  })

  const { fields, prepend, remove } = useFieldArray({
    control,
    name: 'createOrganiserPartner' as never
  })

  const addOrganiserPartnerFiled = () => {
    prepend({
      logoUrl: '',
      name: '',
      type: '',
      description: '',
      id: null
    })
  }

  const onSubmit = (data: any) => {   
    const dataRepo = Object.values(groupBy(data.createOrganiserPartner, 'type'))
    dataRepo.forEach(async (item: any) => {
      const categoryId = item[0].type;
      const params = item.map((element: any) => {
        if (element.id === null) {
          delete element.id
        }
        delete element.partnerId
        delete element.updatedAt
        delete element.createdAt
        delete element.partnerId
        return {...element, slug: fieldSlugConvert(element.name)};
      });
      await updateOrganiserPartner(categoryId, Number(id), {deleteIds: [], items: params})
    })
    dispatch(editHeader({ eventId: Number(id), params: [organiserPartnerHeader] }))
  }


  const handleDeleteOrganiserPartner = async (value: any) => {
    const categoryId = value?.type;
  
    const params = {
      deleteIds: [value.partnerId],
    }
    if (value.partnerId) { 
      await updateOrganiserPartner(categoryId, Number(id), params)
    }
  }


  useEffect(() => {
    const organiserPartners = listOrganiserPartner.map((item: any) => {
      return {
        name: item?.name,
        id: item?.id,
        description: item?.description,
        logoUrl: item?.logoUrl,
        partnerId: item?.id, 
        type: item?.category?.id
      }
    })

    if (organiserPartners) {
      reset({ createOrganiserPartner: flattenDeep(organiserPartners) as never })
    } else {
      reset({
        createOrganiserPartner: {
          logoUrl: '',
          name: '',
          description: '',
          type: '',
          id: null
        } as never
      })
    }
  }, [reset, listOrganiserPartner])


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }} gap={6}>
      <Card>
        <CardHeader title='Title' />
        <CardContent>
          <TextField
            fullWidth
            sx={{ '& .MuiInputBase-input': { color: 'text.secondary', fontWeight: 600 } }}
            placeholder='Title Header'
            value={title}
            onChange={e => handleChangeHeaderTitle(e.target.value)}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader
          title='List Organiser & Partners'
          action={
            <Box>
              <TextField
                size='small'
                placeholder='Search Organiser & Partners'
                sx={{ mr: 4, mb: 2, maxWidth: '180px' }}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <Button variant='contained' startIcon={<Plus fontSize='small' />} onClick={addOrganiserPartnerFiled}>
                Add Partners
              </Button>
            </Box>
          }
        />

        <CardContent sx={{ display: 'flex', justifyContent: "center" }}>
          {!store.isLoading ? 
            <Box sx={{ display: 'flex' }}>
              <CircularProgress />
            </Box> 
          : (
            <form onSubmit={handleSubmit(onSubmit)} id='organiser-partner-form'>
              {fields.map((item, index) => {
                return (
                  <OrganiserPartnersAdd 
                    key={item.id} 
                    index={index} 
                    control={control} 
                    errors={errors} 
                    remove={remove} 
                    handleDeleteOrganiserPartner={handleDeleteOrganiserPartner}
                    {...item}
                  />
                )
              })}
            </form>
          )}
        </CardContent>
      </Card>
    </Box>
  )
}

export default OrganiserPartnerContent
