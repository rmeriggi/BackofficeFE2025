import React, { useState } from "react";
import { Card, CardBody, CardHeader} from "../../../../../../_metronic/_partials/controls";
import { AssignWalletEditForm } from "./AssignWalletEditForm";
import { useAssignWallet, useAllQuotaStatus} from "../../utils/apiHooks";
import { LayoutSplashScreen, useSubheader } from '../../../../../../_metronic/layout';
import  useIsMountedRef  from '../../../../../../app/hooks/useIsMountedRef';
import { ConfirmationModal } from "../components/confirmationModal";
import { useAllProducts } from "../../../Products/utils/apiHook";
import { quotaStatusAdapter } from "../../../adapters/quotaStatusAdapter";
import { managersAdapter } from "../../../adapters/managersAdapter";
import { productsAdapter } from "../../../adapters";
import { useCallAPI } from "../../../../../hooks";
import { getAllUsers } from "../../../../../utils/service";

export function AssignWallet() {

  const isMounted = useIsMountedRef();
  const suhbeader = useSubheader()
  suhbeader.setTitle("Asignar Cartera")

  const [dataToAssignWallet, dataToAssignWalletCompleted] = useAssignWallet(isMounted);
  const [productsData, productsCompleted] = useAllProducts(isMounted, {idEntity:0, idCurrency:0})
  const [quotaStatus, quotaStatusCompleted] = useAllQuotaStatus(isMounted);
  const [managers, setManagers] = useState(isMounted);
  const [assignList, setAssignList] = useState()
  const [values, setValues] = useState()

  useCallAPI(getAllUsers, setManagers)

  const [showConfirmationModal, setShowConfirmationModal] = useState(false)

  const openConfirmationModal = (assignList, values) => {
    setAssignList(assignList)
    setValues(values)
    setShowConfirmationModal(true)
  }
  const closeModal = () => {
    setShowConfirmationModal(false)
  }

  if (!(
        dataToAssignWalletCompleted &&
        productsCompleted &&
        quotaStatusCompleted &&
        managers
      )) {
      return <LayoutSplashScreen />;
  }
  const quotasStatus = quotaStatusAdapter(quotaStatus.quotasStatus)
  const users = managersAdapter(managers.users)
  const products = productsAdapter(productsData.products) 

  return (
    <Card>
      <CardHeader title={`Créditos sin asignar: ${dataToAssignWallet}`}/>
      <CardBody>
        <div className="mt-5">
          <AssignWalletEditForm
            products={products}
            creditStatus={quotasStatus}
            managers={users}
            openModal={openConfirmationModal}
          />
        </div>
      </CardBody>
      <ConfirmationModal show={showConfirmationModal} onHide={closeModal} assignList={assignList} values={values}/>
    </Card>
  );
}