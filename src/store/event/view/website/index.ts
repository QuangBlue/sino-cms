import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosClient from 'src/configs/axiosClient'
import { SpeakerTypes } from 'src/types/website'

// ** Fetch Speaker
export const getSpeaker = createAsyncThunk('eventWebsite/getSpeaker', async (baseName: string) => {
  const response = await axiosClient.get(`speaker?lang=en&eventName=${baseName}`)

  return response.data
})

export const eventWebsiteSlice = createSlice({
  name: 'eventWebsite',
  initialState: {
    listSpeaker: [] as SpeakerTypes[],
    listUpdateSpeaker: [] as SpeakerTypes[],
    isLoading: false
  },
  reducers: {
    handlePageChange: state => {
      state.listSpeaker = [] as SpeakerTypes[]
      state.listUpdateSpeaker = [] as SpeakerTypes[]
      state.isLoading = false
    }
  },

  extraReducers: builder => {
    builder.addCase(getSpeaker.fulfilled, (state, action) => {
      state.listSpeaker = action.payload.data
      console.log(state.listSpeaker)
    })
  }
})

export default eventWebsiteSlice.reducer