export const capitalizeFirstLetterOfEachWord = (string: string): string => {
  return string.replace(/\b\w/g, (match) => match.toUpperCase())
}
