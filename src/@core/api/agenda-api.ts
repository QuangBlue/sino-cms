import axiosClient from 'src/configs/axiosClient'

// ** Includes Add , Edit, Delete Agenda
// ** API Agenda Stage
const updateAgendaStage = async (agendaId: number, params: any) => {
  try {
    const response = await axiosClient.post(`/agenda/${agendaId}/stage`, params)

    return response.data
  } catch (err) {
    return []
  }
}

const deleteAgenda = async (agendaId: number) => {
  try {
    const response = await axiosClient.delete(`/agenda/${agendaId}`)

    return response.data
  } catch (err) {
    return null
  }
}

const editAgenda = async (agendaId: number, params: any) => {
  try {
    const response = await axiosClient.put(`/agenda/${agendaId}`, params)

    return response.data
  } catch (err) {
    return []
  }
}

export { updateAgendaStage, deleteAgenda, editAgenda }
