import React from "react";
import {  Switch } from "@material-ui/core";

export function AmountColumnFormatter(cellContent,row, rowIndex,{checkedAmount, handleChangeAmount}){


  return (
    <Switch checked={checkedAmount} onChange={handleChangeAmount} name="status"/>
)};