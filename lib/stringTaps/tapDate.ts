const isDate = (value: string) => {
  const date = new Date(value)

  return !isNaN(date.valueOf())
}

export const tapDate = (value: string): Date | string =>
  isDate(value) ? new Date(value) : value
