import { createAsyncThunk, createSlice, Dispatch } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
import axiosClient from 'src/configs/axiosClient'
import { SpeakerTypes } from 'src/types/website'

interface CreateSpeakerProps {
  eventName: string
  params: SpeakerTypes
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

// ** Fetch Speaker
export const getSpeaker = createAsyncThunk('speakerWebsite/getSpeaker', async (baseName: string) => {
  const response = axiosClient.get(`speaker?lang=en&eventName=${baseName}`)

  return response
})

// ** Create Speaker
export const createSpeaker = async (data: CreateSpeakerProps) => {
  const { eventName, params } = data

  return axiosClient.post(`speaker?eventName=${eventName}`, params)
}

// ** Upload Avarta
export const uploadAvarta = async (file: File) => {
  const formData = new FormData()
  formData.append('files', file)
  try {
    const promise = await axiosClient.post(`upload/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    return { success: true, data: promise.data.data[0] }
  } catch (err) {
    return { success: false }
  }
}

export const updateSpeaker = async (speaker: SpeakerTypes) => {
  return axiosClient.put(`speaker/${speaker.id}`, speaker)
}

export const deleteSpeaker = async (id: number) => {
  try {
    await axiosClient.delete(`speaker/${id}`)

    return true
  } catch (err) {
    console.log(err)

    return false
  }
}

// ** Save Speaker
export const handleSaveSpeaker = createAsyncThunk(
  'speakerWebsite/saveSpeaker',
  async (listSpeaker: SpeakerTypes[], { getState, dispatch }: Redux) => {
    const lp = getState().speakerWebsite.listSpeaker
    const ld = getState().speakerWebsite.listDeleteSpeaker

    const promises = listSpeaker.map(async speaker => {
      const find: SpeakerTypes = lp.find((r: SpeakerTypes) => r.id === speaker.id)

      if (
        speaker.id != 0 &&
        (find.avatar != speaker.avatar ||
          find.name != speaker.name ||
          find.jobTitle != speaker.jobTitle ||
          find.biography != speaker.biography)
      ) {
        await updateSpeaker(speaker)
      } else if (speaker.id == 0) {
        await createSpeaker({ eventName: getState().eventDetail.eventData.baseName, params: speaker })
      }
    })

    if (ld.length > 0) {
      await Promise.all(
        ld.map(async (id: number) => {
          await deleteSpeaker(id)
        })
      )
    }

    const load = Promise.all(promises)

    toast
      .promise(load, {
        loading: 'Loading',
        success: 'Save Successfully',
        error: 'Error save'
      })
      .then(() => {
        dispatch(getSpeaker(getState().eventDetail.eventData.baseName))
      })
  }
)

export const speakerWebsiteSlice = createSlice({
  name: 'speakerWebsite',
  initialState: {
    listSpeaker: [] as SpeakerTypes[],
    listDeleteSpeaker: [] as number[],
    isLoading: true,
    isChange: false
  },
  reducers: {
    handlePageChange: state => {
      state.listSpeaker = [] as SpeakerTypes[]
      state.listDeleteSpeaker = [] as number[]
      state.isLoading = true
    },
    handleAddDeleteSpeaker: (state, { payload }) => {
      const r = state.listDeleteSpeaker.some(item => item === payload.id)
      if (!r) state.listDeleteSpeaker.push(payload.id)
    },
    handleSetIsChange: (state, { payload }) => {
      state.isChange = payload.isDirty
    }
  },

  extraReducers: builder => {
    builder
      .addCase(getSpeaker.pending, state => {
        state.isLoading = true
      })
      .addCase(getSpeaker.fulfilled, (state, action) => {
        state.listSpeaker = action.payload.data.data.sort((a: SpeakerTypes, b: SpeakerTypes) => b.id - a.id)
        state.isLoading = false
      })
      .addCase(getSpeaker.rejected, state => {
        state.isLoading = false
      })
  }
})

export default speakerWebsiteSlice.reducer
