import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar
} from "../../../../../../_metronic/_partials/controls";
import { AccountingGroupCreateForm } from "./AccountingGroupCreateForm";
import { useHistory } from "react-router";
import {  useSubheader } from '../../../../../../_metronic/layout';
import { Button } from "@material-ui/core";

export function AccountingGroupCreate() {

  const history = useHistory();
  const suhbeader = useSubheader();
  suhbeader.setTitle("Agregar Grupo");

  return (
    <Card>
      <CardHeader title='Nuevo Grupo'>
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
          <AccountingGroupCreateForm />
        </div>
      </CardBody>
    </Card>
  );
}