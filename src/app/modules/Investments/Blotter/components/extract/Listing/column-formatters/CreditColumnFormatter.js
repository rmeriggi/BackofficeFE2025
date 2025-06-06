import React from 'react'

export function CreditColumnFormatter(cellContent) {
    if(cellContent !== "0"){
      let amount = new Intl.NumberFormat("de-DE", {minimumFractionDigits:2}).format(cellContent)
      return (
        <span className="label label-lg label-light-success label-inline">
          ${amount}
        </span>
      )
    }else{
      return ""
    }
}