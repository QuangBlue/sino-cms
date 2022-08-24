import moment from 'moment'

const FORMAT = 'DD/MM/yyyy'

export const formatDate = (date: string) => {
  return moment(date).format(FORMAT)
}
