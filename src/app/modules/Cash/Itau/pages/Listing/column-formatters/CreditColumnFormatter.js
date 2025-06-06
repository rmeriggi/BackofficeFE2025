import React from "react"

export function CreditColumnFormatter(cellContent,row, rowIndex) {
    const amountFormated = new Intl.NumberFormat("de-DE", {minimumFractionDigits:2,  maximumFractionDigits: 2}).format(row.value)

    if(row.indicator === "+") return <></>
    else{
        return (
            <div className="d-flex justify-content-between">
                <span>$</span>
                <span>{amountFormated}</span>
            </div>
        )
    }
}