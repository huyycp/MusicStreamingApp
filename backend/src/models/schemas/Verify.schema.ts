import { ObjectId } from 'mongodb'

interface VerifyType {
  _id?: ObjectId
  email: string
  otp: string
  expiresAt?: Date
}

export default class Verify {
  _id?: ObjectId
  email: string
  otp: string
  expiresAt: Date
  constructor({ _id, email, otp, expiresAt }: VerifyType) {
    this._id = _id
    this.email = email
    this.otp = otp
    this.expiresAt = expiresAt || new Date(Date.now() + 3 * 60 * 1000) // 3 phút
  }
}
