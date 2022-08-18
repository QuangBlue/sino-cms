// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import AgendaActions from './AgendaActions'
import AgendaContent from './AgendaContent'

import { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'

import { getAgenda, addAgenda } from 'src/store/event/view/website/agendaStore'
import { speakerWebsiteSlice } from 'src/store/event/view/website/speakerStore'
import { getSpeaker } from 'src/store/event/view/website/speakerStore'

const AgendaTabView = () => {
  // ** Redux
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.eventDetail)
  const agendaStore = useSelector((state: RootState) => state.agendaWebsite)

  useEffect(() => {
    if (store.eventData.baseName) {
      dispatch(getAgenda(store.eventData.baseName))
      dispatch(getSpeaker(store.eventData.baseName))
    }
  }, [store.eventData.baseName, dispatch])

  return (
    <Box sx={{ my: 4, mx: 4 }}>
      <Grid container spacing={6}>
        <Grid item xl={9} md={8} xs={12}>
          <AgendaContent agendaList={agendaStore.agendaList} />
        </Grid>
        <Grid item xl={3} md={4} xs={12}>
          <AgendaActions />
        </Grid>
      </Grid>
    </Box>
  )
}

export default AgendaTabView
