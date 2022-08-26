import axiosClient from 'src/configs/axiosClient'

// ** Includes Add , Edit, Delete Sponsorship Opportunities
const updateRegister = async (eventId: number, params: any) => {
  try {
    const response = await axiosClient.post(
      `/organisation/event/${eventId}`,
      params
    )

    return response.data
  } catch (err) {
    return []
  }
}

export { updateRegister }
