import React from 'react'
import CardInfo from './CardInfo'
import { Grid } from '@material-ui/core'
import {formatAmount, formatNumberThousandsSeparator} from '../../../../utils/formatData'

function dataArrayCards (statistics){
  const {balances} = statistics
  const dataCards = [
    {amount: balances.cashin, title: 'Volumen Operado'},
    {amount: balances.cashout, title: 'Comisiones'},
  ]
   return dataCards
} 

export default function CardsShow({data}) {
  
  const dataCards = dataArrayCards(data)
  const formatedCards = formatAmount(dataCards)

  return (
    <Grid container justify="center" className="bg-white rounded shadow-sm">
      <CardInfo number={data.clients} title="Clientes"/>
      <CardInfo number={formatNumberThousandsSeparator(data.balances.master)} title="Op. en curso"/>
      <CardInfo number={formatNumberThousandsSeparator(data.balances.accounts)} title="Op. Cerradas"/>
      <CardInfo number={formatNumberThousandsSeparator(data.balances.itau)} title="Op. Rechazadas"/>
      <CardInfo number={formatNumberThousandsSeparator(data.balances.cashout)} title="Op. Promedio"/>

      {
        formatedCards.map(card => <CardInfo key={card.title} number={card.amount} title={card.title}/>)
      }
    </Grid>
    
  )
}

