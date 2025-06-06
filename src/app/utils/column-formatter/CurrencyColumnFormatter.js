/* eslint-disable eqeqeq */
import React from "react"

export function CurrencyColumnFormatter(cellContent,row, rowIndex, {currency}) {
    const currencyName = currency?.find(e=> e.id == cellContent).currency
    return (
        <span>{currencyName}</span>
    )
}