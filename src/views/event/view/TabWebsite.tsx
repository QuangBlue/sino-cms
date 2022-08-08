import TabContext from '@mui/lab/TabContext'
import MuiTabList, { TabListProps } from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import MuiTab, { TabProps } from '@mui/material/Tab'
import AccountTieVoice from 'mdi-material-ui/AccountTieVoice'
import CalendarRange from 'mdi-material-ui/CalendarRange'
import FolderMultipleImage from 'mdi-material-ui/FolderMultipleImage'
import InformationOutline from 'mdi-material-ui/InformationOutline'
import Lifebuoy from 'mdi-material-ui/Lifebuoy'
import ShieldStar from 'mdi-material-ui/ShieldStar'
import StarCheck from 'mdi-material-ui/StarCheck'

import { useRouter } from 'next/router'
import { SyntheticEvent, useEffect, useState } from 'react'
import AboutUsTabView from './website/about-us/AboutUsTabView'
import AgendaTabView from './website/agenda/AgendaTabView'
import ContactUsTabView from './website/contact-us/ContactUsTabView'
import GalleryTabView from './website/gallery/GalleryTabView'
import OrganiserPartnersTabView from './website/organiser-partners/OrganiserPartnersTabView'
import SpeakerTabView from './website/speaker/SpeakerTabView'
import SponsorsTabView from './website/sponsors/SponsorsTabView'

const Tab = styled(MuiTab)<TabProps>(({ theme }) => ({
  minHeight: 48,
  flexDirection: 'row',
  '& svg': {
    marginBottom: '0 !important',
    marginRight: theme.spacing(2)
  }
}))

const TabList = styled(MuiTabList)<TabListProps>(({ theme }) => ({
  border: 0,
  minWidth: 260,
  margin: theme.spacing(4),
  '& .MuiTabs-indicator': {
    backgroundColor: 'transparent'
  },
  '& .Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    color: `${theme.palette.common.white} !important`
  },
  '& .MuiTab-root': {
    minHeight: 38,
    minWidth: 260,
    borderRadius: 8,
    margin: theme.spacing(1, 0),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  '& .MuiButtonBase-root': {
    justifyContent: 'flex-start'
  }
}))

const TabWebsite = () => {
  // ** State
  const [value, setValue] = useState<string>('about-us')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)

    router.push(`${router.pathname.replace('[id]', `${id}`)}?tab=website&selected=${newValue}`, undefined, {
      shallow: true
    })
  }

  // ** Get Id
  const router = useRouter()
  const { id, selected } = router.query

  useEffect(() => {
    if (selected) {
      setValue(selected.toString() || '')
    } else {
      router.push(`${router.pathname.replace('[id]', `${id}`)}?tab=website&selected=${value}`, undefined, {
        shallow: true
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <TabContext value={value}>
      <Box sx={{ display: 'flex', height: '100%' }}>
        <TabList orientation='vertical' onChange={handleChange} aria-label='forced scroll tabs example'>
          <Tab value='about-us' label='about us' icon={<InformationOutline sx={{ fontSize: '18px' }} />} />
          <Tab value='gallery' label='gallery' icon={<FolderMultipleImage sx={{ fontSize: '18px' }} />} />
          <Tab value='agenda' label='agenda' icon={<CalendarRange sx={{ fontSize: '18px' }} />} />
          <Tab value='speaker' label='speaker' icon={<AccountTieVoice sx={{ fontSize: '18px' }} />} />
          <Tab value='sponsors' label='sponsors' icon={<ShieldStar sx={{ fontSize: '18px' }} />} />
          <Tab value='organiser-partners' label='organiser & partners' icon={<StarCheck sx={{ fontSize: '18px' }} />} />
          <Tab value='contact-us' label='contact us' icon={<Lifebuoy sx={{ fontSize: '18px' }} />} />
        </TabList>

        <Divider orientation='vertical' flexItem />

        <TabPanel sx={{ p: 0, width: '100%' }} value='about-us'>
          <AboutUsTabView />
        </TabPanel>
        <TabPanel sx={{ p: 0, width: '100%' }} value='gallery'>
          <GalleryTabView />
        </TabPanel>
        <TabPanel sx={{ p: 0, width: '100%' }} value='agenda'>
          <AgendaTabView />
        </TabPanel>
        <TabPanel sx={{ p: 0, width: '100%' }} value='speaker'>
          <SpeakerTabView />
        </TabPanel>
        <TabPanel sx={{ p: 0, width: '100%' }} value='sponsors'>
          <SponsorsTabView />
        </TabPanel>
        <TabPanel sx={{ p: 0, width: '100%' }} value='organiser-partners'>
          <OrganiserPartnersTabView />
        </TabPanel>
        <TabPanel sx={{ p: 0, width: '100%' }} value='contact-us'>
          <ContactUsTabView />
        </TabPanel>
      </Box>
    </TabContext>
  )
}

export default TabWebsite
