import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  // InputAdornment,
  // MenuItem,
  // Select,
  // TextField,
  Typography
} from '@mui/material'
import { useState } from 'react'
import { HexColorPicker } from 'react-colorful'

export default function StylesSite() {
  const [color, setColor] = useState('#b32aa9')

  return (
    <Card>
      <CardHeader
        title='Styles Site'
        subheader='Edit your Styles settings'
        subheaderTypographyProps={{ sx: { lineHeight: 1.429 } }}
        titleTypographyProps={{ sx: { letterSpacing: '0.15px' } }}
        action={
          <Button size='small' fullWidth sx={{ mb: 3.5 }} variant='contained'>
            Save
          </Button>
        }
      />
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column' }} gap={6}>
          <Box sx={{ display: 'flex', alignItems: 'center' }} gap={6}>
            <Typography>Primary Color</Typography>
            <HexColorPicker color={color} onChange={setColor} />
          </Box>
          {/* <Box sx={{ display: 'flex', alignItems: 'center' }} gap={6}>
            <Typography>Base Font Size</Typography>
            <TextField
              type='number'
              InputProps={{
                endAdornment: <InputAdornment position='start'>px</InputAdornment>
              }}
            />
          </Box> */}
          {/* <Box sx={{ display: 'flex', alignItems: 'center' }} gap={6}>
            <Typography>Mobile Base Font Size</Typography>
            <TextField
              type='number'
              InputProps={{
                endAdornment: <InputAdornment position='start'>px</InputAdornment>
              }}
            />
          </Box> */}
          {/* <Box sx={{ display: 'flex', alignItems: 'center' }} gap={6}>
            <Typography>Base Font Weight</Typography>
            <Select defaultValue='400'>
              <MenuItem value='100'>100</MenuItem>
              <MenuItem value='200'>200</MenuItem>
              <MenuItem value='300'>300</MenuItem>
              <MenuItem value='400'>400</MenuItem>
              <MenuItem value='500'>500</MenuItem>
              <MenuItem value='600'>600</MenuItem>
              <MenuItem value='700'>700</MenuItem>
              <MenuItem value='800'>800</MenuItem>
              <MenuItem value='900'>900</MenuItem>
            </Select>
          </Box> */}
        </Box>
      </CardContent>
    </Card>
  )
}
