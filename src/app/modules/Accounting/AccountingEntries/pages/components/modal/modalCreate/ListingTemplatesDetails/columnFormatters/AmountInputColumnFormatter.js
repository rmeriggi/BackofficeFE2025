import { Input, InputAdornment } from "@material-ui/core";
import React from "react";

export function AmountInputColumnFormatter(cellContent,row, rowIndex, {amounts, setFieldValue, setAmounts}){
  
  let amountsArray = amounts;

  return (
    <>
        <Input
            defaultValue={amounts[rowIndex]}
            onChange={(e) => {
              amountsArray[rowIndex] = Number(e.target.value);
              const amountSetted = amountsArray
              
              setFieldValue('amounts', amountSetted)
              setAmounts(amountSetted)
            }}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
    </>
)};