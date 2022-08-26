import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosClient from 'src/configs/axiosClient'

export const getRegisters = createAsyncThunk(
  'website/getRegisters',
  async (eventId: number) => {
    const response = await axiosClient.get(`/organisation/event/${eventId}`)

    return response.data
  }
)

export const RegisterSlice = createSlice({
  name: 'website',
  initialState: {
    registerList: [] as any[],
    isLoading: true
  },
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(getRegisters.pending, state => {
        state.registerList = []
        state.isLoading = true
      })
      .addCase(getRegisters.fulfilled, (state, action) => {
        state.registerList = action.payload
        state.isLoading = false
      })
      .addCase(getRegisters.rejected, state => {
        state.isLoading = false
      })
  }
})

export default RegisterSlice.reducer
