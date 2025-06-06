import React from "react";
import {
  ClientStatusCssClasses,
  ClientStatusTitles,
} from "../../../context/ContextHelper";

export function StatusColumnFormatter(cellContent, row) {
  const getLabelCssClasses = () => {
    return `label label-lg label-light-${
      ClientStatusCssClasses[row.id]
    } label-inline`;
  };
  return (
    <span className={getLabelCssClasses()}>
      {ClientStatusTitles[row.id]}
    </span>
  );
}
