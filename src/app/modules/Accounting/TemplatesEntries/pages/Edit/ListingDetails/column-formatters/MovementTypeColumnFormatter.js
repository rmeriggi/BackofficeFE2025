import { Checkbox, FormControlLabel } from "@material-ui/core";
import React from "react";

export function MovementTypeColumnFormatter(cellContent,row, rowIndex){

  return (
    <>
      <div className='d-flex'>
        <FormControlLabel
          label="Debe"
          labelPlacement="top"
          control={
            <Checkbox
              value={cellContent === 'D'}
              checked={cellContent === "D"}
              color="secondary"
            />
          }
        />
        <FormControlLabel
          label="Haber"
          labelPlacement="top"
          control={
            <Checkbox
              value={cellContent === 'H'}
              checked={cellContent === "H"}
              color="secondary"
            />
          }
        />
      </div>
    </>
)};