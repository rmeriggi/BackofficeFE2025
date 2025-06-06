/* eslint-disable eqeqeq */
import React from "react";

export function GroupNameColumnFormatter(cellContent, row, rowIndex, {accountingGroups}) {

  const group = accountingGroups?.find(ag => ag.id == cellContent)?.group 

  return (
    <span >
      {group}
    </span>
  );
}
