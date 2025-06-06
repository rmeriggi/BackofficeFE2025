/* eslint-disable eqeqeq */
import React from "react"

export function AccountsColumnFormatter(cellContent,row, rowIndex, {accounts}) {
    const account = accounts.find(e=> e.id == cellContent)?.account
    return (
        <span>{account}</span>
    )
}