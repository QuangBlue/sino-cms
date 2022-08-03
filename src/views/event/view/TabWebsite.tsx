import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import MuiTab, { TabProps } from '@mui/material/Tab'
import AccountTieVoice from 'mdi-material-ui/AccountTieVoice'
import { useRouter } from 'next/router'
import { SyntheticEvent, useEffect, useState } from 'react'
import SpeakerTabView from './WebsiteSpeakerTabView'

const Tab = styled(MuiTab)<TabProps>(({ theme }) => ({
  minHeight: 48,
  flexDirection: 'row',
  '& svg': {
    marginBottom: '0 !important',
    marginRight: theme.spacing(1)
  }
}))

const TabWebsite = () => {
  // ** State
  const [value, setValue] = useState<string>('speaker')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
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
      <TabList
        variant='scrollable'
        scrollButtons='auto'
        onChange={handleChange}
        aria-label='forced scroll tabs example'
        sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
      >
        <Tab value='speaker' label='speaker' icon={<AccountTieVoice sx={{ fontSize: '18px' }} />} />
        {/* <Tab value='security' label='Security' icon={<LockOutline sx={{ fontSize: '18px' }} />} /> */}
        {/* <Tab value='billing-plan' label='Billing & Plan' icon={<BookmarkOutline sx={{ fontSize: '18px' }} />} />
        <Tab value='notification' label='Notification' icon={<BellOutline sx={{ fontSize: '18px' }} />} /> */}
      </TabList>
      <Box sx={{ mt: 3 }}>
        <TabPanel sx={{ p: 0 }} value='speaker'>
          <SpeakerTabView />
        </TabPanel>
      </Box>
    </TabContext>
  )
}
export default TabWebsite
