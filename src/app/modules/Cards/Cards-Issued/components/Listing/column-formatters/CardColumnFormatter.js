import React from "react";
import { toAbsoluteUrl } from "../../../../../../../_metronic/_helpers";

export function CardColumnFormatter(cellContent) {
  if(cellContent === 1){
    return (
      <img alt="card" src={toAbsoluteUrl('/media/cards/card1.png')} className="rounded" style={{width: "50px"}}/>
    )
  }
  if(cellContent === 2){
    return (
      <img alt="card" src={toAbsoluteUrl('/media/cards/card2.png')} className="rounded" style={{width: "50px"}}/>
    )
  }
  if(cellContent === 3){
    return (
      <img alt="card" src={toAbsoluteUrl('/media/cards/card3.png')} className="rounded" style={{width: "50px"}}/>
    )
  }
}
