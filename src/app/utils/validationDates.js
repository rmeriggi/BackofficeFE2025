export const setDatesValues = (date, otherDate, setFieldValue, validation) => {

  if(validation === "from"){
      setFieldValue("fromDate", date)
      if(date > otherDate){
          setFieldValue("toDate", date)
      }
  }
  if(validation === "to"){
      setFieldValue("toDate", date)
      if(date < otherDate){
          setFieldValue("fromDate", date)
      }
  }
}   