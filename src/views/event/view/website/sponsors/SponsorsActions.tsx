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

import { SettingHeaderTypes } from 'src/types/website'

const OptionsWrapper = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}))

interface SponsorActionProps {
  handleSave: () => void
  sponsorHeader: SettingHeaderTypes
  handleToggleSponsorHeader: (checked: boolean) => void
  handleChangeLang: () => void
}

const SponsorsActions = ({
  handleSave,
  sponsorHeader,
  handleToggleSponsorHeader,
  handleChangeLang
}: SponsorActionProps) => {
  // ** Hook
  const { i18n } = useTranslation()
  const router = useRouter()
  const { selected } = router.query

  const storeEvent = useSelector((state: RootState) => state.eventDetail)

  const handleLangItemClick = (event: ChangeEvent<HTMLInputElement>) => {
    i18n.changeLanguage((event.target as HTMLInputElement).value)
    handleChangeLang()
  }

  return (
    <Box>
      <Card>
        <CardContent>
          <OptionsWrapper sx={{ mb: 4 }}>
            <InputLabel
              htmlFor='go-live'
              sx={{
                cursor: 'pointer',
                fontSize: '0.875rem',
                color: 'text.secondary'
              }}
            >
              Hide / Show
            </InputLabel>
            <Switch
              id='go-live'
              checked={sponsorHeader.isPublished}
              onChange={e => handleToggleSponsorHeader(e.target.checked)}
            />
          </OptionsWrapper>

          <OptionsWrapper sx={{ mb: 4 }}>
            <InputLabel
              htmlFor='go-live'
              sx={{
                cursor: 'pointer',
                fontSize: '0.875rem',
                color: 'text.secondary'
              }}
            >
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
                <FormControlLabel
                  value='en-US'
                  control={<Radio />}
                  label='English'
                />
                <FormControlLabel
                  value='zh-CN'
                  control={<Radio />}
                  label='Chinese'
                />
              </RadioGroup>
            </FormControl>
          </OptionsWrapper>

          <Button
            type='submit'
            fullWidth
            sx={{ mb: 3.5 }}
            variant='contained'
            onClick={handleSave}
            form='sponsor-form'
          >
            Save
          </Button>
          <Link
            href={`https://sino-elite-webapp.vercel.app/${storeEvent.eventData.company.baseName}/${storeEvent.eventData.baseName}/${selected}`}
            passHref
          >
            <Button
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

export default SponsorsActions
