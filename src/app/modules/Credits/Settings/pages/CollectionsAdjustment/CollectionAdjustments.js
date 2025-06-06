import React, { useState }  from "react";
import Listing from "./Listing"
import { Button} from '@material-ui/core';  
import { AdjustmentModal } from "./modals/AdjustmentModal"
import { CollectionAdjustmentForm } from "./CollectionAdjustmentForm";
import useIsMountedRef from "../../../../../hooks/useIsMountedRef";
import { useAllQuotaStatus } from "../../../Wallets/utils/apiHooks";
import {formatAmountFromString} from "../../../../../utils/formatData"
import { ListingTableContextProvider } from './Listing/ListingTableContext';
import {Card,CardBody,CardHeader,CardHeaderToolbar,} from "../../../../../../_metronic/_partials/controls";
import { LayoutSplashScreen } from "../../../../../../_metronic/layout";
import { useAllProducts } from "../../../Products/utils/apiHook";
import { assignLost, forgiveDebt, getInstallmentsList } from "../../utils/service";
import { productsAdapter, quotaStatusAdapter } from "../../../adapters";

export function CollectionAdjustments() {

  const isMounted = useIsMountedRef();
  const [showModal, setShowModal] = useState(false)
  const [quotaStatus, quotaStatusCompleted] = useAllQuotaStatus(isMounted);
  const [productsData, productsCompleted] = useAllProducts(isMounted, {idEntity:0, idCurrency:0})
  const [values, setValues] = useState({totalAmount: "", installments: []});  
  const [requestValues, setRequestValues] = useState()
  const [progress, setProgress] = useState(false);
  const [modalInfo, setModalInfo] = useState();
  const [action, setAction] = useState()
  const [id, setId] = useState()

  const openModal = (action, id) => {
    setAction(action)
    setShowModal(true)
    if(id){
      setId(id)
    }
  }

  const closeModal = () => {
    setShowModal(false)
  }


  const getInstallments = async(values) => {
    const response = await getInstallmentsList(values)
    setValues(response.listCollections)
    setProgress(false)
  }

  const getForgiveDebtModalInfo = async(values) => {
    const requestValues = {
      ...values,
      excecute: 0
    }
    const response = await forgiveDebt(requestValues)
    setModalInfo(response)
    openModal(1)
  }

  const getAssignLostModalInfo = async(values) => {
    const requestValues = {
      ...values,
      excecute: 0
    }
    const response = await assignLost(requestValues)
    setModalInfo(response)
    openModal(2)
  }
  
  if (!(quotaStatusCompleted &&
    productsCompleted)) {
      return <LayoutSplashScreen />;
    }
    
  const {totalAmount, installments} = values
  const quotasStatus = quotaStatusAdapter(quotaStatus.quotasStatus) 
  const products = productsAdapter(productsData.products) 

  return (
    <Card>
      <CardHeader title={`Total a Asignar $${formatAmountFromString(totalAmount)}`}>
        <CardHeaderToolbar>  
          <div> 
            <Button 
              variant="outlined" 
              color="secondary"  
              className="ml-4"  
              onClick={()=> {
                getForgiveDebtModalInfo(requestValues, 1)
              }}
            > 
              Condonar 
            </Button>  
          </div> 
          <div> 
            <Button 
              variant="outlined" 
              color="secondary" 
              type="submit" 
              className="ml-4" 
              onClick={()=> {
                getAssignLostModalInfo(requestValues, 0)
              }}
            >
              Asignar Pérdida 
            </Button>  
          </div>  
          <AdjustmentModal 
            show={showModal}
            onHide={closeModal}              
            values={requestValues}
            modalInfo={modalInfo}
            action={action}
            id={id}
          />
        </CardHeaderToolbar>  
      </CardHeader> 
      <CardBody>
        <div className="mt-5">
          <CollectionAdjustmentForm
            products={products}
            quotaStatus={quotasStatus}
            setValues={setValues}
            getInstallments={getInstallments}
            progress={progress}
            setProgress={setProgress}
            setRequestValues={setRequestValues}
          />
          <ListingTableContextProvider>
            <Listing 
              installments={installments}
              setModalInfo={setModalInfo}
              openModal={openModal}
            />
          </ListingTableContextProvider>
        </div>
      </CardBody>
    </Card>
  );
}