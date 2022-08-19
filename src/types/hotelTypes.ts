export interface CreateHotelParams {
  name: string
  star: string | number
  price: string | number
  location: string
  phone: string | number
  email: string
}

export interface EditHotelParams {
  id: number
  name: string
  star: string | number
  price: string | number
  location: string
  phone: string | number
  email: string
}

export interface HotelTypes {
  id: number
  name: string
  star: number
  address: string
  price: number
  location: string
  phone: number | string
  email: string
  link: string
  status: boolean
}
