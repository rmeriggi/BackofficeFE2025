/* eslint-disable eqeqeq */
import React from "react";
import {
  CustomerStatusCssClasses,
} from "../ListingTableHelpers";

export function StatusColumnFormatter(cellContent, row, rowIndex, {creditsStatus}) {

  const getLabelCssClasses = () => {
    return `label label-lg label-light-${
      CustomerStatusCssClasses[creditsStatus.find(c => c.status == row.status)?.id]
    } label-inline`;
  };
  return (
    <span className={getLabelCssClasses()}>
      {cellContent}
    </span>
  );
}
