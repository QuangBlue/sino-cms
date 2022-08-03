export interface SpeakerTypes {
  id: number
  avatar: string
  name: string
  jobTitle: string
  biography: string
  status: boolean
  order: number
  createdAt: string
  updatedAt: string
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
