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
export const fetchCompanyDetail = createAsyncThunk('companyDetail/fetchData', async (id: number) => {
  const response = await axiosClient.get(`/company/${id}`)

  return response
})

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

export const companyDetailSlice = createSlice({
  name: 'companyDetail',
  initialState: {
    companyData: {} as CompanyTypes,
    isLoading: false
  },
  reducers: {
    handlePageChange: state => {
      state.companyData = {} as CompanyTypes
      state.isLoading = false
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
  }
})

export default companyDetailSlice.reducer
