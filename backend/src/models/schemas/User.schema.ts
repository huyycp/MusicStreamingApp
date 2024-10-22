import { ObjectId } from 'mongodb'
import { RoleType, UserVerifyStatus } from '~/constants/enums'

interface UserType {
  _id?: ObjectId
  role: RoleType
  name: string
  email: string
  password: string
  gender: string
  created_at?: Date
  updated_at?: Date
  verify?: UserVerifyStatus
  genres?: ObjectId[]
  avatar?: string
}

export default class User {
  _id?: ObjectId
  role: RoleType
  name: string
  email: string
  password: string
  gender: string
  created_at: Date
  updated_at: Date
  verify: UserVerifyStatus
  genres: ObjectId[]
  avatar: string

  constructor({ _id, email, gender, name, password, role, avatar, created_at, genres, updated_at, verify }: UserType) {
    const date = new Date()
    this._id = _id
    this.role = role
    this.name = name
    this.email = email
    this.password = password
    this.gender = gender
    this.created_at = created_at || date
    this.updated_at = updated_at || date
    this.verify = verify || UserVerifyStatus.Verified
    this.genres = genres || []
    this.avatar = avatar || ''
  }
}
