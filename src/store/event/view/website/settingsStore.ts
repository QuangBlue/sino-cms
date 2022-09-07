import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
import axiosClient from 'src/configs/axiosClient'
import { SettingHeaderTypes, HeaderKey } from 'src/types/website'

export interface HeaderParams {
  key: string
  title: string
  content?: string
  isPublished: boolean
  header?: any
}

interface EditHeaderProps {
  eventId: number
  params: HeaderParams[]
}

export const getHeaders = createAsyncThunk(
  'settingWebsite/getHeaders',
  async (eventId: number) => {
    const response = await axiosClient.get(`header-page/event/${eventId}`)

    return response.data
  }
)

export const editHeader = createAsyncThunk(
  'settingWebsite/editHeader',
  async ({ eventId, params }: EditHeaderProps) => {
    const response = await axiosClient.post(`header-page/event/${eventId}`, {
      items: params
    })

    return response.data
  }
)

export const getHeaderByKey = createAsyncThunk(
  'settingWebsite/getHeaderByKey',
  async ({ eventId, key }: { eventId: number; key: HeaderKey }) => {
    const response = await axiosClient.get(
      `header-page/event/${eventId}?key=${key}`
    )

    return response.data
  }
)

export const settingWebsiteSlice = createSlice({
  name: 'settingWebsite',
  initialState: {
    headers: [] as SettingHeaderTypes[],
    isLoading: true,
    header: [] as SettingHeaderTypes[]
  },
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(getHeaders.pending, state => {
        state.headers = []
        state.isLoading = true
      })
      .addCase(getHeaders.fulfilled, (state, action) => {
        state.headers = action.payload
        state.isLoading = false
      })
      .addCase(getHeaders.rejected, state => {
        state.isLoading = false
      })

      .addCase(editHeader.pending, state => {
        state.isLoading = true
      })
      .addCase(editHeader.fulfilled, (state, action) => {
        toast.success('Update headers successfully!')
        state.headers = action.payload
        state.isLoading = false
      })
      .addCase(editHeader.rejected, state => {
        toast.success('Something went wrong!')
        state.isLoading = false
      })

      .addCase(getHeaderByKey.pending, state => {
        state.header = []
        state.isLoading = true
      })
      .addCase(getHeaderByKey.fulfilled, (state, action) => {
        state.header = action.payload
        state.isLoading = false
      })
      .addCase(getHeaderByKey.rejected, state => {
        state.isLoading = false
      })
  }
})

export default settingWebsiteSlice.reducer
