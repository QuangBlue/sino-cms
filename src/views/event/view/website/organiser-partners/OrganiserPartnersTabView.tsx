// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import React, { useCallback, useEffect, useState } from 'react'


import { useDispatch, useSelector } from 'react-redux'
import { useDebounce } from 'src/@core/utils/hooks'
import { ORG_PARTNER } from 'src/constants/headers'
import { AppDispatch, RootState } from 'src/store'
import { getOrganiserPartners, getPartnersType, organiserPartnerSlice } from 'src/store/event/view/website/organiserPartnerStore'
import { getHeaderByKey } from 'src/store/event/view/website/settingsStore'

import OrganiserPartnersActions from './OrganiserPartnersActions'
import OrganiserPartnersContent from './OrganiserPartnersContent'

const OrganiserPartnersTabView = () => {
  // ** Redux
  const dispatch = useDispatch<AppDispatch>()

  const store = useSelector((state: RootState) => state.eventDetail)
  const settingStore = useSelector((state: RootState) => state.settingWebsite)
  const [header, setHeader] = useState<any>({
    key: ORG_PARTNER,
    title: settingStore.header?.[0]?.title,
    isPublished: settingStore.header?.[0]?.isPublished || false
  })
  
  // States
  const [keyword, setKeyword] = useState<string>("");

  const debouncedValue = useDebounce<string>(keyword, 600);

  const onToggleOrganiserPartnerHeader = useCallback(
    (checked: boolean) => {
      setHeader({ ...header, isPublished: checked })
      dispatch(organiserPartnerSlice.actions.handleSetIsChange({ isDirty: true }))
    },

    [dispatch, header]
  )

  const handleChangeHeaderTitle = (value: string) => {
    setHeader({ ...header, title: value })
  }

  useEffect(() => {
    const header = {
      key: ORG_PARTNER,
      title: settingStore.header?.[0]?.title,
      isPublished: settingStore.header?.[0]?.isPublished || false
    }
    setHeader(header)
  }, [settingStore.header])


  useEffect(() => {
    dispatch(getPartnersType())
    if (store.eventData.id) {
      dispatch(getHeaderByKey({ eventId: store.eventData.id, key: ORG_PARTNER })) 
    }
  }, [dispatch, store.eventData.baseName, store.eventData.id ])


  useEffect(() => {
    if (store.eventData.id) { 
      dispatch(getOrganiserPartners({eventId: store.eventData.id, query: debouncedValue as string}))
    }
  }, [debouncedValue, dispatch, store.eventData.id])
  

  return (
    <Box sx={{ my: 4, mx: 4 }}>
      <Grid container spacing={6}>
        <Grid item xl={9} md={8} xs={12}>
          <OrganiserPartnersContent 
            title={header.title} 
            organiserPartnerHeader={header} 
            handleChangeHeaderTitle={handleChangeHeaderTitle} 
            setKeyword={setKeyword}
          />
        </Grid>
        <Grid item xl={3} md={4} xs={12}>
          <OrganiserPartnersActions 
            organiserPartnerHeader={header} 
            onToggleOrganiserPartnerHeader={onToggleOrganiserPartnerHeader} 
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default React.memo(OrganiserPartnersTabView)
