/* eslint-disable eqeqeq */
import React from "react";
import {
  StatusCssClasses,
} from "../ListingTableHelpers";

export function StatusAccountColumnFormatter(cellContent, row, rowIndex, {creditsStatus}) {

  const getLabelCssClasses = () => {
    return `label label-lg label-light-${
      StatusCssClasses[row.status]
    } label-inline .text-light`;
  };

  if(row.status){
      return (
      <span className={getLabelCssClasses()}>
        {creditsStatus.find(c => c.id == row.status)?.status}
      </span>
    );
  }

  if(row.status === undefined){
    return( 
      <span className={`svg-icon menu-icon label label-lg label-light-success label-inline`}>
        <span className="fa fa-check-circle"></span>
      </span>
    )  
  }
}

