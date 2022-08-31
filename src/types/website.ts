export interface SpeakerTypes {
  id: number
  avatar: string
  name: string
  jobTitle: string
  biography: string
  status: boolean
  order?: number
  createdAt?: string
  updatedAt?: string
}

export interface LanguageTypes {
  id: string
  lang: string
  field: string
  value: string
  status: boolean
  createdAt: string
  updatedAt: string
}

export interface SettingHeaderTypes {
  key: string
  id?: number
  title: string
  content?: string
  isPublished: boolean
  createdAt?: string
  updatedAt?: string
  header?: any
}

export type HeaderKey =
  | 'about-us'
  | 'agenda'
  | 'contact-us'
  | 'gallery'
  | 'org-partner'
  | 'register'
  | 'speaker'
  | 'sponsor'

export interface AgendaTypes {
  id?: number
  name: string
  slug: string
  description: string
  date: string
  stages?: any
}

export interface AgendaDetailTypes {
  id?: number
  title: string
  topic: string
  speaker: string
  speakerTitle: string
  timeStart: string
  timeEnd: string
}

export interface AlbumTypes {
  id?: number
  year: number
  name: string
}

export interface PhotoAlbumTypes {
  id?: number
  createdAt?: string
  name: string
  photos: any
  type: string
  updatedAt?: string
  year: number
}

export interface AddPhotoTypes {
  id?: number
  order?: number
  imgUrl: string
}

export interface PhotoTypes {
  id?: number
  imgUrl: string
  order?: number
  createdAt?: string
  updatedAt?: string
}

export interface SponsorShip {
  id?: number
  name: string
  price: number
  slot: number
  updatedAt?: string
  createdAt?: string
  group?: any
}

export interface SponsorGroup {
  id?: number
  event: any
  levels: SponsorShip
  name: string
  updatedAt?: string
  createdAt?: string
}

export interface SponsorSettings {
  title: string
  description: string
  contactInfo: string
}

export interface PartnersGroup {
  id: number
  name: string
  slug: string
  description: string
  logoUrl: string
  updatedAt?: string
  createdAt?: string
}

export interface OrganiserPartners {
  id: number
  label: string
  updatedAt?: string
  createdAt?: string
  partners: PartnersGroup
}

export interface PartnersType {
  id: number
  label: string
  updatedAt?: string
  createdAt?: string
}
