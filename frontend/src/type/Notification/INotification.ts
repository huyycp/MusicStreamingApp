export interface INotification {
  _id: string
  user_id: string
  title: string
  content: string
  type: string
  artifact_id: string
  seen: boolean
  created_at: string
  updated_at: string
}
