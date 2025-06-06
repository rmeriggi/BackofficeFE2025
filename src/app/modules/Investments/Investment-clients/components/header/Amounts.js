import React from 'react'
import {formatNumberToMoney} from "../../../../../utils/formatData"

export const Amounts = ({amounts}) => {

  const { investedCapital, collected, toCollect } = amounts
  return (
    <div className='d-flex flex-column justify-content-around'>
      <h4>Capital Invertido: ${formatNumberToMoney(investedCapital)}</h4>
      <h4>Cobrado: ${formatNumberToMoney(collected)}</h4>
      <h4>A cobrar en: {toCollect}</h4>
    </div>
  )
}
