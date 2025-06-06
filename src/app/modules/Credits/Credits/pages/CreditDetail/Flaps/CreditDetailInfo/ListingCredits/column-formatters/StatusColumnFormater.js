/* eslint-disable eqeqeq */
import React from 'react'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

export function StatusColumnFormater(cellContent) {
  
  const getColorStatus = (index) => {
    if(index == "4"){
      return "#7ad735"
    }
    if(index == "1"){
      return "#d74135"
    }
  }

  return (
    <FiberManualRecordIcon htmlColor={getColorStatus(cellContent)}/>
  );
}
