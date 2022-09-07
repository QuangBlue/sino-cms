import { createAsyncThunk, createSlice, Dispatch } from '@reduxjs/toolkit'
import axiosClient from 'src/configs/axiosClient'
import {
  CreatePackageParams,
  DeletePackageParams,
  PackageTypes,
  ResumePackageParams,
  UpdatePackageParams
} from 'src/types/eventTypes'

// ** Third Party Imports
import toast from 'react-hot-toast'

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

export const getPackage = createAsyncThunk(
  'fetchPackage',
  async (eventName: string) => {
    const response = await axiosClient.get(`/package?eventName=${eventName}`)

    return response.data
  }
)

export const createPackage = createAsyncThunk(
  'createPackage',
  async (props: CreatePackageParams, { dispatch }: Redux) => {
    await axiosClient
      .post(`/package?eventName=${props.eventName}`, props.params)
      .then(() => {
        toast.success('Created Package Successfully')
        dispatch(getPackage(props.eventName))
        props.handleClickCloseModal()
      })
      .catch(error => {
        if (error.response) {
          toast.error(error.response.data.message)
        }
      })
  }
)

export const updatePackage = createAsyncThunk(
  'updatePackage',
  async (props: UpdatePackageParams, { dispatch }: Redux) => {
    await axiosClient
      .put(`/package/${props.packageId}`, props.params)
      .then(() => {
        toast.success('Update Successfully')
        dispatch(getPackage(props.eventName))
        props.handleClickCloseModal()
      })
      .catch(error => {
        if (error.response) {
          toast.error(error.response.data.message)
        }
      })
  }
)

export const resumePackage = createAsyncThunk(
  'updatePackage',
  async (props: ResumePackageParams, { dispatch }: Redux) => {
    await axiosClient
      .put(`/package/${props.packageId}`, { status: true })
      .then(() => {
        toast.success('Resume Successfully')
        dispatch(getPackage(props.eventName))
        props.handleClickCloseModal()
      })
      .catch(error => {
        if (error.response) {
          toast.error(error.response.data.message)
        }
      })
  }
)

export const deletePackage = createAsyncThunk(
  'deletePackage',
  async (props: DeletePackageParams, { dispatch }: Redux) => {
    await axiosClient
      .delete(`/package/${props.packageId}`)
      .then(() => {
        toast.success('Delete Successfully')
        dispatch(getPackage(props.eventName))
        props.handleClickCloseModal()
      })
      .catch(error => {
        if (error.response) {
          toast.error(error.response.data.message)
        }
      })
  }
)

export const addPricePackage = createAsyncThunk(
  'addPricePackage',
  async (props: CreatePackageParams, { dispatch }: Redux) => {
    await axiosClient
      .post(`/package?eventName=${props.eventName}`, props.params)
      .then(() => {
        toast.success('Add Price Package Successfully')
        dispatch(getPackage(props.eventName))
        props.handleClickCloseModal()
      })
      .catch(error => {
        if (error.response) {
          toast.error(error.response.data.message)
        }
      })
  }
)

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
