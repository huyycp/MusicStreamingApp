export interface IUserCard {
  message: string
  result: ResultUserCard
}

export interface ResultUserCard {
  _id: string
  role: number
  name: string
  email: string
  gender: string
  created_at: string
  updated_at: string
  verify: number
  avatar: string
  genres: Genre[]
}

interface Genre {
  _id: string
  name: string
  image: string
}
