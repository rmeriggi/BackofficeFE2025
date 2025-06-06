/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */
import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { useSubheader } from "../../../../../../_metronic/layout";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls";
import { withLayoutSplashScreen } from "../../../../../HOCs/withLayoutSplashScreen";
import { oneCreditAdapter } from "../../../adapters/creditsAdapters";
import { useOneCredit } from "../../../Collections/utils/apiHook";
import AccountsData from "./AccountsData";
import ActivitiesRegisters from "./Flaps/ActivitiesRegister/ActivitiesRegisters";
import { CreditDetailInfo } from "./Flaps/CreditDetailInfo/CreditDetailInfo";
import { NewContactModal } from "./Flaps/CreditDetailInfo/modals/NewContactModal";

const CreditDetail= ({history, data}) => {

  const [tab, setTab] = useState("credit-detail");

  const suhbeader = useSubheader()
  suhbeader.setTitle("Detalle de crédito")

  const [showNewContactModal, setShowNewContactModal] = useState(false)
  const [creditData] = data

  const closeNewContactModal = () => {
    setShowNewContactModal(false)
  }

  const backToProductsList = () => {
    if(history.location.state?.from.includes("/clients/clients/edit/")){
      history.push(`/clients/clients/edit/${history.location.state.id}`, {tab : "credit"})
    }else{
      history.goBack()
    }
  };

  const credit = oneCreditAdapter(creditData.credit);

  return (
    <Card>
      <CardHeader>
        <CardHeaderToolbar className="w-100 justify-content-between flex-nowrap">
          <AccountsData idClient={credit.idClient}/>
          <div>
            <Button
              variant="outlined"
              color="secondary"
              className="mr-3"
              size="large"
              onClick={backToProductsList}
            >
              Volver
            </Button>
          </div> 
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
      <h5>Nro. de Crédito: {credit.id}{history.location.state ? " - " + history.location.state.originalId : ""} - Gestor: {credit.user.name}</h5>
        <ul className="nav nav-tabs nav-tabs-line " role="tablist">
          <li className="nav-item" onClick={() => setTab("credit-detail")}>
            <a
              className={`nav-link ${tab === "credit-detail" && "active"}`}
              data-toggle="tab"
              role="tab"
              aria-selected={(tab === "credit-detail").toString()}
            >
              Detalle crédito
            </a>
          </li>
          <li className="nav-item" onClick={() => setTab("activities")}>
            <a
              className={`nav-link ${tab === "activities" && "active"}`}
              data-toggle="tab"
              role="tab"
              aria-selected={(tab === "activities").toString()}
            >
              Registro de actividades
            </a>
          </li>
        </ul>
        
        <div className="mt-5">
          {tab === "credit-detail" && (
          
            <CreditDetailInfo
              creditDetail={credit}
              idClient={credit.idClient}
            />
          )}
          {tab === "activities" && (
           <ActivitiesRegisters />
          )}
        </div>
        <NewContactModal 
          show={showNewContactModal} 
          onHide={closeNewContactModal} 
        />
      </CardBody>
    </Card>
  );
}

const hooks = [
  {
    hook: useOneCredit,
    params: "id"
  }
]

export default withLayoutSplashScreen(CreditDetail, hooks)