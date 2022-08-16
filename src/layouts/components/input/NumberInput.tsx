import React from 'react'
import NumberFormat from 'react-number-format'
import TextField from '@mui/material/TextField'

const NumberInput = ({
  name,
  value,
  onChange,
  mask,
  format,
  label,
  prefix,
  limit ,
  thousandSeparator = false,

  ...props
}: any) => {
  return (
    <NumberFormat
      {...props}
      value={value}
      name={name}
      mask={mask}
      label={label}
      customInput={TextField}
      prefix={prefix}
      format={format || null}
      type='text'
      thousandSeparator={thousandSeparator}
      isAllowed={values => {
        const { floatValue } = values
        const number = floatValue ? floatValue : 0

        return number <= limit
      }}
      onValueChange={onChange}
    />
  )
}

export default NumberInput
