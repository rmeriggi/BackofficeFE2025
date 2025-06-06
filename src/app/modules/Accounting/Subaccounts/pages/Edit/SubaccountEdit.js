import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar
} from "../../../../../../_metronic/_partials/controls";
import { SubaccountEditForm } from "./SubaccountEditForm";
import { useOneSubaccount } from "../../utils/apiHooks";
import { useParams, useHistory } from "react-router";
import { LayoutSplashScreen, useSubheader } from '../../../../../../_metronic/layout';
import  useIsMountedRef  from '../../../../../hooks/useIsMountedRef';
import { Button } from "@material-ui/core";
import { getAllAccountingGroup } from "../../../AccountingGroups/utils/service";
import { getAllAccounts } from "../../../Accounts/utils/service";
import { initialParamsAccounts, initialParamsGroups } from '../../../initialParams';

export function SubaccountEdit() {

  const isMounted = useIsMountedRef();
  const { id } = useParams();
  const history = useHistory();
  const suhbeader = useSubheader();
  suhbeader.setTitle("Editar Subcuenta");

  const [groupsData, setGroups] = useState();
  const [accountsData, setAccounts] = useState();
  const [subAccountData, subAccountCompleted] = useOneSubaccount(id, isMounted);

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

  if (!(subAccountCompleted && groupsData && accountsData)) {
      return <LayoutSplashScreen />;
  }

  const { accountingGroups } = groupsData
  const { accounts } = accountsData
  const { subAccount } = subAccountData

  return (
    <Card>
      <CardHeader title={`${subAccount.subAccount}`}>
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
          <SubaccountEditForm
            subAccount={subAccount}
            accounts={accounts}
            accountingGroups={accountingGroups}
          />
        </div>
      </CardBody>
    </Card>
  );
}