import React from "react";

export function AmountColumnFormatter(cellContent) {
  const amountFormated = new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(cellContent);
  return (
    <div className="d-flex justify-content-center">
      <span>{`$${amountFormated}`}</span>
    </div>
  );
}
