import { createAsyncThunk, createSlice, Dispatch } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosClient from "src/configs/axiosClient";
import { HotelTypes } from "src/types/hotelTypes";

interface Redux {
  getState: any,
  dispatch: Dispatch<any>
}


export interface EditHotelParams {
  id: number
  params: HotelTypes | { status: boolean }
}

// ** Fetch Hotel 
export const fetchHotel = createAsyncThunk(
  'hotel/fetchData',
 async (query:string | undefined, {getState}: Redux ) => {
  const response = await axiosClient.get(`/hotel?status=${getState().hotel.status}&keyword=${query ? query : ''}`);

  return response.data
 }
)

// ** Create Hotel
export const createHotel = createAsyncThunk(
  'hotel/createHotel',
  async (props: any, {dispatch}: Redux) => {
    const {params, handleClickCloseModal} = props
    await axiosClient
      .post("/hotel", params)
      .then(() => {
        toast.success('Created Hotel Successfully')
        dispatch(fetchHotel())
        handleClickCloseModal()
      })
      .catch(error => {
        if (error.response) {
          toast.error(error.response.data.message)
        }
      })
  }
)

// ** Delete Hotel
export const deleteHotel = createAsyncThunk('Hotel/deleteHotel', async (id: number, { dispatch }: Redux) => {
  const promise = axiosClient.delete('/hotel/' + id).then(() => {
    dispatch(fetchHotel())
  })

  toast.promise(promise, {
    loading: 'Loading',
    success: 'Delete Hotel Successfully',
    error: 'Error when delete Hotel'
  })
})

// ** Resume Hotel
export const resumeHotel = createAsyncThunk('hotel/resumeHotel', async (id: number, { dispatch }: Redux) => {
  const promise = axiosClient.put(`/hotel/${id}`, { status: true }).then(() => {
    dispatch(fetchHotel())
  })

  toast.promise(promise, {
    loading: 'Request Resume Hotel',
    success: 'Resume Hotel Successfully',
    error: 'Error when Resume Hotel'
  })
})

// ** Edit Hotel Detail
export const editHotel = createAsyncThunk(
  'hotel/editHotel',
  async (data: any, {dispatch}: Redux) => {
    const { id, params } = data

    const promise = axiosClient.put(`/hotel/${id}`, params).then((res) => {
      if (res?.data) {
        dispatch(fetchHotel())
      }
    })

    toast.promise(promise, {
      loading: 'Request Update Hotel',
      success: 'Update Hotel Successfully',
      error: 'Error when Update Hotel'
    })
  }
)

export const hotelSlice = createSlice({
  name: "hotel",
  initialState: {
    listHotel: [] as HotelTypes[],
    statusHotel: true,
    page: 0,
    pageSize: 10,
    total: 0,
    status: true,
    isLoading: false,
    isCreateting: false,
    isDeleting: false
  },
  reducers: {
    handleChangeStatus: (state, { payload }) => {
      state.status = payload;
    },
    handlePageChange: (state) => {
      state.listHotel = [] as HotelTypes[]
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchHotel.pending, state => {
        state.isLoading = true
      })
      .addCase(fetchHotel.fulfilled, (state, action) => {
        state.isLoading = false
        state.total = action.payload.total
        state.listHotel = action.payload.data
      })
      .addCase(createHotel.pending, state => {
        state.isCreateting = true
      })
      .addCase(createHotel.fulfilled, state => {
        state.isCreateting = false
      })
      .addCase(deleteHotel.pending, state => {
        state.isDeleting = true
      })
      .addCase(deleteHotel.fulfilled, state => {
        state.isDeleting = false
      })
  }
})

export default hotelSlice.reducer