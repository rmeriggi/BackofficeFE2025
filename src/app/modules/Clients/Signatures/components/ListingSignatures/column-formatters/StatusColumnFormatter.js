import React from "react";

export const BlotterDeadLineCssClasses = [  
  "warning",
  "info",
];
export const BlotterDeadLineTitles = [
  'inactivo',
  'activo',
];

export function StatusColumnFormater(cellContent, row) {
  let index = 0;
  if (cellContent === '0') {
    index = 0;
  }
  if (cellContent === '1') {
    index = 1;
  }
  
  const getLabelCssClasses = () => {
    return `label label-lg label-light-${
      BlotterDeadLineCssClasses[index]
    } label-inline`;
  };
  return (
    <span className={getLabelCssClasses()}>
      {BlotterDeadLineTitles[index]}
    </span>
  );
}
