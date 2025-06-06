import { Button } from '@material-ui/core'
import React from 'react'
import { ModalWrapper } from '../../../../components/ModalWrapper'
import { formatNumberToMoney } from '../../../../utils/formatData'
import moment from "moment";

const convertToArray =(obj) => {
  return [
    {
      name : "Descripción",
      description: obj.name
    },
    {
      name: "Moneda",
      description: obj.idCurrency
    },
    {
      name: "Importe",
      description: `$${formatNumberToMoney(obj.amount)}`
    },
    {
      name: "Tarjetas",
      description: obj.cards || "-"
    },
    {
      name: "Vencimiento",
      description: moment(obj.expirationDate).format('DD/MM/YY')
    },
    {
      name: "Dni Cliente",
      description: obj.clientDni || "-"
    },
    {
      name: "Porcentaje Activo",
      description: obj.activePercentage
    },
  ]
}

const ModalDetail = ({ show, onHide, dataModal }) => {

  if(!dataModal) return null

  const details = convertToArray(dataModal)

  return (
    <ModalWrapper
      show={show}
      onHide={onHide}
      title="Detalle Link de pago"
      footer={() =>
        (
        <Button
          variant="outlined"
          color="secondary"
          size="large"
          onClick={() => onHide()}
        >
          Volver
        </Button>)
      }
    >
      {
        details.map((d,i ) => <Boxes key={i} name={d.name} description={d.description}/>)
      }
    </ModalWrapper>
  )
}

const Boxes = ({name, description}) => {
  return (
    <div className="my-3">
      <h6>{name}</h6>
      <span>{description}</span>
    </div>
  )
}

export default ModalDetail