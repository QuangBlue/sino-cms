import {
  Box,
  BoxProps,
  Button,
  CardContent,
  CardContentProps,
  Chip,
  Collapse,
  FormControl,
  FormHelperText,
  Grid,
  GridProps,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  styled,
  TextField,
  Typography
} from '@mui/material'
import { Close, Plus } from 'mdi-material-ui'
import * as React from 'react'
import { useState } from 'react'
import Repeater from 'src/@core/components/repeater'
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import CustomInput from './CustomInput'

import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'
import { PackageTypesData } from 'src/types/eventTypes'
import { createPackage, updatePackage } from 'src/store/event/view/packageStore'
import { formatDate } from 'src/@core/utils/dateTime'
import DatePicker from 'react-datepicker'

// ** Third Party Imports
import * as yup from 'yup'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      width: 250,
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
    }
  }
}

const names = [
  'Hotel Oliver Hansen',
  'Hotel Van Henry',
  'Hotel April Tucker',
  'Hotel Ralph Hubbard',
  'Hotel Omar Alexander',
  'Hotel Carlos Abbott',
  'Hotel Miriam Wagner',
  'Hotel Bradley Wilkerson',
  'Hotel Virginia Andrews',
  'Hotel Kelly Snyder'
]

const InvoiceAction = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  padding: theme.spacing(2, 1),
  borderLeft: `1px solid ${theme.palette.divider}`
}))

const RepeaterWrapper = styled(CardContent)<CardContentProps>(({ theme }) => ({
  // paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(5.5),
  paddingRight: 0,
  paddingLeft: 0,
  '& .repeater-wrapper + .repeater-wrapper': {
    marginTop: theme.spacing(6)
  }
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

const schemaCreate = yup.object().shape({
  type: yup.string().required('Type field is required'),
  name: yup.string().required('Package Name field is required'),
  price: yup
    .number()
    .required('Price field is required')
    .typeError('Price field must a number'),
  stockLimit: yup
    .number()
    .min(0, 'Stock limit must be more than zero')
    .typeError('Limit field must a number')
    .required('Limit field is required')
})

const schemaEdit = yup.object().shape({
  name: yup.string().required('Package Name field is required')
})

export interface IFormPackageProps {
  handleDialogClose: () => void
  dataPackageSelect: PackageTypesData | null
}

export default function FormPackage(props: IFormPackageProps) {
  const { handleDialogClose, dataPackageSelect } = props
  const [periodStart, setPeriodStart] = useState<DateType>(new Date())
  const [periodEnd, setPeriodEnd] = useState<DateType>(new Date())
  const [personName, setPersonName] = useState<string[]>([])
  const [benefits, setBenefit] = useState<string[]>(
    dataPackageSelect ? dataPackageSelect.benefits : []
  )

  const dispatch = useDispatch<AppDispatch>()
  const storeEvent = useSelector((state: RootState) => state.eventDetail)

  const isEdit = Boolean(dataPackageSelect)

  const defaultValues = !isEdit
    ? {
        type: '',
        name: '',
        price: '',
        stockLimit: ''
      }
    : {
        name: dataPackageSelect?.name
      }

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(!isEdit ? schemaCreate : schemaEdit)
  })

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    setPersonName(event.target.value as string[])
  }

  // ** Deletes form
  const deleteForm = (index: number) => {
    setBenefit(prev => {
      prev.splice(index, 1)

      return [...prev]
    })
  }

  const onSubmit = async (params: any) => {
    const props: any = {
      eventName: storeEvent.eventData.baseName,
      handleClickCloseModal: handleDialogClose,
      params: {
        ...params,
        ...(!isEdit && {
          periodEnd: formatDate(periodEnd!.toLocaleString()),
          periodStart: formatDate(periodStart!.toLocaleString()),
          priceType: 'normal'
        }),

        ...(benefits.length > 0 && { benefits })
      },
      ...(dataPackageSelect && { packageId: dataPackageSelect.id })
    }

    if (isEdit) {
      dispatch(updatePackage(props))
    } else {
      dispatch(createPackage(props))
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={6}>
        {!isEdit && (
          <Grid item sm={12} xs={12}>
            <FormControl fullWidth>
              <Controller
                name='type'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <FormControl>
                    <InputLabel id='contact-type'>Type</InputLabel>
                    <Select
                      label='Type'
                      labelId='contact-type'
                      value={value}
                      onChange={onChange}
                      error={Boolean(errors.type)}
                      aria-describedby='validation-schema-type'
                    >
                      <MenuItem value='virtual'>Live Stream</MenuItem>
                      <MenuItem value='onsite'>Onsite</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
              {errors.type && (
                <FormHelperText
                  sx={{ color: 'error.main' }}
                  id='validation-schema-type'
                >
                  {errors.type.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
        )}
        <Grid item sm={12} xs={12}>
          <FormControl fullWidth>
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
                  label='Title'
                  onChange={onChange}
                  placeholder='Title'
                  error={Boolean(errors.name)}
                  aria-describedby='validation-schema-name'
                />
              )}
            />
            {errors.name && (
              <FormHelperText
                sx={{ color: 'error.main' }}
                id='validation-schema-name'
              >
                {errors.name.message}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        {!isEdit && (
          <Grid item sm={6} xs={12}>
            <FormControl fullWidth>
              <Controller
                name='price'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    inputProps={{
                      autoComplete: 'new-password'
                    }}
                    type='number'
                    value={value}
                    label='Price'
                    onChange={onChange}
                    placeholder='Price'
                    error={Boolean(errors.price)}
                    aria-describedby='validation-schema-price'
                  />
                )}
              />
              {errors.price && (
                <FormHelperText
                  sx={{ color: 'error.main' }}
                  id='validation-schema-price'
                >
                  {errors.price.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
        )}
        {!isEdit && (
          <Grid item sm={6} xs={12}>
            <FormControl fullWidth>
              <Controller
                name='stockLimit'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    inputProps={{
                      autoComplete: 'new-password'
                    }}
                    type='number'
                    value={value}
                    label='Limit'
                    onChange={onChange}
                    placeholder='Limit'
                    error={Boolean(errors.stockLimit)}
                    aria-describedby='validation-schema-limit'
                  />
                )}
              />
              {errors.stockLimit && (
                <FormHelperText
                  sx={{ color: 'error.main' }}
                  id='validation-schema-limit'
                >
                  {errors.stockLimit.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
        )}
        {!isEdit && (
          <Grid item sm={6} xs={12}>
            <FormControl fullWidth>
              <DatePicker
                selected={periodStart}
                id='basic-input'
                onChange={(date: Date) => setPeriodStart(date)}
                placeholderText='Click to select a date'
                customInput={<CustomInput label='Start Date' />}
              />
            </FormControl>
          </Grid>
        )}
        {!isEdit && (
          <Grid item sm={6} xs={12}>
            <FormControl fullWidth>
              <DatePicker
                selected={periodEnd}
                id='basic-input'
                onChange={(date: Date) => setPeriodEnd(date)}
                placeholderText='Click to select a date'
                customInput={<CustomInput label='End Date' />}
              />
            </FormControl>
          </Grid>
        )}
        <Grid item sm={12} xs={12}>
          <FormControl fullWidth>
            <InputLabel id='demo-multiple-chip-label'>Hotels</InputLabel>
            <Select
              multiple
              label='Hotels'
              value={personName}
              MenuProps={MenuProps}
              id='demo-multiple-chip'
              onChange={handleChange}
              labelId='demo-multiple-chip-label'
              renderValue={selected => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                  {(selected as unknown as string[]).map(value => (
                    <Chip key={value} label={value} sx={{ m: 0.75 }} />
                  ))}
                </Box>
              )}
            >
              {names.map(name => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item sm={12} xs={12}>
          <RepeaterWrapper>
            <Repeater count={benefits.length}>
              {(i: number) => {
                const Tag = i === 0 ? Box : Collapse

                return (
                  <Tag
                    key={i}
                    className='repeater-wrapper'
                    {...(i !== 0 ? { in: true } : {})}
                  >
                    <Grid container>
                      <RepeatingContent item xs={12}>
                        <Grid
                          container
                          sx={{
                            py: 4,
                            width: '100%',
                            pr: { lg: 0, xs: 4 }
                          }}
                        >
                          <Grid
                            item
                            xs={12}
                            sx={{ px: 4, my: { lg: 0, xs: 4 } }}
                          >
                            <Typography
                              variant='subtitle2'
                              sx={{
                                color: 'text.primary'
                              }}
                            >
                              Benefit #{i + 1}
                            </Typography>

                            <TextField
                              rows={2}
                              value={benefits[i]}
                              fullWidth
                              multiline
                              onChange={e =>
                                setBenefit(prev => {
                                  const temp = [...prev]
                                  temp[i] = e.target.value

                                  return temp
                                })
                              }
                              size='small'
                              sx={{ mt: 3.5 }}
                            />
                          </Grid>
                        </Grid>
                        <InvoiceAction>
                          <IconButton
                            size='small'
                            onClick={() => deleteForm(i)}
                          >
                            <Close fontSize='small' />
                          </IconButton>
                        </InvoiceAction>
                      </RepeatingContent>
                    </Grid>
                  </Tag>
                )
              }}
            </Repeater>

            <Grid container sx={{ mt: 4.75 }}>
              <Grid item xs={12} sx={{ px: 0 }}>
                <Button
                  size='small'
                  variant='contained'
                  startIcon={<Plus fontSize='small' />}
                  onClick={() => setBenefit(prev => [...prev, ''])}
                >
                  Add Benefit
                </Button>
              </Grid>
            </Grid>
          </RepeaterWrapper>
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 4 }}>
        <Button
          variant='outlined'
          color='secondary'
          onClick={handleDialogClose}
        >
          Cancel
        </Button>
        <Button type='submit' variant='contained' sx={{ mr: 2 }}>
          {isEdit ? 'Update' : 'Create'}
        </Button>
      </Box>
    </form>
  )
}
