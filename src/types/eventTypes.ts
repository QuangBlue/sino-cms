export interface EventTypes {
  id: number
  name: string
  baseName: string
  status: boolean
  address: string
  createdAt?: string
  updatedAt?: string
}

export interface CreateEventPayload {
  payload: {
    name: string
    baseName: string
    address: string
    status: boolean
  }
  handleClickCloseModal: () => void
}
