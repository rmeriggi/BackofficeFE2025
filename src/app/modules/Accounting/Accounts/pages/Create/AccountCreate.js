/* eslint-disable eqeqeq */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */
import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls";
import {AccountCreateForm} from "./AccountCreateForm";
import { LayoutSplashScreen } from "../../../../../../_metronic/layout";
import { getAllAccountingGroup } from "../../../AccountingGroups/utils/service";
import { initialParamsGroups } from '../../../initialParams';
import { getCurrencies, getEntities } from "../../../../../_redux/combos/combosActions";
import { useFetchCombos } from "../../../../../hooks";

export function AccountCreate({history,match: {params: { id },}}) {

  const [groupsData, setGroupsData] = useState();  
  const [currencies] = useFetchCombos('currencies', getCurrencies)
  const [entities] = useFetchCombos('entities', getEntities)
      
  useEffect(() => {
    const getAccountingGroup = async () => {
    const response = await getAllAccountingGroup(initialParamsGroups)
    setGroupsData(response)
    }
    getAccountingGroup()
  }, [])

  if(!groupsData){
    return <LayoutSplashScreen />
  }

  const  account  = {
    group: 1,
    account: ""
  };

  const { accountingGroups } = groupsData;    

  const backToAccountsList = () => {
    history.push(`/accounting/accounts`);
  };

  const accountFormatted = () => {
    const group = accountingGroups.find( g => g.id == account.group)
    const entity = group.entity
    const currencyName = group.currency

    return {
      ...account,
      entity,
      currencyName
    }
  }

  return (
    <Card>
      <CardHeader title="Crear Cuenta">
        <CardHeaderToolbar>
          <Button
            variant="outlined"
            color="secondary"
            className="mr-3"
            size="large"
            onClick={backToAccountsList}
          >
            Volver
          </Button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <AccountCreateForm 
          account={accountFormatted(account)} 
          entities={entities}
          currency={currencies}
          groups={accountingGroups}
        />
      </CardBody>
    </Card>
  );
}

