// ** React Imports
import { SyntheticEvent, useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab, { TabProps } from '@mui/material/Tab'

// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'

// ** Demo Tabs Imports

import TabInformation from 'src/views/event/view/TabInformation'
import TabWebsite from 'src/views/event/view/TabWebsite'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'
import { eventDetailSlice, fetchEventDetail } from 'src/store/event/view'
import { useRouter } from 'next/router'
import TabPanel from '@mui/lab/TabPanel'
import { eventWebsiteSlice } from 'src/store/event/view/website'

const Tab = styled(MuiTab)<TabProps>(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 100
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 67
  }
}))

const TabName = styled('span')(({ theme }) => ({
  lineHeight: 1.71,
  marginLeft: theme.spacing(2.5),
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}))

const EventDetail = () => {
  // ** State
  const [value, setValue] = useState<string>('information')

  // ** Get Id
  const router = useRouter()
  const { id } = router.query

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.eventDetail)

  useEffect(() => {
    if (id) {
      dispatch(fetchEventDetail(Number(id)))
    }

    return () => {
      dispatch(eventDetailSlice.actions.handlePageChange()), dispatch(eventWebsiteSlice.actions.handlePageChange())
    }
  }, [dispatch, id])

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  if (!id || Object.keys(store.eventData).length === 0) return null

  return (
    <Card>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label='account-settings tabs'
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
            value='information'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountOutline sx={{ fontSize: '1.125rem' }} />
                <TabName>Information</TabName>
              </Box>
            }
          />
          <Tab
            value='website'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LockOpenOutline sx={{ fontSize: '1.125rem' }} />
                <TabName>Website</TabName>
              </Box>
            }
          />
        </TabList>

        <TabPanel sx={{ p: 0 }} value='information'>
          <TabInformation eventData={store.eventData} eventMap={store.eventMap?.at(-1)} />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='website'>
          <TabWebsite />
        </TabPanel>
      </TabContext>
    </Card>
  )
}

EventDetail.acl = {
  action: 'read',
  subject: 'agent-view'
}

export default EventDetail
