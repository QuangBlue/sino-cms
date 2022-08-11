import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
import axiosClient from 'src/configs/axiosClient'
import { SettingHeaderTypes } from 'src/types/website'

export interface EditHeaderParams {
  key: string
  title: string
  content: string
  isPublished: boolean
  header: any
}

interface EditHeaderProps {
  eventId: number
  params: EditHeaderParams
}

export const getHeaders = createAsyncThunk('settingWebsite/getHeaders', async (eventId: number) => {
  const response = await axiosClient.get(`header-page/event/${eventId}`)

  return response.data
})

export const editHeader = createAsyncThunk(
  'settingWebsite/editHeader',
  async ({ eventId, params }: EditHeaderProps) => {
    const response = await axiosClient.post(`header-page/event/${eventId}`, { items: params })

    return response.data
  }
)

export const settingWebsiteSlice = createSlice({
  name: 'settingWebsite',
  initialState: {
    headers: [] as SettingHeaderTypes[],
    isLoading: true
  },
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(getHeaders.pending, state => {
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
  }
})

export default settingWebsiteSlice.reducer
