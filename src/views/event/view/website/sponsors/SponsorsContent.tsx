import React, { useEffect, useCallback } from 'react'
import { styled, Tab } from '@mui/material'
import MuiTabList, { TabListProps } from '@mui/lab/TabList'
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'
import { SyntheticEvent, useState } from 'react'
import Sponsors from './Sponsors'
import SponsorshipOpportunities from './SponsorshipOpportunities'
import Grid from '@mui/material/Grid'
import { EditorState, ContentState, convertFromHTML } from 'draft-js'
import { convertToHTML } from 'draft-convert'

// ** Redux
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'
import {
  getHeaderByKey,
  editHeader
} from 'src/store/event/view/website/settingsStore'

import {
  getSponsorGroup,
  getSponsorSettings,
  editSponsorSettings,
  getSponsorsType,
  getSponsors
} from 'src/store/event/view/website/sponsorStore'
import SponsorsActions from './SponsorsActions'

import { SPONSOR } from 'src/constants/headers'

const SponsorsContent = () => {
  const sponsorStore = useSelector((state: RootState) => state.sponsorWebsite)
  const eventStore = useSelector((state: RootState) => state.eventDetail)
  const settingStore = useSelector((state: RootState) => state.settingWebsite)
  const dispatch = useDispatch<AppDispatch>()

  const { id, baseName } = eventStore?.eventData
  const { sponsorSettings } = sponsorStore

  const [tab, setTab] = useState<string>('sponsors')
  const [header, setHeader] = useState<any>({
    key: SPONSOR,
    title: settingStore.header?.[0]?.title || '',
    isPublished: settingStore.header?.[0]?.isPublished || false
  })

  useEffect(() => {
    const header = {
      key: SPONSOR,
      title: settingStore.header?.[0]?.title,
      isPublished: settingStore.header?.[0]?.isPublished || false
    }
    setHeader(header)
  }, [settingStore.header])

  //* Sponsor Settings
  const [value, setValue] = useState({
    title: '',
    description: EditorState.createEmpty(),
    contactInfo: EditorState.createEmpty()
  })

  const handleDefaultValue = () => {
    //* Description
    const blocksDescriptionFromHTML = convertFromHTML(
      sponsorSettings.description
    )
    const descriptionContent = ContentState.createFromBlockArray(
      blocksDescriptionFromHTML.contentBlocks,
      blocksDescriptionFromHTML.entityMap
    )
    const description = EditorState.createWithContent(descriptionContent)

    //* Contact Information
    const blocksContactFromHTML = convertFromHTML(sponsorSettings.contactInfo)
    const contactContent = ContentState.createFromBlockArray(
      blocksContactFromHTML.contentBlocks,
      blocksContactFromHTML.entityMap
    )
    const contactInfo = EditorState.createWithContent(contactContent)

    setValue({ title: sponsorSettings.title, description, contactInfo })
  }

  useEffect(() => {
    handleDefaultValue()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sponsorStore.sponsorSettings])

  useEffect(() => {
    if (id) {
      handleFetchingDate()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, dispatch])

  const handleFetchingDate = useCallback(() => {
    dispatch(getSponsorGroup(id))
    dispatch(getSponsorSettings(id))
    dispatch(getHeaderByKey({ eventId: id, key: SPONSOR }))
    dispatch(getSponsorsType(id))
    dispatch(getSponsors(baseName))
  }, [baseName, dispatch, id])

  const handleEditSponsorOpportunity = async () => {
    const params = {
      title: value.title,
      description: convertToHTML(value.description.getCurrentContent()),
      contactInfo: convertToHTML(value.contactInfo.getCurrentContent())
    }
    dispatch(editSponsorSettings({ eventId: id, params }))
  }

  const handleSave = () => {
    if (tab === 'sponsors') {
    }
    if (tab === 'sponsorship-opportunities') {
      handleEditSponsorOpportunity()
    }
    dispatch(editHeader({ eventId: id, params: [header] }))
  }

  const handleChangeValue = useCallback(
    (name: string, params: any) => {
      setValue({ ...value, [name]: params })
    },
    [value]
  )

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setTab(newValue)
  }

  const handleToggleSponsorHeader = useCallback(
    (checked: boolean) => {
      setHeader({ ...header, isPublished: checked })
    },
    [header]
  )

  const handleChangeHeaderTitle = (value: string) => {
    setHeader({ ...header, title: value })
  }

  return (
    <Grid container spacing={6}>
      <Grid item xl={9} md={8} xs={12}>
        <TabContext value={tab}>
          <TabList onChange={handleChange} aria-label='customized tabs example'>
            <Tab value='sponsors' label='Sponsors' />
            <Tab
              value='sponsorship-opportunities'
              label='Sponsorship Opportunities'
            />
          </TabList>
          <TabPanel value='sponsors' sx={{ p: 0, width: '100%' }}>
            <Sponsors
              handleChangeHeaderTitle={handleChangeHeaderTitle}
              headerTitle={header.title}
            />
          </TabPanel>
          <TabPanel
            value='sponsorship-opportunities'
            sx={{ p: 0, width: '100%' }}
          >
            <SponsorshipOpportunities
              title={value.title}
              description={value.description}
              contactInfo={value.contactInfo}
              handleChangeValue={handleChangeValue}
            />
          </TabPanel>
        </TabContext>
      </Grid>
      <Grid item xl={3} md={4} xs={12}>
        <SponsorsActions
          handleSave={handleSave}
          sponsorHeader={header}
          handleToggleSponsorHeader={handleToggleSponsorHeader}
          handleChangeLang={handleFetchingDate}
        />
      </Grid>
    </Grid>
  )
}

export default React.memo(SponsorsContent)

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
    paddingBottom: theme.spacing(2),
    marginBottom: theme.spacing(6)
  }
}))
