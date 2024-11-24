export const capitalizeFirstLetterOfEachWord = (string: string): string => {
  if (!string) return ''
  return string.replace(/\b\w/g, (match) => match.toUpperCase())
}
