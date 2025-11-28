export type User = {
  id: number
  email: string
  name: string
}

export type Tutor = {
  id?: number
  name: string
  email: string
  phone?: string
}

export type Animal = {
  id?: number
  name: string
  species: string
  breed?: string
  age?: number
  tutorId: number
  photo?: string
}