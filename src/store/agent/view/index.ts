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
export const fetchAgentDetail = createAsyncThunk('agentDetail/fetchData', async (id: number) => {
  const response = await axiosClient.get(`/agent/${id}`)

  return response
})

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
