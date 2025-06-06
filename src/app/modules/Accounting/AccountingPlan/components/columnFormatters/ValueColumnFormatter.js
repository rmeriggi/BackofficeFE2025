/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { checkformat } from "../CheckFormatFunction";

export const ValueColumnFormatter = (
  cellContent,
  row,
  rowIndex,
  ) => {
    
  return (
    <>
    { checkformat(cellContent, '$', 'left')}
    </>
)};
