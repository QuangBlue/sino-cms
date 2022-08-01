import { CompanyTypes } from './companyTypes'

export interface EventTypes {
  id: number
  name: string
  baseName: string
  status: boolean
  address: string
  createdAt?: string
  updatedAt?: string
  company: CompanyTypes
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

export interface EventMapTypes {
  id: number
  imgUrl: string
  name: string
  status: boolean
  createdAt: string
  updatedAt: string
}
