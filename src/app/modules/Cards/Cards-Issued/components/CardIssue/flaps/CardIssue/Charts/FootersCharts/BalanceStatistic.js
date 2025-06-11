import React from 'react'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

export default function BalanceStatistic({title, color, balance, variation}) {
  return (
    <div className="d-flex justify-content-between py-4 my-1 border-top">
      <span style={{fontSize: "0.90rem"}}>
      <RadioButtonUncheckedIcon fontSize="small" htmlColor={color} className="mr-1"/>
        {title}
      </span>
      <div style={{fontSize: "0.90rem"}}>
        ${ new Intl.NumberFormat("de-DE", {minimumFractionDigits:2}).format(balance) }
        {variation > 0 ? (
          <span className="ml-2" style={{color : "#1BB934", fontSize: "0.90rem"}}>
          {variation}%
         <KeyboardArrowUpIcon htmlColor="#1BB934"/>
        </span>
        ) : (
        <span className="ml-2" style={{color : "#FD9A18", fontSize: "0.90rem"}}>
          {variation}%
         <KeyboardArrowDownIcon htmlColor="#FD9A18"/>
        </span>
        )}
      </div>
    </div>
  )
}
