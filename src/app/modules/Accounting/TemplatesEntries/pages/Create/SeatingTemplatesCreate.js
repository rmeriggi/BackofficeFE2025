/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */
import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls";
import { SeatingTemplatesCreateForm } from "./SeatingTemplatesCreateForm";
import { initialParamsAccounts, initialParamsAuxAccounts, initialParamsSubaccounts } from "../../../initialParams";
import useIsMountedRef from "../../../../../hooks/useIsMountedRef";
import { useAllModules } from "../../utils/apiHook";
import { getAllAccounts } from "../../../Accounts/utils/service";
import { getAllSubaccounts } from "../../../Subaccounts/utils/service";
import { getAllAuxAccounts } from "../../../AuxiliaryAccounts/utils/service";
import { LayoutSplashScreen } from "../../../../../../_metronic/layout";

export function SeatingTemplatesCreate({history}) {

  const isMountedRef = useIsMountedRef();

  const [accountsData, setAccountsData] = useState();  
  const [subaccountsData, setSubaccountsData] = useState()
  const [auxParams] = useState(initialParamsAuxAccounts)
  const [auxiliaryAccountsData, setAuxiliaryAccountsData] = useState()
  const [modulesData, modulesDataCompleted] = useAllModules(isMountedRef)

  useEffect(() => {
    const getAccounts = async () => {
    const response = await getAllAccounts(initialParamsAccounts)
    setAccountsData(response)
    }
    getAccounts()
  }, [])

  useEffect(()=>{
      const getData = async() => {
          const response = await getAllSubaccounts(initialParamsSubaccounts)
          setSubaccountsData(response)
      }
      getData()
  }, [])

  useEffect(() => {
      const getAuxAccounts = async () => {
      const response = await getAllAuxAccounts(auxParams)
      setAuxiliaryAccountsData(response)
      }
      getAuxAccounts()
  }, [auxParams])

    
  if(!(
    accountsData &&
    subaccountsData &&
    auxiliaryAccountsData &&
    modulesDataCompleted
  )){
    return <LayoutSplashScreen />
  }

  const auxiliariesAccounts = auxiliaryAccountsData.auxiliariesAccounts? auxiliaryAccountsData.auxiliariesAccounts : [];
  const { subAccounts } = subaccountsData;
  const { accounts } = accountsData;

  const backToSeatingTemplatesList = () => {
    history.push(`/accounting/templates-entries`);
  };

  return (
    <Card>
      <CardHeader title="Crear Plantilla Asiento">
        <CardHeaderToolbar>
          <Button
            variant="outlined"
            color="secondary"
            className="mr-3"
            size="large"
            onClick={backToSeatingTemplatesList}
          >
            Volver
          </Button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <SeatingTemplatesCreateForm
          auxiliariesAccounts={auxiliariesAccounts} 
          subAccounts={subAccounts} 
          accounts={accounts} 
          modules={modulesData}
        />
      </CardBody>
    </Card>
  );
}

