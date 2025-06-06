import React from "react";
import {
  ClientStatusCssClasses,
  ClientStatusTitles,
} from "../Listing/ListingTableHelpers";

export function StatusColumnFormatter(cellContent, row) {
  const getLabelCssClasses = () => {
    return `label label-lg label-light-${
      ClientStatusCssClasses[row.status]
    } label-inline`;
  };
  return (
    <span className={getLabelCssClasses()}>
      {ClientStatusTitles[row.status]}
    </span>
  );
}