import { AgentTypes } from './agentTypes'
import { EventTypes } from './eventTypes'

export interface CreateCompanyParams {
  name: string
  baseName: string
}

export interface CompanyTypes {
  id: number
  baseName: string
  name: string
  email: string
  website: string
  phone: string
  status: boolean
  createdAt: Date
  updatedAt: Date
  events: EventTypes[]
  totalEvent: number
  agent: AgentTypes
}
