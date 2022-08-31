import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
import axiosClient from 'src/configs/axiosClient'
import { PartnersType } from 'src/types/website'

// interface Redux {
//   getState: any
//   dispatch: Dispatch<any>
// }

export const getPartnersType = createAsyncThunk(
  'organiserPartnerWebsite/getPartnersType',
  async () => {
    const response = await axiosClient.get(`/partner-category`)

    return response.data
  }
)

export const getOrganiserPartners = createAsyncThunk(
  'organiserPartnerWebsite/getOrganiserPartners',
  async () => {
    const response = await axiosClient.get(`/partner-category/with-partners`)

    return response.data
  }
)

export const addOrganiserPartners = createAsyncThunk(
  'organiserPartnerWebsite/addOrganiserPartners',
  async ({ categoryId, params }: { categoryId: number; params: any }) => {
    const response = await axiosClient.post(
      `/partner-category/${categoryId}/partner`,
      params
    )

    return response.data
  }
)

export const organiserPartnerSlice = createSlice({
  name: 'organiserPartnerWebsite',
  initialState: {
    listOrganiserPartner: [],
    listPartnerType: [] as PartnersType[],
    organiserPartnerGroup: [],
    isLoading: true,
    isChange: false
  },
  reducers: {
    handleSetIsChange: (state, { payload }) => {
      state.isChange = payload.isDirty
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getPartnersType.pending, state => {
        state.isLoading = true
      })
      .addCase(getPartnersType.fulfilled, (state, action) => {
        state.listPartnerType = action.payload
        state.isLoading = false
      })
      .addCase(getOrganiserPartners.pending, state => {
        state.isLoading = false
      })
      .addCase(getOrganiserPartners.fulfilled, (state, action) => {
        state.listOrganiserPartner = action.payload
        state.isLoading = true
      })
      .addCase(addOrganiserPartners.pending, state => {
        state.isLoading = false
      })
      .addCase(addOrganiserPartners.fulfilled, (state, action) => {
        state.organiserPartnerGroup = action.payload
        state.isLoading = true
      })
      .addCase(addOrganiserPartners.rejected, state => {
        state.isLoading = false
        toast.error('Something went wrong!')
      })
  }
})

export default organiserPartnerSlice.reducer
