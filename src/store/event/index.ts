import { createAsyncThunk, createSlice, Dispatch } from '@reduxjs/toolkit'

// ** Axios
import axiosClient from 'src/configs/axiosClient'

// ** Third Party Imports
import toast from 'react-hot-toast'
import { EventTypes } from 'src/types/eventTypes'
import { CompanyTypes } from 'src/types/companyTypes'

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

export interface CreateEventPayload {
  params: {
    name: string
    baseName: string
    address: string
  }
  companyName: string
  agentId: number
  handleClickCloseModal: () => void
}

// ** Fetch Event
export const fetchEvent = createAsyncThunk('event/fetchData', async (agentId: number, { getState }: Redux) => {
  const response = await axiosClient.get(`/event?status=${getState().event.status}&agentId=${agentId}`)
  console.log(response.data)

  return response.data
})

// ** Delete Event
export const deleteEvent = createAsyncThunk(
  'companyDetail/deleteEvent',
  async (eventID: number, { dispatch }: Redux) => {
    const promise = axiosClient.delete(`/event/${eventID}`).then(() => {
      dispatch(fetchEvent(eventID))
    })

    toast.promise(promise, {
      loading: 'Request Delete Event',
      success: 'Delete Event Successfully',
      error: 'Error when Delete Event'
    })
  }
)

// ** Fetch Company By Agent
export const fetchCompany = createAsyncThunk('company/fetchData', async () => {
  const response = await axiosClient.get(`/company?status=true`)

  return response.data
})

// ** Resume Event
export const resumeEvent = createAsyncThunk(
  'companyDetail/resumeEvent',
  async (eventID: number, { dispatch }: Redux) => {
    const params = { status: true }
    const promise = axiosClient.put(`/event/${eventID}`, params).then(() => {
      dispatch(fetchEvent(eventID))
    })

    toast.promise(promise, {
      loading: 'Request Resume Event',
      success: 'Resume Event Successfully',
      error: 'Error when Resume Event'
    })
  }
)

// ** Create Event
export const createEvent = createAsyncThunk(
  'companyDetail/createEvent',
  async (data: CreateEventPayload, { dispatch }: Redux) => {
    const { params, handleClickCloseModal, companyName, agentId } = data

    const promise = axiosClient
      .post(`/event?companyName=${companyName}`, params)
      .then(() => {
        dispatch(fetchEvent(agentId))
      })
      .then(() => {
        handleClickCloseModal()
      })

    toast.promise(promise, {
      loading: 'Request Create Event',
      success: 'Create Event Successfully',
      error: 'Error when Create Event'
    })
  }
)

export const eventSlice = createSlice({
  name: 'company',
  initialState: {
    listEvent: [] as EventTypes[],
    listCompany: [] as CompanyTypes[],
    page: 0,
    pageSize: 10,
    total: 0,
    status: true,
    isLoading: false,
    isCreating: false,
    isDeleting: false
  },
  reducers: {
    handleChangeStatus: (state, { payload }) => {
      state.status = payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchEvent.pending, state => {
        state.isLoading = true
      })
      .addCase(fetchEvent.fulfilled, (state, action) => {
        state.isLoading = false
        state.total = action.payload.total
        state.listEvent = action.payload.data
      })
      .addCase(fetchCompany.fulfilled, (state, action) => {
        state.listCompany = action.payload.data
      })
  }
})

export default eventSlice.reducer
