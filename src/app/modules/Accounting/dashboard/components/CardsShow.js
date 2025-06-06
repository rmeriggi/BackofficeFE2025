import React from 'react'
import { CardInfo } from '../../../../components'
import { Grid } from '@material-ui/core'
import {formatMoney} from '../../../../utils/formatData'

function dataArrayCardsAmount (statistics){
  //const {balances} = statistics
  const dataCardsAmount = [

    {amount: formatMoney(5000), title:"Cantidad de asientos"},
    {amount: formatMoney(6000), title:"Crédito"},
    {amount: formatMoney(6000), title:"Débito"},
    {amount: formatMoney(0), title:"Balance"},
  ]
   return dataCardsAmount
} 

export default function CardsShow() {
  
  const dataCardAmount = dataArrayCardsAmount()
  //const formatedCardsAmount = formatAmount(dataCardAmount)

  return (
    <Grid container justify="center" className="bg-white rounded shadow-sm">
      {
         dataCardAmount.map(card => <CardInfo key={card.title} number={card.amount} title={card.title}/>)
      }
    </Grid>
  )
}

