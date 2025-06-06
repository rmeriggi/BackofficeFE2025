import React from "react"

export function QuantityColumnFormatter(cellContent) {
    const quantityFormated = new Intl.NumberFormat("de-DE", {minimumFractionDigits:0,  maximumFractionDigits: 0}).format(cellContent) 

    return (
        <div className="d-flex justify-content-between">
            <span></span>
            <span>{quantityFormated}</span>
        </div>
    )
 
}