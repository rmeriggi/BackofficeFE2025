import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import BootstrapTable from "react-bootstrap-table-next";
import {getDetailCollection} from "../../../../../utils/service"
import { detailCollectionAdapter } from '../../../../../../adapters/detailCollectionAdapter';
import { AmountColumnFormatter } from '../../../../../../../../utils/column-formatter/AmountColumnFormatter'
import { DateColumnFormatter } from '../../../../../../../../utils/column-formatter/DateColumnFormatter';
import { TableNoRecordsFoundMessage } from '../../../../../../../../components/TableNoRecordsFound';

const columns = [
  {
    dataField: "movementType",
    text: "Tipo de movimiento",
    classes: 'text-center',
    headerClasses: 'text-center',
  },
  {
    dataField: "movementDate",
    text: "Fecha de movimiento",
    classes: 'text-center',
    headerClasses: 'text-center',
    formatter: DateColumnFormatter
  },
  {
    dataField: "paymentChanel",
    text: "Canal de pago",
    classes: 'text-center',
    headerClasses: 'text-center',
  },
  {
    dataField: "methodOfPayment",
    text: "Forma de pago",
    classes: 'text-center',
    headerClasses: 'text-center',
  },
  {
    dataField: "investment",
    text: "Capital",
    formatter: AmountColumnFormatter,
    classes: 'text-center',
    headerClasses: 'text-center',
  },
  {
    dataField: "interest",
    text: "Intereses",
    formatter: AmountColumnFormatter,
    classes: 'text-center',
    headerClasses: 'text-center',
  },
  {
    dataField: "expenses",
    text: "Gastos",
    formatter: AmountColumnFormatter,
    classes: 'text-center',
    headerClasses: 'text-center',
  },
  {
    dataField: "punitives",
    text: "Punitorios",
    formatter: AmountColumnFormatter,
    classes: 'text-center',
    headerClasses: 'text-center',
  },
  {
    dataField: "totalAmount",
    text: "Monto total",
    formatter: AmountColumnFormatter,
    classes: 'text-center',
    headerClasses: 'text-center',
  },
]

export const CollectionDetailModal = ({show,onHide, id, idCredit, quotaNumber}) => {

  const [detailCollection, setDetailCollection] = useState([])

  useEffect(() => {
    const getCollection = async() => {
      try {
        const responseCollection = await getDetailCollection(idCredit, quotaNumber)
        const collection = detailCollectionAdapter(responseCollection)
        setDetailCollection(collection)
      } catch (error) {
        setDetailCollection([])
      }
    }
    if(id !== "" && idCredit !== ""){
      getCollection()
    } 
  }, [idCredit, quotaNumber, id])

  if(!(id && idCredit)) return null

  return (
    <Modal
    show={show}
    onHide={onHide}
    onExited={() => setDetailCollection([])}
    aria-labelledby="example-modal-sizes-title-lg"
    size="xl"
  >
    <Modal.Header closeButton>
      <Modal.Title id="example-modal-sizes-title-lg">
        Detalle de cobranza
      </Modal.Title>
    </Modal.Header>
    <Modal.Body className="overlay overlay-block cursor-default">
      {/*begin::Loading*/}
      {detailCollection.length === 0 ? (
        <TableNoRecordsFoundMessage entities={"Detalle de la cobranza"}/>
      ) : (
        <BootstrapTable
          keyField="id"
          data={ detailCollection }
          columns={ columns }
          striped
          condensed
        /> 
      )}
    </Modal.Body>
  </Modal>
  )
}
