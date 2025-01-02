export interface IArtist {
  _id: string
  role: number
  name: string
  email: string
  gender: string
  created_at: string
  updated_at: string
  number_of_following: number
  number_of_followers: number
  verify: number
  genres: string[]
  avatar: string
}
