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
import { RootState } from 'src/store'
import { useSelector } from 'react-redux'

const OptionsWrapper = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}))

const AddActions = () => {
  const store = useSelector((state: RootState) => state.speakerWebsite)
  const storeEvent = useSelector((state: RootState) => state.eventDetail)

  return (
    <Box>
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <OptionsWrapper sx={{ mb: 4 }}>
            <InputLabel htmlFor='go-live' sx={{ cursor: 'pointer', fontSize: '0.875rem', color: 'text.secondary' }}>
              Hide / Show
            </InputLabel>
            <Switch id='go-live' />
          </OptionsWrapper>

          <Button
            disabled={!store.isChange}
            type='submit'
            form='speaker-form'
            fullWidth
            sx={{ mb: 3.5 }}
            variant='contained'
          >
            Save
          </Button>
          <Link
            href={`https://sino-elite-webapp.vercel.app/${storeEvent.eventData.company.baseName}/${storeEvent.eventData.baseName}/speakers`}
            passHref
          >
            <Button
              disabled={store.isChange}
              fullWidth
              component='a'
              sx={{ mb: 3.5 }}
              variant='outlined'
              target='_blank'
            >
              Preview
            </Button>
          </Link>
        </CardContent>
      </Card>
    </Box>
  )
}

export default AddActions
