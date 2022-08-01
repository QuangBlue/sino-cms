// ** MUI Imports
import Grid from '@mui/material/Grid'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'
import { getSpeaker } from 'src/store/event/view/website'

import AddActions from './AddActions'
import SpeakerContent from './SpeakerContent'

const SpeakerTabView = () => {
  // ** Redux
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.eventDetail)

  useEffect(() => {
    dispatch(getSpeaker(store.eventData.baseName))
  }, [dispatch, store.eventData.baseName])

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xl={9} md={8} xs={12}>
          <SpeakerContent />
        </Grid>
        <Grid item xl={3} md={4} xs={12}>
          <AddActions />
        </Grid>
      </Grid>
    </>
  )
}

export default SpeakerTabView
