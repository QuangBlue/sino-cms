import { createAsyncThunk, createSlice, Dispatch } from '@reduxjs/toolkit'

// ** Axios
import axiosClient from 'src/configs/axiosClient'
import { CreateAgentParams } from 'src/types/agentTypes'

// ** Third Party Imports
import toast from 'react-hot-toast'

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

interface CreateAgentProps {
  params: CreateAgentParams
  handleClickCloseModal: () => void
}

// ** Fetch Agent
export const fetchAgent = createAsyncThunk(
  'agent/fetchData',
  async (status: boolean | undefined, { getState }: Redux) => {
    const response = await axiosClient.get(`/agent?status=${getState().agent.status}`)

    return response.data
  }
)

// ** Add Agent
export const createAgent = createAsyncThunk(
  'agent/createAgent',
  async (props: CreateAgentProps, { dispatch }: Redux) => {
    const { params, handleClickCloseModal } = props
    await axiosClient
      .post('/agent', params)
      .then(() => {
        toast.success('Created Agent Successfully')
        dispatch(fetchAgent())
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
export const deleteAgent = createAsyncThunk('agent/deleteAgent', async (id: number, { dispatch }: Redux) => {
  const promise = axiosClient.delete('/agent/' + id).then(() => {
    dispatch(fetchAgent())
  })

  toast.promise(promise, {
    loading: 'Loading',
    success: 'Delete Agent Successfully',
    error: 'Error when delete Agent'
  })
})

// ** Resume Agent
export const resumeAgent = createAsyncThunk('agent/resumeAgent', async (id: number, { dispatch }: Redux) => {
  const promise = axiosClient.put(`/agent/${id}`, { status: true }).then(() => {
    dispatch(fetchAgent())
  })

  toast.promise(promise, {
    loading: 'Request Resume Agent',
    success: 'Resume Agent Successfully',
    error: 'Error when Resume Agent'
  })
})

export const agentSlice = createSlice({
  name: 'agent',
  initialState: {
    listAgent: [],
    statusAgent: true,
    page: 0,
    pageSize: 10,
    total: 0,
    status: true,
    isLoading: false,
    isCreating: false,
    isDeleting: false
  },
  reducers: {
    handleChangeStatus: (state, { payload }) => {
      state.status = payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAgent.pending, state => {
        state.isLoading = true
      })
      .addCase(fetchAgent.fulfilled, (state, action) => {
        state.isLoading = false
        state.total = action.payload.total
        state.listAgent = action.payload.data
      })
      .addCase(createAgent.pending, state => {
        state.isCreating = true
      })
      .addCase(createAgent.fulfilled, state => {
        state.isCreating = false
      })
      .addCase(deleteAgent.pending, state => {
        state.isDeleting = true
      })
      .addCase(deleteAgent.fulfilled, state => {
        state.isDeleting = false
      })
  }
})

export default agentSlice.reducer
