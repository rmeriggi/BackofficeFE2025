import React from 'react'

export function DebitColumnFormatter(cellContent) {

    if(cellContent !== "0"){
      let amount = new Intl.NumberFormat("de-DE", {minimumFractionDigits:2}).format(cellContent)
      return (
        <span className="label label-lg label-light-danger label-inline">
          ${amount}
        </span>
      )
    }else{
      return ""
    }
    
 
}