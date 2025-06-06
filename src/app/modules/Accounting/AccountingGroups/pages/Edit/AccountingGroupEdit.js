import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar
} from "../../../../../../_metronic/_partials/controls";
import { AccountingGroupEditForm } from "./AccountingGroupForm";
import { useAccountingGroup } from "../../utils/apiHooks";
import { useParams, useHistory } from "react-router";
import { LayoutSplashScreen, useSubheader } from '../../../../../../_metronic/layout';
import  useIsMountedRef  from '../../../../../../app/hooks/useIsMountedRef';
import { Button } from "@material-ui/core";

export function AccountingGroupEdit() {

  const isMounted = useIsMountedRef();
  const { id } = useParams();
  const history = useHistory();
  const suhbeader = useSubheader();
  suhbeader.setTitle("Editar Grupo");

  const [accountingGroupData, accountingGroupCompleted] = useAccountingGroup(id, isMounted);

  if (!accountingGroupCompleted) {
      return <LayoutSplashScreen />;
  }

  const { accountingGroup } = accountingGroupData;

  return (
    <Card>
      <CardHeader title={`${accountingGroup.group}`}>
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
          <AccountingGroupEditForm
            accountingGroup={accountingGroup}
          />
        </div>
      </CardBody>
    </Card>
  );
}