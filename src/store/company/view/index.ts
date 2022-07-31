import { CreateEventPayload, EventTypes } from 'src/types/eventTypes'
import { createAsyncThunk, createSlice, Dispatch } from '@reduxjs/toolkit'
import axiosClient from 'src/configs/axiosClient'

// ** Third Party Imports
import toast from 'react-hot-toast'
import { CompanyTypes } from 'src/types/companyTypes'

interface EditCompanyDetail {
  id: number
  params: CompanyTypes | { status: boolean }
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

// ** Fetch Company Detail
export const fetchCompanyDetail = createAsyncThunk(
  'companyDetail/fetchData',
  async (id: number, { dispatch }: Redux) => {
    const response = await axiosClient.get(`/company/${id}`)
    dispatch(getEvent(response.data.baseName))

    return response
  }
)

// ** Edit Company Detail
export const editCompanyDetail = createAsyncThunk(
  'company/editCompanyDetail',
  async (data: EditCompanyDetail, { dispatch }: Redux) => {
    const { id, params } = data

    const promise = axiosClient.put(`/company/${id}`, params).then(() => {
      dispatch(fetchCompanyDetail(id))
    })

    toast.promise(promise, {
      loading: 'Request Update Company',
      success: 'Update Company Successfully',
      error: 'Error when Update Company'
    })
  }
)

// ** Get All Event
export const getEvent = createAsyncThunk(
  'companyDetail/getEvent',
  async (companyNumber: string | undefined, { getState }: Redux) => {
    const response = await axiosClient.get(
      `/event?companyName=${companyNumber ? companyNumber : getState().companyDetail.companyData.baseName}&status=${
        getState().companyDetail.status
      }`
    )

    return response.data
  }
)

// ** Create Event
export const createEvent = createAsyncThunk(
  'companyDetail/createEvent',
  async (data: CreateEventPayload, { getState, dispatch }: Redux) => {
    const { payload, handleClickCloseModal } = data

    const promise = axiosClient
      .post(`/event?companyName=${getState().companyDetail.companyData.baseName}`, payload)
      .then(() => {
        dispatch(fetchCompanyDetail(getState().companyDetail.companyData.id))
      })
      .then(async () => {
        dispatch(getEvent())
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

// ** Delete Event

export const deleteEvent = createAsyncThunk(
  'companyDetail/deleteEvent',
  async (eventID: number, { dispatch }: Redux) => {
    const promise = axiosClient.delete(`/event/${eventID}`).then(() => {
      dispatch(getEvent())
    })

    toast.promise(promise, {
      loading: 'Request Delete Event',
      success: 'Delete Event Successfully',
      error: 'Error when Delete Event'
    })
  }
)

// ** Resume Event
export const resumeEvent = createAsyncThunk(
  'companyDetail/resumeEvent',
  async (eventID: number, { dispatch }: Redux) => {
    const params = { status: true }
    const promise = axiosClient.put(`/event/${eventID}`, params).then(() => {
      dispatch(getEvent())
    })

    toast.promise(promise, {
      loading: 'Request Resume Event',
      success: 'Resume Event Successfully',
      error: 'Error when Resume Event'
    })
  }
)

export const companyDetailSlice = createSlice({
  name: 'companyDetail',
  initialState: {
    companyData: {} as CompanyTypes,
    listEvent: [] as EventTypes[],
    status: true,
    isLoading: false
  },
  reducers: {
    handlePageChange: state => {
      state.companyData = {} as CompanyTypes
      ;(state.listEvent = [] as EventTypes[]), (state.status = true), (state.isLoading = false)
    },
    handleChangeStatus: (state, { payload }) => {
      state.status = payload
    }
  },

  extraReducers: builder => {
    builder
      .addCase(fetchCompanyDetail.pending, state => {
        state.isLoading = true
      })
      .addCase(fetchCompanyDetail.fulfilled, (state, action) => {
        state.isLoading = false
        state.companyData = action.payload.data
      })
      .addCase(getEvent.fulfilled, (state, action) => {
        state.listEvent = action.payload.data
      })
  }
})

export default companyDetailSlice.reducer
