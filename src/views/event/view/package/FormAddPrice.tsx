import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  TextField
} from '@mui/material'
import * as React from 'react'
import { useState } from 'react'
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import CustomInput from './CustomInput'

import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'
import { PackageTypesData, PriceTypes } from 'src/types/eventTypes'
import {
  addPricePackage,
  updatePackage
} from 'src/store/event/view/packageStore'
import { formatDate } from 'src/@core/utils/dateTime'
import DatePicker from 'react-datepicker'

// ** Third Party Imports
import * as yup from 'yup'

const schema = yup.object().shape({
  price: yup
    .number()
    .required('Price field is required')
    .typeError('Price field must a number'),
  stockLimit: yup
    .number()
    .typeError('Limit field must a number')
    .required('Limit field is required')
})

export interface IFormPackageProps {
  handleDialogClose: () => void
  dataPackageSelect: PackageTypesData | null
  priceSelected: PriceTypes | null
}

export default function FormAddPrice(props: IFormPackageProps) {
  const { handleDialogClose, dataPackageSelect, priceSelected } = props
  const [periodStart, setPeriodStart] = useState<DateType>(
    priceSelected ? new Date(priceSelected.periodStart) : new Date()
  )
  const [periodEnd, setPeriodEnd] = useState<DateType>(
    priceSelected ? new Date(priceSelected.periodEnd) : new Date()
  )

  const dispatch = useDispatch<AppDispatch>()
  const storeEvent = useSelector((state: RootState) => state.eventDetail)

  const isEdit = Boolean(priceSelected)

  const defaultValues = !isEdit
    ? {
        price: '',
        stockLimit: ''
      }
    : {
        price: priceSelected?.price || '',
        stockLimit: priceSelected?.stockLimit || ''
      }

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const onSubmit = async (params: any) => {
    const props: any = {
      eventName: storeEvent.eventData.baseName,
      handleClickCloseModal: handleDialogClose,
      params: {
        ...params,
        periodEnd: formatDate(periodEnd!.toLocaleString()),
        periodStart: formatDate(periodStart!.toLocaleString()),

        ...(!isEdit && {
          priceType: 'early-bird',
          normalId: dataPackageSelect?.id,
          type: dataPackageSelect?.type
        })
      },
      ...(priceSelected && { packageId: priceSelected.id })
    }
    if (isEdit) {
      console.log('update')
      console.log(props)

      dispatch(updatePackage(props))
    } else {
      dispatch(addPricePackage(props))
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={6}>
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
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 4, mt: 6 }}>
        <Button
          variant='outlined'
          color='secondary'
          onClick={handleDialogClose}
        >
          Cancel
        </Button>
        <Button type='submit' variant='contained' sx={{ mr: 2 }}>
          {priceSelected ? 'Edit Price' : 'Add Price'}
        </Button>
      </Box>
    </form>
  )
}
