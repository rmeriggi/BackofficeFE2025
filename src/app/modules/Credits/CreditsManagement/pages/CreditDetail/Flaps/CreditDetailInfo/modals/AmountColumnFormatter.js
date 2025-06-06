import React from "react"

export function AmountColumnFormatterCapitalAndInterest(cellContent,row, rowIndex) {
    const amountFormated = new Intl.NumberFormat("de-DE", {minimumFractionDigits:2,  maximumFractionDigits: 2}).format(cellContent + row.interest) 

    return (
        <div className="d-flex justify-content-between">
            <span>$</span>
            <span>{amountFormated}</span>
        </div>
    )
 
}