import React from 'react'
import { ProgressBar } from '../../../../components'
import { formatMoney } from '../../../../utils/formatData'
import CollectionsProgressBar from './CollectionsProgressBar'

function progressBar(transactions){
  const {actualMonth, lastMonth} = transactions

  let actualMonthValue
  let lastMonthValue
  if(actualMonth.value < lastMonth.value){
    lastMonthValue = 100
    actualMonthValue = actualMonth.value * 100 / lastMonth.value
  }else{
    actualMonthValue = 100
    lastMonthValue= lastMonth.value * 100 / actualMonth.value
  }
  const dataBar = [
  {title : "Este mes", progress: actualMonthValue, color: "#1F96EF", value: actualMonth.value},
  {title : "Mes anterior", progress: lastMonthValue, color: "#8E76E6", value: lastMonth.value},
  ]
  return dataBar
} 
export default function FooterBarGraphic({transactions}) {
  const {average, best} = transactions
  const dataProgressBar = progressBar(transactions)

  return (
    <>
    <div className="d-flex justify-content-between mt-5 py-3 px-4 border-top border-bottom">
      <p className="m-0"><span className="text-uppercase text-muted mr-3">Mejor Día</span>
        {best}
      </p>
      <p className="m-0"><span className="text-uppercase text-muted mr-3">Promedio</span>
        {average}
      </p>
      
    </div>
    {
      dataProgressBar.map(data => 
        <ProgressBar 
          key={data.title} 
          title={data.title} 
          progress={data.progress} 
          color={data.color} 
          value={data.value}/>)
    }
    </>
  )
}

export const  CollectionsFooterBarGraphic = ({transactions}) => {
  const {average, best} = transactions
  const dataProgressBar = progressBar(transactions)

  return (
    <>
    <div className="d-flex justify-content-between mt-5 py-3 px-4 border-top border-bottom">
      <p className="m-0"><span className="text-uppercase text-muted mr-3">Mejor Día</span>
        {formatMoney((best).toFixed(2))}
      </p>
      <p className="m-0"><span className="text-uppercase text-muted mr-3">Promedio</span>
        {formatMoney((average).toFixed(2))}
      </p>
    </div>
    {
      dataProgressBar.map(data => 
        <CollectionsProgressBar 
          key={data.title} 
          title={data.title} 
          progress={data.progress} 
          color={data.color} 
          value={data.value}/>)
    }
    </>
  )
}
