/* eslint-disable eqeqeq */
import React from "react";

export function SubAccountColumnFormatter(cellContent, row, rowIndex, {subAccounts}) {

  const subAccountName = subAccounts.find( sa => sa.id == cellContent).subAccount
  
  return (
    <span>
      {subAccountName}
    </span>
  );
}
