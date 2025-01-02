/* eslint-disable indent */
export const ReportData = [
  {
    reason: 'Copyright infringement',
    translate: 'Vi phạm bản quyền'
  },
  {
    reason: 'Hate speech',
    translate: 'Nói xấu, lặng mạ, chửi bới'
  },
  {
    reason: 'Privacy violation',
    translate: 'Xâm phạm quyền riêng tư'
  },
  {
    reason: 'Pornographic content',
    translate: 'Nội dung phản cảm, gợi dục'
  },
  {
    reason: 'Abuse',
    translate: 'Nội dung gây hại hoặc không phù hợp'
  },
  {
    reason: 'Illegal content',
    translate: 'Nội dung vi phạm pháp luật'
  },
  {
    reason: 'Content appears on wrong profile',
    translate: 'Nội dung xuất hiện trên trang cá nhân sai'
  }
]

export const translateReason = (reason: string) => ReportData.find((item) => item.reason === reason)?.translate || ''

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'warning'
    case 'resolved':
      return 'success'
    case 'dismissed':
      return 'error'
    default:
      return 'info'
  }
}

type TrackStatus = 'all' | 'pending' | 'resolved' | 'dismissed'

export const STATUS_OPTIONS: { label: string; value: TrackStatus }[] = [
  { label: 'Tất cả', value: 'all' },
  { label: 'Đang xử lý', value: 'pending' },
  { label: 'Đã xử lý', value: 'resolved' },
  { label: 'Đã từ chối', value: 'dismissed' }
]
