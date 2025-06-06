import React from "react";

export function RateColumnFormatter(cellContent, row) {

    return( 
      <span>
        {`${cellContent}%`}
      </span>
    )  
}

