import React, {useState} from 'react'
import { useParams } from "react-router";
import { Button } from '@material-ui/core'
import BootstrapTable from 'react-bootstrap-table-next'
import useIsMountedRef from '../../../../../hooks/useIsMountedRef'
import CreateTaxWhoModal from '../modals/CreateTaxWhoModal'
import CreateTaxWhereModal from '../modals/CreateTaxWhereModal'
import TaxWhoColumnFormatter from '../column-formaters/TaxWhoColumnFormatter'
import TaxWhereColumnFormatter from '../column-formaters/TaxWhereColumnFormatter'
import { useAllWhere, useAllWho } from '../../utils/apiHooks'
import { LayoutSplashScreen } from '../../../../../../_metronic/layout'
import { deleteTaxWhere, deleteTaxWho } from '../../utils/service'
import { TableNoRecordsFoundMessage } from '../../../../../components/TableNoRecordsFound'
import { Card, CardBody, CardHeader, CardHeaderToolbar } from '../../../../../../_metronic/_partials/controls'


export default function TaxW() {
  const { id } = useParams()
  const [showWhere, setShowWhere] = useState(false)
  const [showWho, setShowWho] = useState(false)
  const isMounted = useIsMountedRef();
  const [dataTaxWhere, dataTaxWhereCompleted] = useAllWhere(isMounted, id);
  const [dataTaxWho, dataTaxWhoCompleted] = useAllWho(isMounted, id);

  if (!(dataTaxWhereCompleted &&
      dataTaxWhoCompleted)) {
      return <LayoutSplashScreen />;
  }

  const who  = dataTaxWho.length !== 0 ? dataTaxWho.who : [] 
  const where  = dataTaxWhere.length !== 0 ? dataTaxWhere.where : []

  const deleteWhereData = async(id) =>{
    try {
      await deleteTaxWhere(id)
    } catch (error) {
      console.error(error)
    }
  }

  const deleteWhoData = async(id) => {
    try {
      await deleteTaxWho(id)
    } catch (error) {
      console.error(error)
    }
  }

  const columnsWhere = [
    {
      dataField: "transactionType",
      text: "Tipo de movimiento",
    },
    {
      dataField: "",
      text: "Accion",
      formatter: TaxWhereColumnFormatter,
      formatExtraData: {
        deleteWhereData
      }
    },
  ]

  const columnsWho = [
    {
      dataField: "idtaxclient",
      text: "tax client",
    },
    {
      dataField: "",
      text: "Accion",
      formatter: TaxWhoColumnFormatter,
      formatExtraData: {
        deleteWhoData
      }
    },
  ]

  const openCreateTaxWhere = () => {
    setShowWhere(true)
  }
  const closeCreateTaxWhere = () => {
    setShowWhere(false)
  }

  const openCreateTaxWho = () => {
    setShowWho(true)
  }

  const closeCreateTaxWho = () => {
    setShowWho(false)
  }

  return (
    <>
      <Card>
        <CardHeader title="Tax Where">
          <CardHeaderToolbar>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={()=> openCreateTaxWhere()}
              >
              Crear Tax Where
            </Button>
          </CardHeaderToolbar>
        </CardHeader>
        <CardBody>
          <CreateTaxWhereModal
            show={showWhere}
            onHide={closeCreateTaxWhere}
          />
          {where.length === 0 ? (
            <TableNoRecordsFoundMessage entities={"where"}/>
          ): (
            <BootstrapTable
              wrapperClasses="table-responsive"
              classes="table table-head-custom table-vertical-center overflow-hidden"
              bordered={false}
              bootstrap4
              remote
              keyField="id"
              data={where}
              columns={columnsWhere}
            >
            </BootstrapTable>
          )}
        </CardBody>
      </Card>
      <Card>
      <CardHeader title="Tax Who">
        <CardHeaderToolbar>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={()=> openCreateTaxWho()}
            >
            Crear Tax Who
          </Button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <CreateTaxWhoModal
          show={showWho}
          onHide={closeCreateTaxWho}
        />
        {who.length === 0 ? (
          <TableNoRecordsFoundMessage entities={"who"}/>
        ): (
          <BootstrapTable
            wrapperClasses="table-responsive"
            classes="table table-head-custom table-vertical-center overflow-hidden"
            bordered={false}
            bootstrap4
            remote
            keyField="id"
            data={who}
            columns={columnsWho}
          >
          </BootstrapTable>
        )}
      </CardBody>
    </Card>
   </>
  )
}
