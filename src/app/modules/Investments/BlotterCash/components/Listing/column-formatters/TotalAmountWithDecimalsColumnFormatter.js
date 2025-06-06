import React from "react"

export function TotalAmountWithDecimalsColumnFormatter(cellContent,row) {
    const amountFormated = new Intl.NumberFormat("de-DE", {minimumFractionDigits:0,  maximumFractionDigits: 0}).format(row["24Hs"] + row["48hs"]+row.CI+row.Volumen) 
    return (`${amountFormated}`) 
}