/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable default-case */
/* eslint-disable eqeqeq */
import React from 'react'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

export function StatusColumnFormater(cellContent,row, rowIndex,{quotasStatus}) {

  const getColorStatus = (index) => {
    switch (index) {
      case 1:
        return 'green';
      case 2:
        return 'yellow';
      case 5:
        return 'yellow';
      case 6:
        return 'yellow';
      case 11:
        return 'yellow';
      case 12:
        return 'yellow';
      case 3 :
        return 'black';
      case 4:
        return 'black';
      case 7 :
        return 'red';
      case  8 :
        return 'red';
      case  9 :
        return 'red';
      case 10:
        return 'red';
    }
  }
  const getNameStatus = (id) => {
    const statusName = quotasStatus?.find(s=> s.id == id)?.status || "Sin datos";
    return statusName
  }

  return (
    <OverlayTrigger
      overlay={<Tooltip >{getNameStatus(cellContent)}</Tooltip>}
    >
      <a
        className="btn btn-icon btn-light btn-sm mr-1"
      >
        <span className="svg-icon svg-icon-b svg-icon-primary">
          <FiberManualRecordIcon htmlColor={getColorStatus(cellContent)}/>
        </span>
      </a>
    </OverlayTrigger>
)};