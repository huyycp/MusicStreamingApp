export interface INotification {
  message: string
  result: ResultNotification
}

interface ResultNotification {
  data: DatumNotification[]
  meta: Meta
}

interface Meta {
  items_per_page: number
  total_items: number
  current_page: number
  total_pages: number
}

export interface DatumNotification {
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

export interface IReadNoti {
    message: string
  }
