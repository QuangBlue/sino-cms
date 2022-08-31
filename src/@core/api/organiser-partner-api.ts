import axiosClient from 'src/configs/axiosClient'

const updateOrganiserPartner = async (
  categoryId: number,
  eventId: number,
  params: any
) => {
  try {
    const response = await axiosClient.post(
      `/partner-category/${categoryId}/partner?eventId=${eventId}`,
      params
    )

    return response.data
  } catch (err) {
    return []
  }
}

export { updateOrganiserPartner }
