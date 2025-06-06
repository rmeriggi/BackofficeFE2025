import React from 'react'
import CardGraphic from './Charts/CardGraphic'
import GraphicBar from "../../../../../../Clients/Statistics/Graphics/GraphicBar"
import GraphicDoughnut from "../../../../../../Clients/Statistics/Graphics/GraphicDoughnut"
import GraphicLine from "../../../../../../Clients/Statistics/Graphics/GraphicLine"

export function Charts({charts}) {
  const {transactions, balances, volume} = charts
  return (
    <>
      <CardGraphic title="Transacciones" data={transactions}>
        <GraphicBar data={transactions.data}/>
      </CardGraphic> 
      <CardGraphic title="Volumen" data={volume}>
          <GraphicDoughnut data={volume}/>
        </CardGraphic> 
      <CardGraphic title="Saldo promedio" data={balances}>
        <GraphicLine data={balances}/>
      </CardGraphic> 
    </>
  )
}
