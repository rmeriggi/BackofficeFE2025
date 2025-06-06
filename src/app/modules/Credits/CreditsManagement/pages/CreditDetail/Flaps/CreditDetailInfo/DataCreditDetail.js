/* eslint-disable eqeqeq */
import React from "react";
import {Button} from "@material-ui/core";
import moment from "moment";
import { useAllProducts } from "../../../../../Products/utils/apiHook";
import { useStatusCredits } from "../../../../utils/apiHook";
import { useModal } from "../../../../../../../hooks/useModal";
import { InputPaymentModal } from "./modals/ImputePaymentModal";
import { withLayoutSplashScreen } from "../../../../../../../HOCs/withLayoutSplashScreen";
import { formatAmountFromString } from "../../../../../../../utils/formatData";
import { useParams } from "react-router-dom";


const DataCreditDetail = ({values, data, quotasDetail}) => {

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
  

  const [show, openImputePayment, closeModal] = useModal()
  const [status, productsData ] = data
  const { products } = productsData;
  const { creditsStatus } = status;
  const { id } = useParams()

  const productName = products.find(p => p.id == values.product)?.product || "Sin datos";
  const statusName = creditsStatus.find(s => s.id == values.status)?.status || "Sin datos";
  const totalExigible = (quotasDetail?.filter((credit)=> getAge(credit.expiration)===0).map((e) => e.pending).reduce((pv, cv) => pv + cv, 0))?.toFixed(2) || ''
  const totalExpenses = quotasDetail?.map((e) => e.expenses).reduce((pv, cv) => pv + cv, 0)?.toFixed(2) || ''
  const totalPunitive = (quotasDetail?.map((e) => e.punitive).reduce((pv, cv) => pv + cv, 0))?.toFixed(2) || ''

  const {  
    date,
    amount,
    quota,
    tna,
    pending
  } = values

  return (
    <div className="py-10 my-5 border-bottom">
      <div className="row"> 
        <p className="col-3 text-muted">Producto crédito: <span className="text-dark">{productName}</span> </p>
        <p className="col-3 text-muted">Fecha de otorgamiento: <span className="text-dark">{moment(date).utc().format('DD/MM/YYYY')}</span> </p>
        <p className="col-3 text-muted">Importe: <span className="text-dark">$ {Number(amount).toLocaleString("de-DE", {minimumFractionDigits: 2})}</span> </p>
        <p className="col-3 text-muted">Cantidad de cuotas: <span className="text-dark">{quota}</span> </p>
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
        <Button      
          disabled={pending > 0}  
          variant="contained"
          color="secondary" 
          style={{marginRight:'20px'}}             
          onClick={()=>{
            let a = document.createElement('a')
            a.href=`https://myhnt.info/formularios/ta/index.php?id=${id}`;
            a.target = "_blank"
            a.rel="noopener noreferrer" 
            a.click()
          }}
          >
          Libre Deuda
          </Button>
          <Button        
            variant="contained"
            color="secondary" 
            style={{marginLeft:'0px'}} 
            onClick={() => openImputePayment()}
            >
            Imputar pago
              </Button>
              <InputPaymentModal
                onHide={closeModal}
                show={show} 
                pending = {pending}
              /> 
          </div>        
    
    </div>
  );
}

const hooks = [
  {
    hook: useStatusCredits
  },
  {
    hook: useAllProducts,
    params: {idEntity: 0, idCurrency: 0}
  },
]
export default withLayoutSplashScreen(DataCreditDetail, hooks)