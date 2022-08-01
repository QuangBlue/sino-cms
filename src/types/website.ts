export interface SpeakerTypes {
  id: number
  avatar: string
  status: boolean
  order: string
  createdAt: string
  updatedAt: string
  languages: LanguageTypes[]
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
