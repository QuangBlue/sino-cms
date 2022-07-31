import { CreateEventPayload } from 'src/types/eventTypes'
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

// ** Create Event
export const createEvent = createAsyncThunk(
  'company/createEvent',
  async (data: CreateEventPayload, { getState, dispatch }: Redux) => {
    const { payload, handleClickCloseModal } = data

    const promise = axiosClient
      .post(`/event?companyName=${getState().companyDetail.companyData.baseName}`, payload)
      .then(async () => {
        await dispatch(fetchCompanyDetail(getState().companyDetail.companyData.id))
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
