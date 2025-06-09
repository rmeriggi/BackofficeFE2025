/* import React from "react" */

export function AmountWithDecimalsColumnFormatter(cellContent) {
  const amountFormated = new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  }).format(cellContent);
  return `$${amountFormated}`;
}
