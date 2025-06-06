/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import {checkformat} from '../../../../../columnFormatters/CheckFormatFunction'

export const RateColumnFormatter = (
  cellContent,
  row,
  rowIndex,
  ) => {
  return (
    <>
    { checkformat(row.tna/100, '%', 'right')}
    </>
)};
