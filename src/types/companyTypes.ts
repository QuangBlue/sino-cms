import { AgentTypes, EventTypes } from './agentTypes'

export interface CreateCompanyParams {
  name: string
  baseName: string
}

export interface CompanyTypes {
  id: number
  baseName: string
  name: string
  status: boolean
  createdAt: Date
  updatedAt: Date
  events: EventTypes[]
  totalEvent: number
  agent: AgentTypes
}
