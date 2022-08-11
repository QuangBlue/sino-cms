import { Box, Card, CardContent, CardHeader, Switch, Typography } from '@mui/material'
import React, { useCallback } from 'react'
import { SettingHeaderTypes } from 'src/types/website'
import { ABOUT_US, AGENDA, CONTACT_US, GALLERY, ORG_PARTNER, REGISTER, SPEAKER, SPONSOR } from 'src/constants/headers'
import LoadingButton from '@mui/lab/LoadingButton'

interface Props {
  headers: SettingHeaderTypes[]
  handleToggleHeader: (params: any) => void
  isLoading: boolean
}

const defaultHeaders = [
  {
    key: ABOUT_US,
    title: 'About Us',
    content: 'About Us Content',
    isPublished: false
  },
  {
    key: GALLERY,
    title: 'Gallery',
    content: 'Gallery Content',
    isPublished: false
  },
  {
    key: AGENDA,
    title: 'Agenda',
    content: 'Agenda Content',
    isPublished: false
  },
  {
    key: SPEAKER,
    title: 'Speakers',
    content: 'Speakers Content',
    isPublished: false
  },
  {
    key: SPONSOR,
    title: 'Sponsors',
    content: 'Sponsors Content',
    isPublished: false
  },
  {
    key: ORG_PARTNER,
    title: 'Organizer & Partners',
    content: 'Organizer & Partners Content',
    isPublished: false
  },
  {
    key: REGISTER,
    title: 'Register',
    content: 'Register Content',
    isPublished: false
  },
  {
    key: CONTACT_US,
    title: 'Contact Us',
    content: 'Contact Us Content',
    isPublished: false
  }
]

export default function MenuSetting({ headers, handleToggleHeader, isLoading }: Props) {
  const [settingHeaders, setSettingHeaders] = React.useState(headers || defaultHeaders)

  React.useEffect(() => {
    if (headers?.length > 0) {
      setSettingHeaders(headers)

      return
    }
    setSettingHeaders(defaultHeaders)
  }, [headers])

  const handleToggleHeaders = useCallback((item: any, value: boolean) => {
    if (item?.header) {
      setSettingHeaders(prevHeader => {
        return prevHeader.map(header => {
          if (header.header?.key === item.header.key) {
            return {
              ...header,
              isPublished: value
            }
          }

          return header
        })
      })
    } else {
      // * Incase of there are no headers
      setSettingHeaders(prevHeader => {
        return prevHeader.map(header => {
          if (header.key === item.key) {
            return {
              ...header,
              isPublished: value
            }
          }

          return header
        })
      })
    }
  }, [])

  const handleSave = () => {
    handleToggleHeader(settingHeaders)
  }

  return (
    <Card>
      <CardHeader
        title='Menu Setting'
        subheader='You can hide/show the menus'
        subheaderTypographyProps={{ sx: { lineHeight: 1.429 } }}
        titleTypographyProps={{ sx: { letterSpacing: '0.15px' } }}
        action={
          <LoadingButton
            loading={isLoading}
            size='small'
            fullWidth
            sx={{ mb: 3.5 }}
            variant='contained'
            onClick={handleSave}
          >
            Save
          </LoadingButton>
        }
      />
      <CardContent>
        {settingHeaders.map((item, idx) => {
          return (
            <Box key={idx} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>{item?.title}</Typography>
              <Switch checked={item?.isPublished} onChange={e => handleToggleHeaders(item, e.target.checked)} />
            </Box>
          )
        })}
      </CardContent>
    </Card>
  )
}
