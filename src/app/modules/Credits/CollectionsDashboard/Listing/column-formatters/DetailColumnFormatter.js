import React from "react";
import { Button } from "@material-ui/core";
import { OverlayTrigger, Tooltip } from "react-bootstrap";



export function DetailColumnFormatter(cellContent,row, rowIndex, {openReceipt}){

  return (
    <>
      <OverlayTrigger
        overlay={<Tooltip >Ver</Tooltip>}
      >
        <Button
          className="btn btn-icon btn-light btn-m"
          onClick={()=> openReceipt(row.id)} 
        >
          
        </Button>
      </OverlayTrigger>
    </>
)};