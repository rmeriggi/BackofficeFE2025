import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar
} from "../../../../../../_metronic/_partials/controls";
import { ProductEditForm } from "./ProductEditForm";
import { useHistory } from "react-router";
import { useSubheader } from '../../../../../../_metronic/layout';
import { Button } from "@material-ui/core";

const productMock = {
  "id": "3",
  "product": "GAF I",
  "brandId": "1",
  "cardTypeId": "1",
  "comision": "$1.0000",
  "flota": "-1",
  "userLimit": "-1",
  "limit": "$1.0000",
  "quotaLimit": "$1.0000",
  "renewalCharge": "$500",
  "summary": "$1.0000",
  "tna": "3.00%",
  "cft": "5.00%",
  "tem": "6.00%",
  "refinancing": "-1",
  "compensatoryRate": "1.00%",
  "punitiveRate": "1.00%",
  "replacement": "$1.0000",
  "extractCashier": "-1",
  "cashier": "$1.0000",
  "cashierExt": "$1.0000",
  "timeStamp": "2022-06-22T14:43:27.977",
  "brand": "VISA",
  "cardType": "DEBITO",
}

export function ProductEdit() {

  const history = useHistory();
  const suhbeader = useSubheader();
  suhbeader.setTitle("Editar Producto");

  return (
    <Card>
      <CardHeader title={`Producto: ${productMock.product}`}>
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
          <ProductEditForm
            product={productMock}
          />
        </div>
      </CardBody>
    </Card>
  );
}