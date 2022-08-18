import axiosClient from 'src/configs/axiosClient'

// ** Includes Add , Edit, Delete Sponsorship Opportunities
const updateSponsorShip = async (groupId: number, params: any) => {
  try {
    const response = await axiosClient.post(
      `/sponsor-group/${groupId}/level`,
      params
    )

    return response.data
  } catch (err) {
    return []
  }
}

// ** Includes Add , Edit, Delete Sponsors
// ** API Sponsors Level
const updateSponsors = async (levelId: number, params: any) => {
  try {
    const response = await axiosClient.post(
      `/sponsor-level/${levelId}/sponsor`,
      params
    )

    return response.data
  } catch (err) {
    return []
  }
}

export { updateSponsorShip, updateSponsors }
