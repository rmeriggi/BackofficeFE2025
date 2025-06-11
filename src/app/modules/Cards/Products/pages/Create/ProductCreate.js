import React, { useRef } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls";
import { ProductCreateForm } from "./ProductCreateForm";
import { useHistory } from "react-router";
import { useSubheader } from "../../../../../../_metronic/layout";
import { Button } from "@material-ui/core";

const emptyProduct = {
  product: "",
  brand: "",
  cardType: "",
  cashierExt: "",
  cashier: "",
  extractCashier: "0",
  punitiveRate: "",
  replacement: "",
  compensatoryRate: "",
  refinancing: "0",
  tem: "",
  cft: "",
  tna: "",
  summary: "",
  renewalCharge: "",
  quotaLimit: "",
  limit: "",
  flota: "0",
  comision: "",
};

export function ProductCreate() {
  const formikRef = useRef();
  const history = useHistory();
  const suhbeader = useSubheader();
  suhbeader.setTitle("Crear Producto");

  return (
    <Card>
      <CardHeader title="Nuevo Producto">
        <CardHeaderToolbar>
          <Button
            onClick={formikRef.current?.handleSubmit}
            variant="contained"
            color="secondary"
            className="mr-2"
            size="large"
          >
            Crear
          </Button>
          <Button
            onClick={() => history.goBack()}
            variant="outlined"
            color="secondary"
            size="large"
          >
            Volver
          </Button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <div className="mt-5">
          <ProductCreateForm
            formikRef={formikRef}
            product={emptyProduct}
            isCreate
          />
        </div>
      </CardBody>
    </Card>
  );
}
