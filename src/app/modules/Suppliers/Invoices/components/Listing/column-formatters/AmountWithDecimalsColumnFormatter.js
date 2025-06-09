/* import React from "react"
 */
export function AmountWithDecimalsColumnFormatter(cellContent) {
  const amountFormated = new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(cellContent);
  return `$${amountFormated}`;
}
