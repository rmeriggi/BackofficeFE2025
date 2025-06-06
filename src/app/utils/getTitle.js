/* eslint-disable eqeqeq */
import { format } from "date-fns"

export const getTitleToExcel = (types , dataValues, values, setNameExcel ) => {
  if(dataValues.type == 0){
    setNameExcel(`Todas las transferencias desde ${format(values.fromDate, "dd-MM-yyyy")} hasta ${format(values.toDate, "dd-MM-yyyy")}`)
  }else{
    setNameExcel(`${types.find(t => t.id == dataValues.type).types.trim()} desde ${format(values.fromDate, "dd-MM-yyyy")} hasta ${format(values.toDate, "dd-MM-yyyy")}`)
  }
}

export const getScreenTitleToExcel = (screen, setNameExcel, values) => {
  if(screen){
    setNameExcel(`${screen} desde ${format(values.fromDate, "dd-MM-yyyy")} hasta ${format(values.toDate, "dd-MM-yyyy")}`)
  }
}