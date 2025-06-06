/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */
import { Button } from "@material-ui/core";
import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls";
import { AuxiliaryAccountsCreateForm } from "./AuxiliaryAccountsCreateForm";

export function AuxiliaryAccountsCreate({history}) {

  return (
    <Card>
      <CardHeader title="Crear Cuenta Auxiliar">
        <CardHeaderToolbar>
          <Button
            variant="outlined"
            color="secondary"
            className="mr-3"
            size="large"
            onClick={()=> {history.goBack()}}
          >
            Volver
          </Button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <AuxiliaryAccountsCreateForm/>
      </CardBody>
    </Card>
  );
}

