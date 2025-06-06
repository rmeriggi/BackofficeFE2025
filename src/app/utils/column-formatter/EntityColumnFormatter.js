/* eslint-disable eqeqeq */
import React from "react"

export function EntityColumnFormatter(cellContent,row, rowIndex, {entities}) {
    const entity = entities?.find(e=> e.id == cellContent).entity
    return (
        <span>{entity}</span>
    )
 
}