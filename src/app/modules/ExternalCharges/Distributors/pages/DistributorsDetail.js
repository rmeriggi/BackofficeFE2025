/* eslint-disable eqeqeq */
import React from 'react'
import { ListingTableContextProvider } from './Listing/ListingTableContext'
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { Button } from "@material-ui/core";
import { distributorsAdapter } from "../adapters/distributorsAdapter";
import { useDistributors } from "../utils/apiHooks";
import { LayoutSplashScreen } from "../../../../../_metronic/layout";
import { useHistory } from "react-router";
import useIsMountedRef from "../../../../hooks/useIsMountedRef";
import moment from "moment";


export default function DistributorsDetail (id) {

const isMountedRef = useIsMountedRef()
const [distributorsData, distributorsCompleted] = useDistributors(isMountedRef)
const history = useHistory();
const idDistributor = Number(id.match.params.id); 
const distributors = distributorsAdapter(distributorsData)
const oneDistributor = distributors.find( sa => sa.id == idDistributor)

if(!distributorsCompleted) return <LayoutSplashScreen />

  return (
    <ListingTableContextProvider>
     <Card>
       <CardHeader>
       
        <CardHeaderToolbar className="w-100 justify-content-between flex-nowrap">
          <div className='d-flex '> 
            <span className='text-muted p-1'>Id: <span className="text-dark">{oneDistributor.id} </span> </span>
            <span className='text-muted p-1'>Distribuidor:    <span className="text-dark">{oneDistributor.distributorId} </span></span>
            <span className='text-muted p-1'>Cliente: <span className="text-dark">{oneDistributor.idClient} - {oneDistributor.clientName} </span> </span>
            <span className='text-muted p-1'>Descripción:<span className="text-dark"> {oneDistributor.name} </span> </span>
            <span className='text-muted p-1'>Moneda: <span className="text-dark">{oneDistributor.idCurrency} </span> </span>
            <span className='text-muted p-1'>Importe:<span className="text-dark"> ${oneDistributor.amount} </span> </span>
          </div>

          <Button
              variant="outlined"
              color="secondary"
              className="mr-3"
              onClick={(e)=>{
                history.goBack();
              }}  
              size="large"
            >
              Volver
            </Button>         
        
        </CardHeaderToolbar>
       </CardHeader>
       <CardBody>

       <div className="row" style={{paddingTop: "15px"}}> 
        <p className="col-3 text-muted">Vencimiento: <span className="text-dark"> {moment(oneDistributor.expirationDate).utc().format('DD/MM/YYYY')}</span> </p>
        <p className="col-3 text-muted">Acuerdo: <span className="text-dark">{oneDistributor.agreementId}</span> </p> 
        <p className="col-3 text-muted">Tarjeta: <span className="text-dark">{oneDistributor.cards}</span> </p>
        <p className="col-3 text-muted">Usuario Distribuidor: <span className="text-dark"> {oneDistributor.distributorUser}</span> </p>
      </div>
      <div className="row"> 
        <p className="col-3 text-muted">Días: <span className="text-dark"> {oneDistributor.days}</span> </p>        
        <p className="col-3 text-muted">Método de Pago: <span className="text-dark">{oneDistributor.paymentMethod}</span> </p>
        <p className="col-3 text-muted">Cantidad: <span className="text-dark">{oneDistributor.quantity}</span> </p>               
        <p className="col-3 text-muted">Referencia: <span className="text-dark">{oneDistributor.reference}</span> </p>
        </div>
      <div className="row">         
        <p className="col-3 text-muted">Voucher AFIP: <span className="text-dark">{oneDistributor.voucherAfip}</span> </p>
        <p className="col-3 text-muted">Voucher: <span className="text-dark">{oneDistributor.vocuher}</span> </p> 
       </div>
    
       </CardBody>
     </Card>
    </ListingTableContextProvider>
  )
}