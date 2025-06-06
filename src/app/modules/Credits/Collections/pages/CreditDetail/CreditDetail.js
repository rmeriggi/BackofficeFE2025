/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */
import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { LayoutSplashScreen, useSubheader } from "../../../../../../_metronic/layout";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls";
import { AccountsData } from "./AccountsData";
import ActivitiesRegisters from "./Flaps/ActivitiesRegister/ActivitiesRegisters";
import Contact from "./Flaps/Contact/Contact";
import { CreditDetailInfo } from "./Flaps/CreditDetailInfo/CreditDetailInfo";
import { NewContactModal } from "./Flaps/CreditDetailInfo/modals/NewContactModal";
import { useManagmentStatus, useOneCredit } from "../../utils/apiHook";
import useIsMountedRef from "../../../../../hooks/useIsMountedRef";
import { useParams } from "react-router-dom";
import { oneCreditAdapter } from "../../../adapters/creditsAdapters";
import { managmentStatusAdapter } from "../../../adapters";

export function CreditDetail({history}) {
  
  const [tab, setTab] = useState("credit-detail");
  
  const isMounted = useIsMountedRef();
  const { id } = useParams();
  const suhbeader = useSubheader()
  suhbeader.setTitle("Detalle de crédito")

  

  const [showNewContactModal, setShowNewContactModal] = useState(false)

  const [creditData, creditCompleted] = useOneCredit(isMounted, id)
  const [managmentStatus, managmentCompleted] = useManagmentStatus(isMounted, 0)

  const openNewContactModal = (id) => {
    setShowNewContactModal(true)
  }
  const closeNewContactModal = () => {
    setShowNewContactModal(false)
  }

  const backToProductsList = () => {
    history.push(`/credits/management`);
  };

  if(!(creditCompleted && managmentCompleted)) return <LayoutSplashScreen />

  const credit    = oneCreditAdapter(creditData.credit);
  const managment = managmentStatusAdapter(managmentStatus)

  return (
    <Card>
      <CardHeader>
        <CardHeaderToolbar className="w-100 justify-content-between flex-nowrap">
          <AccountsData idClient={credit.idClient}/>
          <div className="d-flex flex-nowrap" style={{height: '40px'}}>
            <Button
              variant="outlined"
              color="secondary"
              className="mr-3"
              onClick={backToProductsList}
            >
              Volver
            </Button>
            <Button
              variant="contained"
              color="secondary"
              className="ml-2"
              onClick={openNewContactModal}
            >
              Nuevo Contacto
            </Button>
          </div> 
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
      <h5>Nro. de Crédito: {credit.id}{credit.originalId ? " - " + credit.originalId : ""} - Gestor: {credit.user.name}</h5>
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
           <ActivitiesRegisters idClient={credit.idClient}/>
          )}
          {tab === "contact" && (
           <Contact idClient={credit.idClient}/>
          )}
        </div>
        <NewContactModal 
          show={showNewContactModal} 
          onHide={closeNewContactModal} 
          idClient={credit.idClient}
          managmentStatus={managment}
        />
      </CardBody>
    </Card>
  );
}

