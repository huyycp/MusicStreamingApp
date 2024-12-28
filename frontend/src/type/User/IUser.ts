import { IGenres } from '../Genres/IGenres'

export interface IUser {
  _id: string
  role: number
  name: string
  email: string
  gender: string
  created_at: string
  updated_at: string
  verify: number
  genres: IGenres[]
  avatar: string
  premium: boolean
  number_of_following: number
  number_of_followers: number
}
