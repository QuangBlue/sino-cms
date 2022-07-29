import { CompanyTypes } from './companyTypes'

export interface CreateAgentParams {
  firstName: string
  eventLimit: number
  lastName: string
  phone: string
  email: string
  password: string
}

export interface AgentTypes {
  id: number
  email: string
  firstName: string
  lastName: string
  password: string
  phone: string
  eventLimit: number
  role: string
  status: boolean
  createdAt: string
  updatedAt: string
  companies: CompanyTypes[]
  totalCompany: number
  totalEvent: number
}

export interface EventTypes {
  id: number
  name: string
  baseName: string
  status: boolean
}
