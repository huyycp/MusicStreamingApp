import { IUser } from '../User/IUser'

export interface IReport {
  _id: string
  reported_item_id: string
  reported_item_type: string
  reason: string[]
  reporters: IUser
  subject: string
  body: string
  image: string[]
  path_audio: string
  rejection_reason: string
  status: string
  created_at: string
}
