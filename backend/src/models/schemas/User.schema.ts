import { ObjectId } from 'mongodb'
import { MusicGenre, RoleType, UserVerifyStatus } from '~/constants/enums'

interface UserType {
  _id?: ObjectId
  role: RoleType
  name: string
  email: string
  password: string
  gender: string
  created_at?: Date
  updated_at?: Date
  email_verify_token?: string
  forgot_password_token?: string
  verify?: UserVerifyStatus
  genre?: MusicGenre
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
  email_verify_token: string
  forgot_password_token: string
  verify: UserVerifyStatus
  genre: MusicGenre
  avatar: string

  constructor({
    _id,
    email,
    gender,
    name,
    password,
    role,
    avatar,
    created_at,
    email_verify_token,
    forgot_password_token,
    genre,
    updated_at,
    verify
  }: UserType) {
    const date = new Date()
    this._id = _id
    this.role = role || RoleType.Listener
    this.name = name || ''
    this.email = email
    this.password = password
    this.gender = gender
    this.created_at = created_at || date
    this.updated_at = updated_at || date
    this.email_verify_token = email_verify_token || ''
    this.forgot_password_token = forgot_password_token || ''
    this.verify = verify || UserVerifyStatus.Unverified
    this.genre = genre || MusicGenre.Pop
    this.avatar = avatar || ''
  }
}
