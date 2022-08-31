// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import agent from 'src/store/agent'
import event from 'src/store/event'
import company from 'src/store/company'
import hotel from 'src/store/hotel'
import eventDetail from 'src/store/event/view/informationStore'
import agentDetail from 'src/store/agent/view'
import companyDetail from 'src/store/company/view'
import packageEvent from 'src/store/event/view/packageStore'

// ** Website Reducers
import speakerWebsite from 'src/store/event/view/website/speakerStore'
import settingWebsite from 'src/store/event/view/website/settingsStore'
import agendaWebsite from 'src/store/event/view/website/agendaStore'
import galleryWebsite from 'src/store/event/view/website/galleryStore'
import sponsorWebsite from 'src/store/event/view/website/sponsorStore'
import organiserPartnerWebsite from 'src/store/event/view/website/organiserPartnerStore'

export const store = configureStore({
  reducer: {
    agent,
    event,
    company,
    hotel,
    eventDetail,
    agentDetail,
    packageEvent,
    companyDetail,
    speakerWebsite,
    settingWebsite,
    agendaWebsite,
    galleryWebsite,
    sponsorWebsite,
    organiserPartnerWebsite
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
