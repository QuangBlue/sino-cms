// ** React Imports
import { SyntheticEvent, useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab, { TabProps } from '@mui/material/Tab'

import TabInformation from 'src/views/event/view/information/TabInformation'
import TabWebsite from 'src/views/event/view/website/TabWebsite'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'
import { eventDetailSlice, fetchEventDetail } from 'src/store/event/view/informationStore'
import { useRouter } from 'next/router'
import TabPanel from '@mui/lab/TabPanel'
import { speakerWebsiteSlice } from 'src/store/event/view/website/speakerStore'
import Web from 'mdi-material-ui/Web'
import InformationVariant from 'mdi-material-ui/InformationVariant'
import TabPackage from 'src/views/event/view/package/TabPackage'
import { FileDocumentEditOutline, VideoCheck } from 'mdi-material-ui'
import TabLiveStream from 'src/views/event/view/live-stream/TabLiveStream'

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
  const { id, tab } = router.query

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.eventDetail)

  useEffect(() => {
    if (id) {
      dispatch(fetchEventDetail(Number(id)))
    }

    return () => {
      dispatch(eventDetailSlice.actions.handlePageChange()), dispatch(speakerWebsiteSlice.actions.handlePageChange())
    }
  }, [dispatch, id])

  useEffect(() => {
    if (tab) {
      setValue(tab.toString() || '')
    } else {
      router.push(`${router.pathname.replace('[id]', `${id}`)}?tab=${value}`, undefined, { shallow: true })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = async (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)

    await router.push(`${router.pathname.replace('[id]', `${id}`)}?tab=${newValue}`, undefined, { shallow: true })
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
                <InformationVariant sx={{ fontSize: '1.125rem' }} />
                <TabName>Information</TabName>
              </Box>
            }
          />
          <Tab
            value='website'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Web sx={{ fontSize: '1.125rem' }} />
                <TabName>Website</TabName>
              </Box>
            }
          />
          <Tab
            value='package'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <FileDocumentEditOutline sx={{ fontSize: '1.125rem' }} />
                <TabName>Package</TabName>
              </Box>
            }
          />
          <Tab
            value='live-stream'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <VideoCheck sx={{ fontSize: '1.125rem' }} />
                <TabName>Live Stream</TabName>
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
        <TabPanel sx={{ p: 0 }} value='package'>
          <TabPackage />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='live-stream'>
          <TabLiveStream />
        </TabPanel>
      </TabContext>
    </Card>
  )
}

EventDetail.acl = {
  action: 'read',
  subject: 'host-view'
}

export default EventDetail
