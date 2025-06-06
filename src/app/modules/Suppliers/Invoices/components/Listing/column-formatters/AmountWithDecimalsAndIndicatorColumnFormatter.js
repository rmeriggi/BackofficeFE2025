import React from "react"

export function AmountWithDecimalsAndIndicatorColumnFormatter(cellContent, row) {
    const amountFormated = new Intl.NumberFormat("de-DE", {minimumFractionDigits:2,  maximumFractionDigits: 2}).format(Math.abs(cellContent)) 
    return (`${row.difpor < 0 ? '▼ ' : row.difpor == 0? '': '▲ '}$${amountFormated}`) 
}