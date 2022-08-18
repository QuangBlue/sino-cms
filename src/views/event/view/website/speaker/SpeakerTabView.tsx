// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'
import { getSpeaker } from 'src/store/event/view/website/speakerStore'
import { speakerWebsiteSlice } from 'src/store/event/view/website/speakerStore'

import { getHeaderByKey } from 'src/store/event/view/website/settingsStore'
import { SPEAKER } from 'src/constants/headers'

import SpeakerActions from './SpeakerActions'
import SpeakerContent from './SpeakerContent'

const SpeakerTabView = () => {
  // ** Redux
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.eventDetail)
  const settingStore = useSelector((state: RootState) => state.settingWebsite)

  const [header, setHeader] = useState<any>({
    key: SPEAKER,
    title: 'Speaker',
    isPublished: settingStore.header?.[0]?.isPublished || false
  })

  useEffect(() => {
    const header = {
      key: SPEAKER,
      title: 'Speaker',
      isPublished: settingStore.header?.[0]?.isPublished || false
    }
    setHeader(header)
  }, [settingStore.header])

  const handleToggleSpeakerHeader = useCallback(
    (checked: boolean) => {
      setHeader({ ...header, isPublished: checked })
      dispatch(speakerWebsiteSlice.actions.handleSetIsChange({ isDirty: true }))
    },

    [dispatch, header]
  )

  useEffect(() => {
    dispatch(getSpeaker(store.eventData.baseName))
    dispatch(getHeaderByKey({ eventId: store.eventData.id, key: SPEAKER }))
  }, [dispatch, store.eventData.baseName, store.eventData.id])

  return (
    <Box sx={{ my: 4, mx: 4 }}>
      <Grid container spacing={6}>
        <Grid item xl={9} md={8} xs={12}>
          <SpeakerContent speakerHeader={header} />
        </Grid>
        <Grid item xl={3} md={4} xs={12}>
          <SpeakerActions speakerHeader={header} handleToggleSpeakerHeader={handleToggleSpeakerHeader} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default SpeakerTabView
