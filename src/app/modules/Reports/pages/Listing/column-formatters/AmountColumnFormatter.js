import React from "react"

export function AmountColumnFormatter(cellContent) {
    const amountFormated = new Intl.NumberFormat("de-DE", {minimumFractionDigits:2,  maximumFractionDigits: 2}).format(cellContent) 
    if(cellContent === 'doble') {
        return (
            <div className="pb-8">
            </div>
        )
    }else if(cellContent !== "") {
        return (
            <div className="d-flex justify-content-between py-2">
                <span>$</span>
                <span className={`${cellContent < 0 && 'text-danger'}`}>{amountFormated}</span>
            </div>
        )
    } else {
        return (
            <div className="pb-8">
            </div>
        )
    }
 
}