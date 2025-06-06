import moment from "moment";

export function DateColumnFormatter(cellContent) {  
    const arrayDate =cellContent.split(' ')  
  return (
    arrayDate[0]
  )
}