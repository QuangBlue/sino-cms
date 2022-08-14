import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
import axiosClient from 'src/configs/axiosClient'
import { AgendaTypes, AgendaDetailTypes } from 'src/types/website'

interface AddAgendaTypes {
  eventName: string
  params: AgendaTypes
}

export const getAgenda = createAsyncThunk('website/getAgenda', async (eventName: string) => {
  const response = await axiosClient.get(`agenda?eventName=${eventName}`)

  return response.data
})

export const addAgenda = createAsyncThunk('website/addAgenda', async ({ eventName, params }: AddAgendaTypes) => {
  const response = await axiosClient.post(`agenda?eventName=${eventName}`, params)

  return response.data
})

export const getAgendaDetail = createAsyncThunk('website/getAgendaDetail', async (agendaId: number) => {
  const response = await axiosClient.get(`agenda/${agendaId}/detail`)

  return response.data
})

export const addAgendaDetail = createAsyncThunk(
  'website/addAgendaDetail',
  async ({ agendaId, params }: { agendaId: number; params: AgendaDetailTypes }) => {
    const response = await axiosClient.post(`agenda/${agendaId}/detail}`, { items: params })

    return response.data
  }
)

// export const editHeader = createAsyncThunk(
//   'settingWebsite/editHeader',
//   async ({ eventId, params }: EditHeaderProps) => {
//     const response = await axiosClient.post(`header-page/event/${eventId}`, { items: params })

//     return response.data
//   }
// )

// export const getHeaderByKey = createAsyncThunk(
//   'settingWebsite/getHeaderByKey',
//   async ({ eventId, key }: { eventId: number; key: HeaderKey }) => {
//     const response = await axiosClient.get(`header-page/event/${eventId}?key=${key}`)

//     return response.data
//   }
// )

export const addDetailToAgendaById = createAction(
  'website/addDetailToAgendaById',
  ({ agendaId, params }: { agendaId: number; params: AgendaDetailTypes }) => ({
    payload: {
      agendaId,
      params
    }
  })
)

export const AgendaSlice = createSlice({
  name: 'website',
  initialState: {
    agendaList: [] as AgendaTypes[],
    isLoading: true,
    agendaDetail: [] as AgendaDetailTypes[],
    isFetchingAgendaDetail: false
  },
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(getAgenda.pending, state => {
        state.agendaList = []
        state.isLoading = true
      })
      .addCase(getAgenda.fulfilled, (state, action) => {
        state.agendaList = action.payload.data
        state.isLoading = false
      })
      .addCase(getAgenda.rejected, state => {
        state.isLoading = false
      })
      .addCase(addAgenda.pending, state => {
        state.isLoading = true
      })
      .addCase(addAgenda.fulfilled, (state, action) => {
        toast.success('Add new agenda successfully')
        state.agendaList = [...state.agendaList, action.payload]
        state.isLoading = false
      })
      .addCase(addAgenda.rejected, state => {
        state.isLoading = false
      })
      .addCase(getAgendaDetail.pending, state => {
        state.isFetchingAgendaDetail = true
      })
      .addCase(getAgendaDetail.fulfilled, (state, action) => {
        console.log('action', action)
        state.isFetchingAgendaDetail = false
        state.agendaDetail = { ...state.agendaDetail, [action.meta.arg]: action.payload.data }
      })
      .addCase(getAgendaDetail.rejected, state => {
        state.isFetchingAgendaDetail = false
      })
      .addCase(addAgendaDetail.pending, state => {
        state.isFetchingAgendaDetail = true
      })
      .addCase(addAgendaDetail.fulfilled, (state, action) => {
        toast.success('Add new agenda detail successfully')
        state.isFetchingAgendaDetail = false
        state.agendaDetail = action.payload.data
      })
      .addCase(addAgendaDetail.rejected, state => {
        state.isFetchingAgendaDetail = false
        toast.success('Something went wrong!')
      })
      .addCase(addDetailToAgendaById, (state, action) => {
        console.log('state', state)
        console.log('action', action)
      })
  }
})

export default AgendaSlice.reducer
