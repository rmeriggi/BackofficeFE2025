import React from "react";
import {
  CustomerStatusCssClasses
} from "../ListingTableHelpers";

export function StatusColumnFormatter(cellContent, row) {
  const getLabelCssClasses = () => {
    return `label label-lg label-light-${
      CustomerStatusCssClasses[row.status]
    } label-inline`;
  };
  return (
    <span className={getLabelCssClasses()}>
      {row.statusDescription}
    </span>
  );
}
