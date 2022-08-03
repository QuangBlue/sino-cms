import { EventMapTypes, EventTypes } from 'src/types/eventTypes'
import { createAsyncThunk, createSlice, Dispatch } from '@reduxjs/toolkit'
import axiosClient from 'src/configs/axiosClient'

// ** Third Party Imports
import toast from 'react-hot-toast'

interface EditEventDetail {
  payload: EventTypes
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

// ** Fetch Event Detail
export const fetchEventDetail = createAsyncThunk('eventDetail/fetchData', async (id: number, { dispatch }: Redux) => {
  const response = await axiosClient.get(`/event/${id}`)
  dispatch(getEventMap(response.data.data.baseName))

  return response.data
})

// ** Edit Event Detail
export const editEventDetail = createAsyncThunk(
  'event/editEventDetail',
  async (data: EditEventDetail, { getState, dispatch }: Redux) => {
    const { payload } = data

    const promise = axiosClient
      .put(`/event/${getState().eventDetail.eventData.id}`, {
        name: payload.name,
        address: payload.address,
        host: { email: payload.host.email }
      })
      .then(() => {
        dispatch(fetchEventDetail(getState().eventDetail.eventData.id))
      })

    toast.promise(promise, {
      loading: 'Request Update Event',
      success: 'Update Event Successfully',
      error: 'Error when Update Event'
    })
  }
)

// ** Delete Event
export const deleteEvent = createAsyncThunk('eventDetail/deleteEvent', async (eventID: number, { dispatch }: Redux) => {
  const promise = axiosClient.delete(`/event/${eventID}`).then(() => {
    dispatch(fetchEventDetail(eventID))
  })

  toast.promise(promise, {
    loading: 'Request Delete Event',
    success: 'Delete Event Successfully',
    error: 'Error when Delete Event'
  })
})

// ** Resume Event
export const resumeEvent = createAsyncThunk('eventDetail/resumeEvent', async (eventID: number, { dispatch }: Redux) => {
  const params = { status: true }
  const promise = axiosClient.put(`/event/${eventID}`, params).then(() => {
    dispatch(fetchEventDetail(eventID))
  })

  toast.promise(promise, {
    loading: 'Request Resume Event',
    success: 'Resume Event Successfully',
    error: 'Error when Resume Event'
  })
})

// ** Upload Event Map
export const uploadEventMap = createAsyncThunk(
  'eventDetail/uploadEventMap',
  async (file: File, { getState, dispatch }: Redux) => {
    const formData = new FormData()
    formData.append('files', file)
    try {
      const promise = await axiosClient.post(`upload/image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      const payload = {
        name: `map-${getState().eventDetail.eventData.baseName}`,
        imgUrl: promise.data.data[0]
      }
      const createEventMap = axiosClient
        .post(`/event-map?eventName=${getState().eventDetail.eventData.baseName}`, payload)
        .then(() => {
          dispatch(getEventMap(getState().eventDetail.eventData.baseName))
        })

      toast.promise(createEventMap, {
        loading: 'Request Upload Event Map',
        success: 'Upload Event Map Successfully',
        error: 'Error when Upload Event Map'
      })
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Unknow Error')
    }
  }
)

// ** Get Event Map

export const getEventMap = createAsyncThunk('eventDetail/uploadEventMap', async (eventName: string) => {
  const response = await axiosClient.get(`event-map?eventName=${eventName}`)

  return response.data
})

export const eventDetailSlice = createSlice({
  name: 'eventDetail',
  initialState: {
    eventData: {} as EventTypes,
    eventMap: [] as EventMapTypes[],
    isLoading: false
  },
  reducers: {
    handlePageChange: state => {
      state.eventData = {} as EventTypes
    }
  },

  extraReducers: builder => {
    builder
      .addCase(fetchEventDetail.pending, state => {
        state.isLoading = true
      })
      .addCase(fetchEventDetail.fulfilled, (state, action) => {
        state.isLoading = false
        state.eventData = action.payload.data
      })
      .addCase(getEventMap.fulfilled, (state, action) => {
        state.eventMap = action.payload?.data
      })
  }
})

export default eventDetailSlice.reducer
