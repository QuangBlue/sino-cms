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
import FormControl from '@mui/material/FormControl'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'

// import { getSpeaker } from 'src/store/event/view/website/speakerStore'

const OptionsWrapper = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}))

const SponsorsActions = () => {
  // ** Hook
  const { i18n } = useTranslation()
  const router = useRouter()
  const { selected } = router.query

  // const storeSpeaker = useSelector((state: RootState) => state.speakerWebsite)
  const storeEvent = useSelector((state: RootState) => state.eventDetail)

  // const dispatch = useDispatch<AppDispatch>()

  const handleLangItemClick = (event: ChangeEvent<HTMLInputElement>) => {
    i18n.changeLanguage((event.target as HTMLInputElement).value)

    // dispatch(getSpeaker(storeEvent.eventData.baseName))
  }

  return (
    <Box>
      <Card>
        <CardContent>
          <OptionsWrapper sx={{ mb: 4 }}>
            <InputLabel htmlFor='go-live' sx={{ cursor: 'pointer', fontSize: '0.875rem', color: 'text.secondary' }}>
              Hide / Show
            </InputLabel>
            <Switch id='go-live' />
          </OptionsWrapper>

          <OptionsWrapper sx={{ mb: 4 }}>
            <InputLabel htmlFor='go-live' sx={{ cursor: 'pointer', fontSize: '0.875rem', color: 'text.secondary' }}>
              Languages
            </InputLabel>
            <FormControl sx={{ flexWrap: 'wrap', flexDirection: 'row' }}>
              <RadioGroup
                row
                value={i18n.language}
                sx={{ justifyContent: 'flex-end' }}
                name='simple-radio'
                onChange={handleLangItemClick}
                aria-label='simple-radio'
              >
                <FormControlLabel value='en-US' control={<Radio />} label='English' />
                <FormControlLabel value='zh-CN' control={<Radio />} label='Chinese' />
              </RadioGroup>
            </FormControl>
          </OptionsWrapper>

          <Button type='submit' form='about-us-form' fullWidth sx={{ mb: 3.5 }} variant='contained'>
            Save
          </Button>
          <Link
            href={`https://sino-elite-webapp.vercel.app/${storeEvent.eventData.company.baseName}/${storeEvent.eventData.baseName}/${selected}`}
            passHref
          >
            <Button fullWidth component='a' sx={{ mb: 3.5 }} variant='outlined' target='_blank'>
              Preview
            </Button>
          </Link>
        </CardContent>
      </Card>
    </Box>
  )
}

export default SponsorsActions
