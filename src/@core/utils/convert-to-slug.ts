export const convertToSlug = (value: string) =>
  value
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
