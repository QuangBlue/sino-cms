import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
import axiosClient from 'src/configs/axiosClient'
import { AlbumTypes, AddPhotoTypes } from 'src/types/website'

export const getAlbum = createAsyncThunk(
  'galleryWebsite/getAlbum',
  async (eventName: string) => {
    const response = await axiosClient.get(
      `gallery/album?eventName=${eventName}`
    )

    return response.data
  }
)

export const addAlbum = createAsyncThunk(
  'galleryWebsite/editHeader',
  async ({ eventName, params }: { eventName: string; params: AlbumTypes }) => {
    const response = await axiosClient.post(
      `gallery/album?eventName=${eventName}`,
      params
    )

    return response.data
  }
)

export const editAlbum = createAsyncThunk(
  'galleryWebsite/editAlbum',
  async ({ albumId, params }: { albumId: number; params: AlbumTypes }) => {
    const response = await axiosClient.put(`gallery/album/${albumId}`, params)

    return response.data
  }
)

export const addPhotos = createAsyncThunk(
  'galleryWebsite/addPhotos',
  async ({ albumId, params }: { albumId: number; params: AddPhotoTypes }) => {
    const response = await axiosClient.post(
      `gallery/album/photo?albumId=${albumId}`,
      { items: params }
    )

    return response.data
  }
)

export const getPhotosByAlbumId = createAsyncThunk(
  'galleryWebsite/getPhotosByAlbumId',
  async (albumId: number) => {
    const response = await axiosClient.get(
      `gallery/album/photo?albumId=${albumId}`
    )

    return response.data
  }
)

export const getVideos = createAsyncThunk(
  'galleryWebsite/getVideos',
  async (eventName: string) => {
    const response = await axiosClient.get(`video?eventName=${eventName}`)

    return response.data
  }
)

export const galleryWebsiteSlice = createSlice({
  name: 'galleryWebsite',
  initialState: {
    albums: [] as AlbumTypes[],
    isLoading: true,
    videos: [] as any[]
  },
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(getAlbum.pending, state => {
        state.isLoading = true
      })
      .addCase(getAlbum.fulfilled, (state, action) => {
        state.albums = action.payload.data
        state.isLoading = false
      })
      .addCase(getAlbum.rejected, state => {
        state.isLoading = false
      })
      .addCase(addAlbum.pending, state => {
        state.isLoading = true
      })
      .addCase(addAlbum.fulfilled, state => {
        toast.success('Album has been added')
        state.isLoading = false
      })
      .addCase(addAlbum.rejected, state => {
        state.isLoading = false
        toast.error('Something went wrong!')
      })
      .addCase(editAlbum.pending, state => {
        state.isLoading = true
      })
      .addCase(editAlbum.fulfilled, state => {
        toast.success('Album has been updated')
        state.isLoading = false
      })
      .addCase(editAlbum.rejected, state => {
        state.isLoading = false
        toast.error('Something went wrong!')
      })

      .addCase(getVideos.fulfilled, (state, action) => {
        state.videos = action.payload.data
      })
  }
})

export default galleryWebsiteSlice.reducer
