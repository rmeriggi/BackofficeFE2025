import React from "react";

export function ActiveColumnFormatter(cellContent) {
 
  if(cellContent === "true"){
    return (
    <span className="label label-lg label-light-success label-inline">
    Activo
    </span>)
  } 
  if(cellContent === "false"){
    return (
    <span className="label label-lg label-light-info label-inline">
      Inactivo
    </span>
    )
  }
}