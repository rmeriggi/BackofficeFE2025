import moment from "moment";

export function DateWithHoursColumnFormatter(cellContent) {
  const date = new Date(cellContent)
  const formatDate = (date) => {
    return moment(date).utc().format('DD/MM/YYYY HH:mm')
  }
  return (
    formatDate(date)
  )
}