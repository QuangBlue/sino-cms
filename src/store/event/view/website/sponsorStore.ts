import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
import axiosClient from 'src/configs/axiosClient'
import { SponsorGroup, SponsorSettings, SponsorShip } from 'src/types/website'

export const getSponsorGroup = createAsyncThunk(
  'sponsorWebsite/getSponsorGroup',
  async (eventId: number) => {
    const response = await axiosClient.get(`sponsor-group/event/${eventId}`)

    return response.data
  }
)

export const addSponsorGroup = createAsyncThunk(
  'website/addSponsorGroup',
  async ({
    eventId,
    params
  }: {
    eventId: number
    params: { name: string }
  }) => {
    const response = await axiosClient.post(
      `sponsor-group/event/${eventId}`,
      params
    )

    return response.data
  }
)

export const editSponsorGroup = createAsyncThunk(
  'website/editSponsorGroup',
  async ({
    groupId,
    params
  }: {
    groupId: number
    params: { name: string }
  }) => {
    const response = await axiosClient.put(`sponsor-group/${groupId}`, params)

    return response.data
  }
)

export const deleteSponsorGroup = createAsyncThunk(
  'sponsorWebsite/deleteSponsorGroup',
  async (groupId: number) => {
    const response = await axiosClient.delete(`sponsor-group/${groupId}`)

    return response.data
  }
)

//* Get Sponsor Title , Description, Contact

export const getSponsorSettings = createAsyncThunk(
  'sponsorWebsite/getSponsorSettings',
  async (eventId: number) => {
    const response = await axiosClient.get(`sponsor-settings/event/${eventId}`)

    return response.data
  }
)

export const editSponsorSettings = createAsyncThunk(
  'sponsorWebsite/editSponsorSettings',
  async ({ eventId, params }: { eventId: number; params: SponsorSettings }) => {
    const response = await axiosClient.post(
      `sponsor-settings/event/${eventId}`,
      params
    )

    return response.data
  }
)
export const getSponsors = createAsyncThunk(
  'sponsorWebsite/getSponsors',
  async (eventName: string) => {
    const response = await axiosClient.get(
      `sponsor-level?eventName=${eventName}`
    )

    return response.data
  }
)

export const getSponsorsType = createAsyncThunk(
  'sponsorWebsite/getSponsorsType',
  async (eventId: number) => {
    const response = await axiosClient.get(`sponsor-level/event/${eventId}`)

    return response.data
  }
)

export const sponsorWebsiteSlice = createSlice({
  name: 'sponsorWebsite',
  initialState: {
    sponsorGroup: [] as SponsorGroup[],
    isLoading: true,
    sponsorSettings: {
      title: '',
      description: '',
      contactInfo: ''
    } as SponsorSettings,
    sponsorsType: [] as SponsorShip[],
    sponsors: [] as any[]
  },
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(getSponsorGroup.pending, state => {
        state.isLoading = true
      })
      .addCase(getSponsorGroup.fulfilled, (state, action) => {
        state.sponsorGroup = action.payload
        state.isLoading = false
      })
      .addCase(getSponsorGroup.rejected, state => {
        state.isLoading = false
      })
      .addCase(addSponsorGroup.pending, state => {
        state.isLoading = true
      })
      .addCase(addSponsorGroup.fulfilled, (state, action) => {
        state.sponsorGroup = [...state.sponsorGroup, action.payload]
        state.isLoading = false
      })
      .addCase(addSponsorGroup.rejected, state => {
        state.isLoading = false
        toast.error('Something went wrong!')
      })
      .addCase(editSponsorGroup.pending, state => {
        state.isLoading = true
      })
      .addCase(editSponsorGroup.fulfilled, state => {
        toast.success('Update Sponsor Group successfully!')
        state.isLoading = false
      })
      .addCase(editSponsorGroup.rejected, state => {
        state.isLoading = false
        toast.error('Something went wrong!')
      })
      .addCase(deleteSponsorGroup.pending, state => {
        state.isLoading = true
      })
      .addCase(deleteSponsorGroup.fulfilled, (state, action) => {
        state.isLoading = false
        state.sponsorGroup = state.sponsorGroup.filter(
          group => group.id !== action.meta.arg
        )
        toast.success('Delete Sponsor Group successfully!')
      })
      .addCase(deleteSponsorGroup.rejected, state => {
        state.isLoading = false
        toast.error('Something went wrong!')
      })
      .addCase(getSponsorSettings.pending, state => {
        state.sponsorSettings = { title: '', description: '', contactInfo: '' }
        state.isLoading = true
      })
      .addCase(getSponsorSettings.fulfilled, (state, action) => {
        state.sponsorSettings = action.payload
        state.isLoading = false
      })
      .addCase(getSponsorSettings.rejected, state => {
        state.isLoading = false
      })
      .addCase(editSponsorSettings.fulfilled, () => {
        toast.success('Update Sponsorship Opportunities successfully!')
      })
      .addCase(editSponsorSettings.rejected, () => {
        toast.error('Something went wrong!')
      })
      .addCase(getSponsorsType.fulfilled, (state, action) => {
        state.sponsorsType = action.payload
      })
      .addCase(getSponsors.fulfilled, (state, action) => {
        state.sponsors = action.payload
      })
  }
})

export default sponsorWebsiteSlice.reducer
