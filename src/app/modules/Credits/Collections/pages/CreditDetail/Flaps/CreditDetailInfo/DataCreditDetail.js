/* eslint-disable eqeqeq */
import React from "react";
import moment from "moment";
import { Button } from "@material-ui/core";
import { useAllProducts } from "../../../../../Products/utils/apiHook";
import { LayoutSplashScreen } from "../../../../../../../../_metronic/layout";
import useIsMountedRef from "../../../../../../../hooks/useIsMountedRef";
import { useStatusCredits } from "../../../../../Credits/utils/apiHook";
import { formatAmountFromString } from "../../../../../../../utils/formatData";
import { productsAdapter } from "../../../../../adapters/productsAdapter";
import  PaymentPlan  from "../../../../components/PaymentPlan";
import { useModal } from "../../../../../../../hooks/useModal";

export function DataCreditDetail({values, openModal, setAction, quotasDetail}) {

  const isMounted = useIsMountedRef();
  const [productsData, productsCompleted] = useAllProducts(isMounted, {idEntity:0, idCurrency:0});
  const [status, statusCompleted] = useStatusCredits(isMounted);
  const [show, openModalPaymentPlan, closeCollectionModal] = useModal()

  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() + 1 - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getMonth() < birthDate.getMonth())) {
        age--;
    }
    return age;
}
  

  if(!(productsCompleted && statusCompleted)) return <LayoutSplashScreen />

  const products =  productsAdapter(productsData.products);
  const { creditsStatus } = status;

  const productName = products?.find(p => p.id == values.product)?.product || "Sin datos";
  const statusName = creditsStatus?.find(s => s.id == values.status)?.status || "Sin datos";

  const {  
    date,
    amount,
    quota,
    tna, 
    pending
  } = values

  
   const totalExigible = (quotasDetail?.filter((credit)=> getAge(credit.expiration)===0).map((e) => e.pending).reduce((pv, cv) => pv + cv, 0))?.toFixed(2) || ''
   

  const totalExpenses = quotasDetail?.map((e) => e.expenses).reduce((pv, cv) => pv + cv, 0)?.toFixed(2) || ''
  const totalPunitive = (quotasDetail?.map((e) => e.punitive).reduce((pv, cv) => pv + cv, 0))?.toFixed(2) || ''

  return (
    <div className="py-10 my-5 border-bottom">
      <div className="row"> 
        <p className="col-4 text-muted">Producto crédito: <span className="text-dark">{productName}</span> </p>
        <p className="col-3 text-muted">Fecha de otorgamiento: <span className="text-dark">{moment(date).utc().format('DD/MM/YYYY')}</span> </p>
        <p className="col-3 text-muted">Importe: <span className="text-dark">$ {formatAmountFromString(amount)}</span> </p>
        <p className="col-2 text-muted">Cantidad de cuotas: <span className="text-dark">{quota}</span> </p>
      </div>
      <div className="row d-flex d-flex align-items-baseline">
        <p className="col-2 d-flex flex-column text-muted">
          Estado del credito: 
          <span className="text-dark mt-1">
            {statusName}
          </span>
        </p>
        <p className="col-2 d-flex flex-column text-muted">
          TNA: 
          <span className="text-dark mt-1">
            {tna} %
          </span>
        </p>
        <div className="col-2 d-flex flex-column text-muted">
          Total Gastos: 
          <div className={'d-flex justify-content-start label label-inline label-lg  label-light-warning'}>
            <span>$</span>
            <span>{formatAmountFromString(totalExpenses)} </span>
          </div>
        </div>
        <div className="col-2 d-flex flex-column text-muted">
          Total Punitorios: 
          <div className={'d-flex justify-content-start label label-inline label-lg  label-light-warning'}>
            <span>$</span>
            <span>{formatAmountFromString(totalPunitive)}</span>
          </div>
        </div>
        <div className="col-2 d-flex flex-column text-muted">
          Total pendiente: 
          <div className={'d-flex justify-content-start label label-inline label-lg  label-light-warning'}>
            <span>$</span>
            <span>{formatAmountFromString(pending)}</span>
          </div>
        </div>
        <div className="col-2 d-flex flex-column text-muted">
          Importe exigible: 
          <div className={'d-flex justify-content-start label label-inline label-lg  label-light-success'}>
            <span>$</span>
            <span>{formatAmountFromString(totalExigible)}</span> 
          </div>
        </div>
      </div>
      <div className="row justify-content-end mt-5">
        <PaymentPlan show={show} setOpen={openModalPaymentPlan} onHide={closeCollectionModal}/>
        <Button
          variant="contained"
          color="secondary"
          className="ml-2"
          size="large"
          onClick={openModalPaymentPlan}
        >
          PLAN DE PAGO
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className="ml-2"
          size="large"
          onClick={()=>{
            openModal()
            setAction(2)
          }}
        >
          CANCELAR DEUDA
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className="ml-2"
          size="large"
          onClick={()=>{
            openModal()
            setAction(3)
          }}
        >
          CANCELACI&Oacute;N ANTICIPADA
        </Button>
      </div>
    </div>
  );
}