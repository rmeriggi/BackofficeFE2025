/* eslint-disable default-case */
/* eslint-disable eqeqeq */
import React from 'react'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

export function StatusColumnFormater(cellContent) {
  
  const getColorStatus = (index) => {
    switch (index) {
      case '0':
        return '#7ad735';
      case '1':
        return '#d74135';
      case '3':
        return 'black'
    }
  }

  return (
    <FiberManualRecordIcon htmlColor={getColorStatus(cellContent)}/>
  );
}
