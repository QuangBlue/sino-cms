// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import agent from 'src/store/agent'
import event from 'src/store/event'
import company from 'src/store/company'
import eventDetail from 'src/store/event/view'
import agentDetail from 'src/store/agent/view'
import companyDetail from 'src/store/company/view'

// ** Website Reducers
import speakerWebsite from 'src/store/event/view/website/speakerStore'
import settingWebsite from 'src/store/event/view/website/settingsStore'
import agendaWebsite from 'src/store/event/view/website/agendaStore'
import galleryWebsite from 'src/store/event/view/website/galleryStore'

export const store = configureStore({
  reducer: {
    agent,
    event,
    company,
    eventDetail,
    agentDetail,
    companyDetail,
    speakerWebsite,
    settingWebsite,
    agendaWebsite,
    galleryWebsite
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
