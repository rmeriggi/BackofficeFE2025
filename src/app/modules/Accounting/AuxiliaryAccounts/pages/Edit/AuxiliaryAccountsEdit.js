/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */
import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls";
import useIsMountedRef from "../../../../../hooks/useIsMountedRef";
import { LayoutSplashScreen, useSubheader } from "../../../../../../_metronic/layout";
import { AuxiliaryAccountsEditForm } from "./AuxiliaryAccountsEditForm" 
import { useHistory, useParams } from "react-router-dom";
import { useGetOneAuxAccount } from "../../utils/apiHook";
import { initialParamsAccounts, initialParamsGroups, initialParamsSubaccounts } from "../../../initialParams";
import { getAllAccountingGroup } from "../../../AccountingGroups/utils/service";
import { getAllAccounts } from "../../../Accounts/utils/service";
import { getAllSubaccounts } from "../../../Subaccounts/utils/service";
import { getAccountId} from "../../components/getIdsFuntions";

export function AuxiliaryAccountsEdit() {

  const isMountedRef = useIsMountedRef();
  const { id } = useParams();
  const history = useHistory();
  const suhbeader = useSubheader();
  suhbeader.setTitle("Editar Cuenta Auxiliar");

  const [groupsData, setGroups] = useState();
  const [accountsData, setAccounts] = useState();
  const [subAccountData, setSubaccountsData] = useState();
  const [auxAccountData, auxCompleted] = useGetOneAuxAccount(isMountedRef, id);

  useEffect (() => {
    const getGroups = async() => {
      const groups = await getAllAccountingGroup(initialParamsGroups)
      setGroups(groups)
    }
    getGroups();
  }, [])

  useEffect(() => {
    const getAccounts = async() => {
      const accounts = await getAllAccounts(initialParamsAccounts)
      setAccounts(accounts)
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


  if(!(
    groupsData &&
    accountsData && 
    subAccountData && 
    auxCompleted
  )){
    return <LayoutSplashScreen />
  }

  const { accounts } = accountsData
  const { subAccounts } = subAccountData
  const { accountingGroups } = groupsData
  const { auxiliaryAccount } = auxAccountData

  const auxAccount = {
    ...auxiliaryAccount,
    account: getAccountId(auxiliaryAccount.idSubAccount, subAccounts)
  }

  return (
    <Card>
      <CardHeader title={`Cuenta ${auxiliaryAccount.auxiliary}`}>
        <CardHeaderToolbar>
          <Button
            variant="outlined"
            color="secondary"
            className="mr-3"
            size="large"
            onClick={(e)=>{
              history.goBack();
            }}
          >
            Volver
          </Button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <div className="mt-5">
          <AuxiliaryAccountsEditForm 
            auxiliaryAccount = {auxAccount} 
            groups={accountingGroups}
            accounts={accounts}
            subaccounts={subAccounts}           
          />
        </div>
      </CardBody>
    </Card>
  );
}

