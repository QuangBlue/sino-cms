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
  benefits: string[]
  isExpired: boolean
  status: boolean
  createdAt: string
  updatedAt: string
  slug: string
}

export interface CreatePackageParams {
  eventName: string
  handleClickCloseModal: () => void
  params: {
    name: string
    price: number
    periodEnd: string
    periodStart: string
    priceType: 'normal' | 'early-bird'
    stockLimit: number
    description: string
    type: 'virtual' | 'onsite'
    normalId: number
    benefits: []
  }
}

export interface UpdatePackageParams {
  packageId: number
  eventName: string
  handleClickCloseModal: () => void
  params: {
    name: string
    price: number
    periodEnd: string
    periodStart: string
    priceType: 'normal' | 'early-bird'
    stockLimit: number
    type: 'virtual' | 'onsite'
    normalId: number
    benefits: []
  }
}
export interface DeletePackageParams {
  packageId: number
  eventName: string
  handleClickCloseModal: () => void
}

export interface ResumePackageParams {
  packageId: number
  eventName: string
  handleClickCloseModal: () => void
}

export interface PriceTypes {
  id: number
  price: number
  stockLimit: number
  priceType: 'normal' | 'early-bird'
  periodStart: string
  periodEnd: string
  status: boolean
  slug: string
}

export interface PackageTypesData {
  id: number
  name: string
  status: boolean
  benefits: string[]
  listPrice: PriceTypes[]
  type: string
  slug: string
}
