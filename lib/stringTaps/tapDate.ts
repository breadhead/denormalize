const DATE_REGEX = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(.*)/

export const tapDate = (value: string): Date | string =>
  DATE_REGEX.test(value) ? new Date(value) : value
