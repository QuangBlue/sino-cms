import moment from 'moment'

const FORMAT = 'DD/MM/yyyy'

export const formatDate = (date: string) => {
  return moment(date).format(FORMAT)
}

export const formatTime = (date: Date) => {
  return moment(date).format('HH:mm')
}

export const formatDisplayTime = (time: string) => {
  return moment(time, 'h:mm A').format('h:mm A')
}

export const formatDateFromTime = (time: any) => {
  return moment(time, 'h:mm A').toDate()
}
