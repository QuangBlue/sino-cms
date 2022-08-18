import moment from 'moment'

const FORMAT = 'd/MM/yyyy'

export const formatDate = (date: string) => {
  return moment(date).format(FORMAT)
}
