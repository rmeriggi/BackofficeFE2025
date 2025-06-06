import moment from 'moment'
import React from 'react'
import { formatNumberToMoney } from '../../../../utils/formatData'

export const ProofOfPayment = ({dataModal}) => {
  
  const { 
    dateValue, 
    event, 
    indicator, 
    longEventDescription, 
    movementDate, 
    movementPassword, 
    shortEventDescription, 
    ticketNumber, 
    value
  } = dataModal

  const arr = [
    {
      title: indicator === "+" ? "Débito" : "Crédito",
      data: `$ ${formatNumberToMoney(value)}`
    },
    {
      title: "Fecha valor",
      data: moment(dateValue).format('DD/MM/YY')
    },
    {
      title: "Acontecimiento",
      data: event
    },
    {
      title: "Movimiento",
      data: longEventDescription
    },
    {
      title: "Fecha Movimiento",
      data:  moment(movementDate).format('DD/MM/YY')
    },
    {
      title: "Clave Movimiento",
      data: movementPassword
    },
    {
      title: "Descripción Acontecimiento Corto",
      data: shortEventDescription
    },
    {
      title: "Número de ticket",
      data: ticketNumber
    },
    {
      title: "CBU CUIT owner",
      data: null
    }
  ]
  return (
    <div>
      {
        arr.map(o => <LittleBoxes key={o.title} title={o.title} data={o.data}/>)
      }
    </div>
  )
}

function LittleBoxes({title, data}) {
  return (
    <div>
      <h6>{title}</h6>
      <p>{data}</p>
  </div>
  )
  
}
