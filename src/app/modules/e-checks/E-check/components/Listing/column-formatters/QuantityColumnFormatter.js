import React from "react"

export function QuantityColumnFormatter(cellContent) {
    const amountFormated = new Intl.NumberFormat("de-DE", {minimumFractionDigits:0,  maximumFractionDigits: 0}).format(cellContent) 
    return (`${amountFormated}`) 
}