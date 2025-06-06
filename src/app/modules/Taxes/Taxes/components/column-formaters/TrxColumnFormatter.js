import React from "react";
import { Switch } from "@material-ui/core";


export function TrxColumnFormatter(cellContent,row, rowIndex,{checkedTrx, handleChangeTrx}){

  return (
     <Switch checked={checkedTrx} onChange={handleChangeTrx} name="trx"/>
)};