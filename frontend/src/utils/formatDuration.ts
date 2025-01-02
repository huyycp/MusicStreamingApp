export function formatDuration(value: number) {
  const minute = Math.floor(value / 60)
  const secondLeft = Math.round(value % 60)
  return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`
}
