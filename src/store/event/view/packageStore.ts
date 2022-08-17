import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosClient from 'src/configs/axiosClient'
import { PackageTypes } from 'src/types/eventTypes'

// interface Redux {
//   getState: any
//   dispatch: Dispatch<any>
// }

export const getPackage = createAsyncThunk('fetchPackage', async (eventName: string) => {
  const response = await axiosClient.get(`/package?eventName=${eventName}`)

  return response.data
})

export const packageSlice = createSlice({
  name: 'packageEvent',
  initialState: {
    packages: [] as PackageTypes[],

    isLoading: false
  },
  reducers: {
    handlePageChange: state => {
      state.packages = [] as PackageTypes[]
    }
  },

  extraReducers: builder => {
    builder
      .addCase(getPackage.pending, state => {
        state.isLoading = true
      })
      .addCase(getPackage.fulfilled, (state, action) => {
        state.isLoading = false
        state.packages = action.payload.data
      })
  }
})

export default packageSlice.reducer
