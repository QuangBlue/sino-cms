import { createAsyncThunk, createSlice, Dispatch } from '@reduxjs/toolkit'
import axiosClient from 'src/configs/axiosClient'
import { AgentTypes } from 'src/types/agentTypes'

// ** Third Party Imports
import toast from 'react-hot-toast'

interface EditAgentDetail {
  id: number
  params: AgentTypes | { status: boolean }
  isChangePassword?: boolean
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

// ** Fetch Agent Detail
export const fetchAgentDetail = createAsyncThunk(
  'agentDetail/fetchData',
  async (id: number) => {
    const response = await axiosClient.get(`/agent/${id}`)

    return response
  }
)

// ** Edit Agent Detail
export const editAgentDetail = createAsyncThunk(
  'agent/editAgentDetail',
  async (data: EditAgentDetail, { dispatch }: Redux) => {
    const { id, params, isChangePassword } = data

    const promise = axiosClient.put(`/agent/${id}`, params).then(() => {
      if (!isChangePassword) {
        dispatch(fetchAgentDetail(id))
      }
    })

    if (isChangePassword) {
      toast.promise(promise, {
        loading: 'Request Change Password',
        success: 'Change Password Successfully',
        error: 'Error when Change Password'
      })
    } else {
      toast.promise(promise, {
        loading: 'Request Edit Agent',
        success: 'Edit Agent Successfully',
        error: 'Error when edit Agent'
      })
    }
  }
)

// ** Delete Company
export const deleteCompany = createAsyncThunk(
  'company/deleteCompany',
  async (id: number, { dispatch, getState }: Redux) => {
    const promise = axiosClient.delete('/company/' + id).then(() => {
      dispatch(fetchAgentDetail(getState().agentDetail.agentData.id))
    })

    toast.promise(promise, {
      loading: 'Loading',
      success: 'Delete Company Successfully',
      error: 'Error when delete Agent'
    })
  }
)

// ** Resume Company
export const resumeCompany = createAsyncThunk(
  'company/resumeCompany',
  async (id: number, { dispatch, getState }: Redux) => {
    const promise = axiosClient
      .put(`/company/${id}`, { status: true })
      .then(() => {
        dispatch(fetchAgentDetail(getState().agentDetail.agentData.id))
      })

    toast.promise(promise, {
      loading: 'Request Resume Company',
      success: 'Resume Company Successfully',
      error: 'Error when Resume Company'
    })
  }
)

// ** Delete Event
export const deleteEvent = createAsyncThunk(
  'companyDetail/deleteEvent',
  async (eventID: number, { dispatch, getState }: Redux) => {
    const promise = axiosClient.delete(`/event/${eventID}`).then(() => {
      dispatch(fetchAgentDetail(getState().agentDetail.agentData.id))
    })

    toast.promise(promise, {
      loading: 'Request Delete Event',
      success: 'Delete Event Successfully',
      error: 'Error when Delete Event'
    })
  }
)

// ** Resume Event
export const resumeEvent = createAsyncThunk(
  'companyDetail/resumeEvent',
  async (eventID: number, { dispatch, getState }: Redux) => {
    const params = { status: true }
    const promise = axiosClient.put(`/event/${eventID}`, params).then(() => {
      dispatch(fetchAgentDetail(getState().agentDetail.agentData.id))
    })

    toast.promise(promise, {
      loading: 'Request Resume Event',
      success: 'Resume Event Successfully',
      error: 'Error when Resume Event'
    })
  }
)

export const agentDetailSlice = createSlice({
  name: 'agentDetail',
  initialState: {
    agentData: {} as AgentTypes,
    isLoading: false
  },
  reducers: {
    handlePageChange: state => {
      state.agentData = {} as AgentTypes
      state.isLoading = false
    }
  },

  extraReducers: builder => {
    builder
      .addCase(fetchAgentDetail.pending, state => {
        state.isLoading = true
      })
      .addCase(fetchAgentDetail.fulfilled, (state, action) => {
        state.isLoading = false
        state.agentData = action.payload.data
      })

    //     .addCase(createAgent.pending, state => {
    //       state.isCreating = true
    //     })
    //     .addCase(createAgent.fulfilled, state => {
    //       state.isCreating = false
    //     })
    //     .addCase(deleteAgent.pending, state => {
    //       state.isDeleting = true
    //     })
    //     .addCase(deleteAgent.fulfilled, state => {
    //       state.isDeleting = false
    //     })
  }
})

export default agentDetailSlice.reducer
