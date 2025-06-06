import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Button, CircularProgress } from "@material-ui/core";
import ListingFilter from "./ListingFilter";
import { ListingTable } from "./ListingTable";
import ListingFilterSelects from "./ListingFilterSelects";
import { LayoutSplashScreen } from "../../../../../../_metronic/layout";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls";
import { getAllProducts } from "../../utils/service";
import { useLoading } from "../../../../../hooks/useLoading";
import { productsAdapter } from "../../../adapters";
import {
  getCurrencies,
  getEntities,
} from "../../../../../_redux/combos/combosActions";
import { useFetchCombos } from "../../../../../hooks/useFetchCombos";

const initialValues = {
  idEntity: 0,
  idCurrency: 0,
};

export default function Listing() {
  const history = useHistory();
  const [currencies] = useFetchCombos("currencies", getCurrencies);
  const [entities] = useFetchCombos("entities", getEntities);
  const { loading, enableLoading, disableLoading } = useLoading();
  const [data, setData] = useState();

  useEffect(() => {
    const getProducts = async () => {
      const response = await getAllProducts(initialValues);
      setData(response.products);
      disableLoading();
    };
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!data) return <LayoutSplashScreen />;

  const products = productsAdapter(data);

  console.log(products);

  return (
    <Card>
      <CardHeader title="Listado">
        <CardHeaderToolbar>
          <ListingFilterSelects
            entities={entities}
            currency={currencies}
            setData={setData}
            enableLoading={enableLoading}
            disableLoading={disableLoading}
          />
          <ListingFilter disabled={data.length === 0} />
          <Button
            variant="contained"
            color="secondary"
            className="ml-4"
            size="large"
            onClick={() => history.push(`/credits/products/new`)}
          >
            Agregar Producto
          </Button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        {loading ? (
          <CircularProgress size={20} color="secondary" />
        ) : (
          <ListingTable productsData={data} />
        )}
      </CardBody>
    </Card>
  );
}
