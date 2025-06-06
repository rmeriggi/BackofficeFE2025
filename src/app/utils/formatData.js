/* eslint-disable array-callback-return */
import moment from "moment";

export const formatDate = (data) => {
   if(data){
      const newData =  data.map(x => {
         if(x.date && x.date.length >= 10){
            const d = new Date(x.date) 
            const date = moment(d).utc().format('DD/MM/YYYY')
            return {...x, date}
         }
         if(x.period && x.period.length >= 10){
            const d = new Date(x.period) 
            const date = moment(d).utc().format('DD/MM/YYYY  hh:mm:ss')
            return {...x, date}
         }
      })
      return newData
   }
  
   return data
}

export const formatAmount = (data) => {
   if(data){
      data.map(x => {
         if(x.amount && !x.amount.includes('$')){
            const amountFormated = new Intl.NumberFormat("de-DE", {minimumFractionDigits:2}).format(x.amount) 
            return x.amount = "$ " + amountFormated
         }
      })
   }
   return data
}

export const formatDateWithHours = (data) => {
   if(data){
      const newData = data.map(x => {
         if(x.date && x.date.length >= 19){
            const d = new Date(x.date)
            const date = moment(d).utc().format('DD/MM/YYYY  hh:mm:ss')
            return {...x, date}
         }
      })
      return newData
}
   
   return data
}

export const formatAmountReport = (data) => {
   if(data){
      const formated = data.map(x => {
         if(x.amount){
            const amount = Number(parseFloat(x.amount).toFixed(2))
            return {...x, amount}
         }
         if(x.balances){
            const balances = Number(parseFloat(x.balances).toFixed(2))
            return {...x, balances}
         }
         return x
      })
      return formated
   }
}

export const formatClientReport = (report) => {
   const reportFormated = report.map(x => {
      const date = moment(x.date).utc().format('DD/MM/YYYY')
      const status = x.status === "1" ? "Activo" : "Inactivo"
      return {...x, date, status}
   })
   return reportFormated
}

export const formatReportExtract = (data) => {
   if(data){
      const formated = data.map(x => {
            const credit = parseFloat(x.credit)
            const debit = parseFloat(x.debit)
            const amount = parseFloat(x.amount)
            return {...x, credit, debit, amount}
      })
      return formated
   }
}

export const formatAmountFromString = (num) => {
   const response = new Intl.NumberFormat("de-DE", {minimumFractionDigits:2}).format(Number(num)) 
   return response
}

export const formatNumberThousandsSeparator = (num) => {
   const response = new Intl.NumberFormat("de-DE", {minimumFractionDigits:0}).format(Number(num))
   return response;
}

export const formatMoney = (num) => {
   if(num) {
      const response = new Intl.NumberFormat("de-DE", {minimumFractionDigits:0}).format(Number(num))
      return `$${response}`;
   } else {
      return '$'
   }
}

export const getNumberFormatted = (num) => {
  if(num < 1000){
    return '$' + num.toFixed(0)
  } else if(num >= 1000 && num < 1000000){
    return '$' + (num/1000).toFixed(0) + 'K'
  } else if(num >= 1000000){
    return '$' + (num/1000000).toFixed(0) + 'M'
  }
}

export const formatFieldToTypeNumber = (number) => {
   if(!number && number !== 0) return ""
   if(typeof number === "string"){
      const formattedNumber = parseFloat(number.replace(".", "").replace(",", "."))
      return formattedNumber
   }
   return number
}

export const formatNumberToMoney = (number) => {
   const newNumber = new Intl.NumberFormat("de-DE", {minimumFractionDigits:2, maximumFractionDigits: 2}).format(Number(number))
   return newNumber
 }