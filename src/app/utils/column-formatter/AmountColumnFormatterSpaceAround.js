import React from "react"

export function AmountColumnFormatterSpaceAround(cellContent) {

    const amountFormated = new Intl.NumberFormat("de-DE", {minimumFractionDigits:2}).format(cellContent) 
    return (
        <div className="d-flex justify-content-around">
            
            <span>$</span>
            <span>{amountFormated}</span>
        </div>
    )
 
}