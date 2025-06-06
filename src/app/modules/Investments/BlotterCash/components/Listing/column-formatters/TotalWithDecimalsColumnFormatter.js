import React from "react"

export function TotalWithDecimalsColumnFormatter(cellContent,row) {
    const amountFormated = new Intl.NumberFormat("de-DE", {minimumFractionDigits:4,  maximumFractionDigits: 4}).format(row.PESOS+ row.MEP+row.CABLE+row.Volumen) 
    return (`$${amountFormated}`) 
}