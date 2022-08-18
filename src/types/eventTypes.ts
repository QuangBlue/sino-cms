import { AgentTypes } from './agentTypes'
import { CompanyTypes } from './companyTypes'

export interface EventTypes {
  id: number
  address: string
  name: string
  logo: any
  baseName: string
  status: boolean
  createdAt: string
  updatedAt: string
  company: CompanyTypes
  host: AgentTypes
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

export interface PackageTypes {
  id: number
  name: string
  price: number
  periodEnd: string
  periodStart: string
  description: string | null
  priceType: string
  stockLimit: number
  type: string
  isExpired: boolean
  status: boolean
  createdAt: string
  updatedAt: string
}
