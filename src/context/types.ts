export type ErrCallbackType = (err: { [key: string]: string }) => void

export type LoginParams = {
  email: string
  password: string
}

export type RegisterParams = {
  email: string
  username: string
  password: string
}

export type UserDataType = {
  id: number
  email: string
  firstName: string
  lastName: string
  phone: string | null
  eventLimit: number
  role: string
  status: boolean
  createdAt: string
  updatedAt: string
}

export type AuthValuesType = {
  loging: boolean
  loading: boolean
  setLoading: (value: boolean) => void
  setLoging: (value: boolean) => void
  logout: () => void
  isInitialized: boolean
  user: UserDataType | null
  setUser: (value: UserDataType | null) => void
  setIsInitialized: (value: boolean) => void
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
  register: (params: RegisterParams, errorCallback?: ErrCallbackType) => void
}
