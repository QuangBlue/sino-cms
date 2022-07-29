import { createAsyncThunk, createSlice, Dispatch } from '@reduxjs/toolkit'

// ** Axios
import axiosClient from 'src/configs/axiosClient'

// ** Third Party Imports
import toast from 'react-hot-toast'
import { CreateCompanyParams } from 'src/types/companyTypes'

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

interface CreateCompanyProps {
  params: CreateCompanyParams
  handleClickCloseModal: () => void
}

// ** Fetch Company
export const fetchCompany = createAsyncThunk('company/fetchData', async () => {
  const response = await axiosClient.get('/company?status=true')

  return response.data
})

// ** Add Company
export const createCompany = createAsyncThunk(
  'company/createCompany',
  async (props: CreateCompanyProps, { dispatch }: Redux) => {
    const { params, handleClickCloseModal } = props
    await axiosClient
      .post('/company', params)
      .then(() => {
        toast.success('Created Company Successfully')
        dispatch(fetchCompany())
        handleClickCloseModal()
      })
      .catch(error => {
        if (error.response) {
          toast.error(error.response.data.message)
        }
      })
  }
)

// ** Delete Agent
export const deleteCompany = createAsyncThunk('company/deleteCompany', async (id: number, { dispatch }: Redux) => {
  const promise = axiosClient.delete('/company/' + id).then(() => {
    dispatch(fetchCompany())
  })

  toast.promise(promise, {
    loading: 'Loading',
    success: 'Delete Company Successfully',
    error: 'Error when delete Agent'
  })
})

export const companySlice = createSlice({
  name: 'company',
  initialState: {
    listCompany: [],
    page: 0,
    pageSize: 10,
    total: 0,
    isLoading: false,
    isCreating: false,
    isDeleting: false
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCompany.pending, state => {
        state.isLoading = true
      })
      .addCase(fetchCompany.fulfilled, (state, action) => {
        state.isLoading = false
        state.total = action.payload.total
        state.listCompany = action.payload.data
      })
      .addCase(createCompany.pending, state => {
        state.isCreating = true
      })
      .addCase(createCompany.fulfilled, state => {
        state.isCreating = false
      })
      .addCase(deleteCompany.pending, state => {
        state.isDeleting = true
      })
      .addCase(deleteCompany.fulfilled, state => {
        state.isDeleting = false
      })
  }
})

export default companySlice.reducer
