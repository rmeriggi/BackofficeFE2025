/* import React from "react"
 */
export function AmountWithIndicatorColumnFormatter(cellContent) {
  const amountFormated = new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(cellContent);
  return `${cellContent < 0 ? "▼ " : ""}${amountFormated}`;
}
