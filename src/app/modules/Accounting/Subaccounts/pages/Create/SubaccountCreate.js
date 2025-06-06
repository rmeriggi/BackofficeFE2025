import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar
} from "../../../../../../_metronic/_partials/controls";
import { SubaccountCreateForm } from "./SubaccountCreateForm";
import { useHistory } from "react-router";
import {  LayoutSplashScreen, useSubheader } from '../../../../../../_metronic/layout';
import { Button } from "@material-ui/core";
import { getAllAccountingGroup } from "../../../AccountingGroups/utils/service";
import { initialParamsAccounts, initialParamsGroups } from "../../../initialParams";
import { getAllAccounts } from "../../../Accounts/utils/service";
import { getCurrencies, getEntities } from "../../../../../_redux/combos/combosActions";
import { useFetchCombos } from "../../../../../hooks";

export function SubaccountCreate() {

  const history = useHistory();
  const suhbeader = useSubheader();
  suhbeader.setTitle("Agregar Subcuenta");
  
  const [groupsData, setGroups] = useState();
  const [accountsData, setAccounts] = useState();  
  const [currencies] = useFetchCombos('currencies', getCurrencies)
  const [entities] = useFetchCombos('entities', getEntities)

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

  if (!(
        groupsData 
        && accountsData )) {
      return <LayoutSplashScreen />;
  }

  const { accountingGroups } = groupsData
  const { accounts } = accountsData;

  return (
    <Card>
      <CardHeader title='Información'>
        <CardHeaderToolbar>
          <Button
            onClick={(e)=>{
              history.goBack();
            }}
            variant="outlined"
            color="secondary"
            className="mr-3"
            size="large"
          >
            Volver
          </Button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <div className="mt-5">
          <SubaccountCreateForm 
            accounts={accounts}
            accountingGroups={accountingGroups}
            entities={entities}
            currencies={currencies}
          />
        </div>
      </CardBody>
    </Card>
  );
}