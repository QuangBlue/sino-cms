// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

// import { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { AppDispatch, RootState } from 'src/store'
// import { getSpeaker } from 'src/store/event/view/website/speakerStore'

import GalleryContent from './GalleryContent'

const GalleryTabView = () => {
  // ** Redux
  // const dispatch = useDispatch<AppDispatch>()
  // const store = useSelector((state: RootState) => state.eventDetail)

  // useEffect(() => {
  //   dispatch(getSpeaker(store.eventData.baseName))
  // }, [dispatch, store.eventData.baseName])

  return (
    <Box sx={{ my: 4, mx: 4 }}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <GalleryContent />
        </Grid>
        {/* <Grid item xl={3} md={4} xs={12}>
          <AboutUsActions />
        </Grid> */}
      </Grid>
    </Box>
  )
}

export default GalleryTabView
