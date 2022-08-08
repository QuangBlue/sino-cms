import { styled, Tab } from '@mui/material'
import MuiTabList, { TabListProps } from '@mui/lab/TabList'
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'
import { SyntheticEvent, useState } from 'react'
import Sponsors from './Sponsors'
import SponsorshipOpportunities from './SponsorshipOpportunities'

const SponsorsContent = () => {
  const TabList = styled(MuiTabList)<TabListProps>(({ theme }) => ({
    '& .MuiTabs-indicator': {
      backgroundColor: 'transparent'
    },
    '& .Mui-selected': {
      backgroundColor: theme.palette.primary.main,
      color: `${theme.palette.common.white} !important`
    },
    '& .MuiTab-root': {
      minHeight: 38,
      minWidth: 110,
      borderRadius: 8,
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2)
    }
  }))

  const [value, setValue] = useState<string>('sponsors')
  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <TabContext value={value}>
      <TabList onChange={handleChange} aria-label='customized tabs example'>
        <Tab value='sponsors' label='Sponsors' />
        <Tab value='sponsorship-ppportunities' label='Sponsorship Opportunities' />
      </TabList>
      <TabPanel value='sponsors' sx={{ p: 0, width: '100%' }}>
        <Sponsors />
      </TabPanel>
      <TabPanel value='sponsorship-ppportunities' sx={{ p: 0, width: '100%' }}>
        <SponsorshipOpportunities />
      </TabPanel>
    </TabContext>
  )
}

export default SponsorsContent
