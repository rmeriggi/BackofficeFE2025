import React from "react";
import { ListingTable } from "./ListingTable";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls";
import { LayoutSplashScreen } from "../../../../../../_metronic/layout";
import ListingFilter from "./ListingFilter";
import { productsAdapter } from "../../adapters/productsAdapter";
import useIsMountedRef from "../../../../../hooks/useIsMountedRef";
import { useAllProducts } from "../../utils/apiHooks";

export function Listing() {
  const isMounted = useIsMountedRef();
  const [products, productsCompleted] = useAllProducts(isMounted);

  if (!productsCompleted) {
    return <LayoutSplashScreen />;
  }

  const productsList = productsAdapter(products);

  return (
    <Card>
      <CardHeader title="Producto Tarjetas">
        <CardHeaderToolbar>
          <ListingFilter
            disabled={productsList.length === 0}
            data={productsList}
          />
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ListingTable products={productsList} />
      </CardBody>
    </Card>
  );
}
