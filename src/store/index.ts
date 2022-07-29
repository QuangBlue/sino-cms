// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import agent from 'src/store/agent'
import company from 'src/store/company'
import agentDetail from 'src/store/agent/view'
import companyDetail from 'src/store/company/view'

export const store = configureStore({
  reducer: {
    agent,
    company,
    agentDetail,
    companyDetail
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
