// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Switch from '@mui/material/Switch'
import { styled } from '@mui/material/styles'
import InputLabel from '@mui/material/InputLabel'
import Box, { BoxProps } from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'

const OptionsWrapper = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}))

const AddActions = () => {
  return (
    <Box>
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <OptionsWrapper sx={{ mb: 4 }}>
            <InputLabel htmlFor='go-live' sx={{ cursor: 'pointer', fontSize: '0.875rem', color: 'text.secondary' }}>
              Go Live
            </InputLabel>
            <Switch defaultChecked id='go-live' />
          </OptionsWrapper>

          <Button fullWidth sx={{ mb: 3.5 }} variant='contained'>
            Save
          </Button>
          <Link href='#' passHref>
            <Button fullWidth component='a' sx={{ mb: 3.5 }} variant='outlined'>
              Preview
            </Button>
          </Link>
        </CardContent>
      </Card>
    </Box>
  )
}

export default AddActions
