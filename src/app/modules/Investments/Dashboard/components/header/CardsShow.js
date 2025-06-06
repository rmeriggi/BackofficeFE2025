import React from 'react'
import CardInfo from './CardInfo'
import { Grid } from '@material-ui/core'
import {formatAmountFromString, formatNumberThousandsSeparator} from '../../../../../utils/formatData'

function dataArrayCards (values){
  const dataCards = [
    {amount: formatNumberThousandsSeparator(values.clients), title: 'Clientes'},
    {amount: formatNumberThousandsSeparator(values.operations), title: 'Operaciones'},
    {amount: `$${formatAmountFromString(values.volumeOperated)}`, title: 'Volumen Operado'},
    {amount: `$${formatAmountFromString(values.comissions)}`, title: 'Comisiones'},
    {amount: formatNumberThousandsSeparator(values.pl), title: 'P&L'},
  ]
   return dataCards
} 

export default function CardsShow({values}) {

  const dataCards = dataArrayCards(values)

  return (
    <Grid container justify="center" wrap='nowrap' className="bg-white rounded shadow-sm">
      {
        dataCards.map(card => <CardInfo key={card.title} number={card.amount} title={card.title}/>)
      } 
    </Grid>      
  )
}

