import React from "react";
import {
  CustomerStatusCssClasses,
  CustomerStatusTitles,
} from "../ListingTableHelpers";

export function StatusColumnFormatter(cellContent, row) {
  const getLabelCssClasses = () => {
    return `label label-lg label-light-${
      CustomerStatusCssClasses[cellContent]
    } label-inline .text-light`;
  };
  return (
    <span className={getLabelCssClasses()}>
      {CustomerStatusTitles[cellContent]}
    </span>
  );
}
