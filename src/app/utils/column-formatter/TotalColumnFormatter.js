import React from "react";

export function TotalColumnFormatter(cellContent, row) {
  
  return (
    <span className={cellContent === 'TOTAL'? 'label label-inline label-lg label-light-warning ': ''}>
      {cellContent}
    </span>
  );
}
