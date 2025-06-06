import React from 'react'
import CardInfo from './CardInfo'
import { Grid } from '@material-ui/core'
import {formatAmount} from '../../../../utils/formatData'

function dataArrayCards (statistics){
  const {balances} = statistics
  const dataCards = [
    {amount: balances.master, title: 'Saldo master cuenta'},
    {amount: balances.accounts, title: 'Saldo sum cuentas'},
    {amount: balances.cashin, title: 'Sum cash-in'},
    {amount: balances.cashout, title: 'Sum cash-out'},
  ]
   return dataCards
} 

export default function CardsShow({data}) {
  
  const dataCards = dataArrayCards(data)
  const formatedCards = formatAmount(dataCards)

  return (
    <Grid container justify="center" className="bg-white rounded shadow-sm">
      <CardInfo number={data.clients} title="Clientes"/>
      <CardInfo number={data.cardsIssued} title="Tarjetas emitidas"/>
      {
        formatedCards.map(card => <CardInfo key={card.title} number={card.amount} title={card.title}/>)
      }
    </Grid>
    
  )
}

