import React from "react";

export function TitleColumnFormatter(cellContent, row) {
  
  return (
    <span className={(cellContent === 'Liquidez' || cellContent === 'CORPS ARG' || cellContent === 'Posiciones Cerradas' || cellContent === 'NON ARG USD' || cellContent === 'Short Positions')? 'text-info ': ''}>
      {cellContent}
    </span>
  );
}
