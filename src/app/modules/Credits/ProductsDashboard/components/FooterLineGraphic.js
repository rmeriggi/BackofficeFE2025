import React from 'react'
import BalanceStatistic from './BalanceStatistic'

function dataBalances (balances) {
  const {average, max, min} = balances
  const dataBalance = [
  {title: "Maximo", color: "#289DF5", balance: max.total, variation: max.variation},
  {title: "Minimo", color: "#354052", balance: min.total, variation: min.variation},
  {title: "Promedio", color: "#354052", balance: average.total, variation: average.variation},
  ]
  return dataBalance
}

export default function FooterLineGraphic({balances}) {
  
  const dataBalance = dataBalances(balances) 
  return (
    <div className="px-4 py-5 mt-5">
      {
        dataBalance.map(data => (
          <BalanceStatistic 
          key={data.title}
          title={data.title}
          color={data.color}
          balance={data.balance}
          variation={data.variation}
          />
        ))
      }
    </div>
    
  )
}
