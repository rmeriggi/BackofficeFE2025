import React from "react";

export function ColorColumnFormatter(cellContent, row) {

  return (
    <span className="label label-lg label-light-success label-inline">
      {cellContent}
    </span>
  );
}