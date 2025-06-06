import { Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import CardGraphic from "../components/CardGraphic";
import CardsShow from "../components/CardsShow";
import GraphicBar from "../Graphics/ManagerBarGraphic";
import DueBarGraphic from "../Graphics/DueBarGraphic";
import { useSubheader } from "../../../../../_metronic/layout";
import GraphicLine from "../Graphics/GraphicLine";
import useIsMountedRef from "../../../../hooks/useIsMountedRef";
import { LayoutSplashScreen } from "../../../../../_metronic/layout";
import { useAllProducts } from "../../Products/utils/apiHook";
import { getDashboardInfo } from "../utils/service";
import { FilterModal } from "../components/filterModal/FilterModal";
import { useSelector } from "react-redux";
import { dashboardCollectionsAdapter, productsAdapter } from "../../adapters";
import {
  getCurrencies,
  getEntities,
} from "../../../../_redux/combos/combosActions";
import { useFetchCombos } from "../../../../hooks";

const StatisticsPage = () => {
  const { user } = useSelector((state) => state.auth);
  const currentMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  );
  const initialValues = {
    user: user.id,
    idCreditProduct: 1,
    fromDate: currentMonth,
    toDate: new Date(),
    idEntity: 1,
    idCurrency: 2,
  };

  const subheader = useSubheader();
  subheader.setTitle("Dashboard De Cobranzas");
  const isMounted = useIsMountedRef();
  const [currencies] = useFetchCombos("currencies", getCurrencies);
  const [entities] = useFetchCombos("entities", getEntities);
  const [productsData, productsCompleted] = useAllProducts(isMounted, {
    idEntity: 0,
    idCurrency: 0,
  });
  const [values, setValues] = useState();

  useEffect(() => {
    const getDashboard = async () => {
      const response = await getDashboardInfo(initialValues);
      const formattedDashboard = dashboardCollectionsAdapter(response);
      setValues(formattedDashboard);
    };
    getDashboard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!(productsCompleted && values)) return <LayoutSplashScreen />;

  const products = productsAdapter(productsData.products);
  const { charts } = values;
  return (
    <>
      <FilterModal
        show={subheader.openFilter}
        onHide={subheader.handleClose}
        setValues={setValues}
        initialValues={initialValues}
        currencies={currencies}
        entities={entities}
        products={products}
      />
      <CardsShow data={values} />
      <Grid container justify="space-between" className="mt-5">
        <CardGraphic title="Créditos" data={charts.credits}>
          <DueBarGraphic data={charts?.credits.data} />
        </CardGraphic>
        <CardGraphic title="Cobros" data={charts.collections}>
          <GraphicBar data={charts?.collections.data} />
        </CardGraphic>
        <CardGraphic title="Cobrabilidad" data={charts.balances}>
          <GraphicLine data={charts?.balances} />
        </CardGraphic>
      </Grid>
      <Grid>
        <div
          style={{
            position: "relative",
            textAlign: "center",
            paddingTop: "25px",
          }}
        >
          <h6>Última actulización: {`${new Date().toLocaleString()}`}</h6>
        </div>
      </Grid>
    </>
  );
};

export default StatisticsPage;
