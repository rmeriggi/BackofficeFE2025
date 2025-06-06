import React, { useState } from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import { Card, CardBody, CardHeader } from '../../../../../../_metronic/_partials/controls'
import { dataTaxValue, dataTypeValue, dataTaxValueCalc, dataTaxColector } from "../../utils/dataForColumnsResume"
import { AmountColumnFormatter } from '../column-formaters/AmountColumnFormatter'
import { TrxColumnFormatter } from '../column-formaters/TrxColumnFormatter'

const columnsValue = [
  {
    dataField: "value",
    text: "Valor del impuesto",
  },
  {
    dataField: "baseMin",
    text: "Base Minima",
  },
  {
    dataField: "baseMax",
    text: "Base Maxima",
  },
]

const columnsTypeValueCalc = [
  {
    dataField: "calc",
    text: "Calc",
  },
  {
    dataField: "formula",
    text: "formula",
  },
]

const columnsColector = [
  {
    dataField: "collectingAccount",
    text: "Cuenta Recaudadora",
  },
  {
    dataField: "transactionType",
    text: "Tipo de transacción",
  },
  {
    dataField: "discount",
    text: "Discount",
  },  
]

export default function TaxResumeFlap() {

  const [checkedTrx, setCheckedTrx] = useState(false)
  const handleChangeTrx = () => {
    setCheckedTrx(!checkedTrx)
  }
  const [checkedAmount, setCheckedAmount] = useState(false)
  const handleChangeAmount = () => {
    setCheckedAmount(!checkedAmount)
  }

  const columnsTypeValue = [
    {
      dataField: "type",
      text: "Tipo",
    },
    {
      dataField: "frecuency",
      text: "Frecuencia",
    },
    {
      dataField: "trx",
      text: "Trx",
      formatter: TrxColumnFormatter,
      formatExtraData: {
        checkedTrx,
        handleChangeTrx
    }
    },
    {
      dataField: "amount",
      text: "Importe",
      formatter: AmountColumnFormatter,
      formatExtraData: {
        checkedAmount,
        handleChangeAmount
    }
    },  
  ]

  return (
    <>
      <Card>
        <CardHeader title="Tax Value" />
        <CardBody>
          <BootstrapTable
            wrapperClasses="table-responsive"
            classes="table table-head-custom table-vertical-center overflow-hidden"
            bordered={false}
            bootstrap4
            remote
            keyField="id"
            data={dataTaxValue}
            columns={columnsValue}
          >
          </BootstrapTable>
        </CardBody>
      </Card>
      <Card>
        <CardHeader title="Tax Value Type" />
        <CardBody>
          <BootstrapTable
            wrapperClasses="table-responsive"
            classes="table table-head-custom table-vertical-center overflow-hidden"
            bordered={false}
            bootstrap4
            remote
            keyField="id"
            data={dataTypeValue}
            columns={columnsTypeValue}
          >
          </BootstrapTable>
        </CardBody>
      </Card>
      <Card>
        <CardHeader title="Tax Value Calc" />
        <CardBody>
          <BootstrapTable
            wrapperClasses="table-responsive"
            classes="table table-head-custom table-vertical-center overflow-hidden"
            bordered={false}
            bootstrap4
            remote
            keyField="id"
            data={dataTaxValueCalc}
            columns={columnsTypeValueCalc}
          >
          </BootstrapTable>
        </CardBody>
      </Card>
      <Card>
        <CardHeader title="Tax Collector" />
        <CardBody>
          <BootstrapTable
            wrapperClasses="table-responsive"
            classes="table table-head-custom table-vertical-center overflow-hidden"
            bordered={false}
            bootstrap4
            remote
            keyField="id"
            data={dataTaxColector}
            columns={columnsColector}
          >
          </BootstrapTable>
        </CardBody>
      </Card>
    </>
  )
}
