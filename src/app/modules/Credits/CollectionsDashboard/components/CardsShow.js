import React from 'react'
import { CardInfo } from '../../../../components'
import { Grid } from '@material-ui/core'
import {formatAmount, formatNumberThousandsSeparator} from '../../../../utils/formatData'

function dataArrayCardsAmount (statistics){
  const {balances} = statistics
  const dataCardsAmount = [

    {amount: balances.totalLoaned, title: 'Total Prestado'},
    {amount: balances.totalCollected, title: 'Total Cobrado'},
  ]
   return dataCardsAmount
} 

export default function CardsShow({data}) {
  const dataCardAmount = dataArrayCardsAmount(data)
  const formatedCardsAmount = formatAmount(dataCardAmount)

  return (
    <Grid container justify="center" className="bg-white rounded shadow-sm">
      <CardInfo number={formatNumberThousandsSeparator(data.creditsGiven)} title="Créditos Otorgados"/>   
       <CardInfo number={formatNumberThousandsSeparator(data.feesCollected)} title="Cuotas Cobradas"/>         
       <CardInfo number={data.averageDaysPastDue} title="Promedio Días de Mora"/>
      {
         formatedCardsAmount.map(card => <CardInfo key={card.title} number={card.amount} title={card.title}/>)
      }
        <CardInfo number={data.balances.cobrability} title="Cobrabilidad"/>
    </Grid>
  )
}

