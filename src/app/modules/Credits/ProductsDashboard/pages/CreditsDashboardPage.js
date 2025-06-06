import { Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import CardGraphic from "../components/CardGraphic";
import CardsShow from "../components/CardsShow";
import GraphicBar from "../Graphics/ManagerBarGraphic";
import GraphicDoughnut from "../Graphics/VolumeGraphic";
import InversionGraphicDoughnut from "../Graphics/InversionGraphic";
import DueBarGraphic from "../Graphics/DueBarGraphic";
import NewBarGraphic2 from "../Graphics/NewBarGraphic2";
import {
  LayoutSplashScreen,
  useSubheader,
} from "../../../../../_metronic/layout";
import GraphicLine from "../Graphics/GraphicLine";
import { getDashboardInfo } from "../utils/service";
import { FilterModal } from "../components/filterModal/FilterModal";
import {
  dashboardCollectionsAdapter,
  managersAdapter,
  productsAdapter,
} from "../../adapters";
import {
  getCurrencies,
  getEntities,
} from "../../../../_redux/combos/combosActions";
import { useCallAPI, useFetchCombos } from "../../../../hooks";
import { getAllUsers } from "../../../../utils/service";
import { getAllProducts } from "../../Products/utils/service";

const CreditsDashboardPage = () => {
  const subheader = useSubheader();
  subheader.setTitle("Dashboard De Productos");
  const [values, setValues] = useState();
  const [users, setUsers] = useState();
  const [products, setProducts] = useState();
  useCallAPI(getAllUsers, setUsers, undefined, managersAdapter);
  useCallAPI(
    getAllProducts,
    setProducts,
    { idEntity: 0, idCurrency: 0 },
    productsAdapter
  );
  const [currencies] = useFetchCombos("currencies", getCurrencies);
  const [entities] = useFetchCombos("entities", getEntities);

  const CURRENT_MONTH = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  );

  const initialValues = {
    user: 1,
    idCreditProduct: 0,
    fromDate: CURRENT_MONTH,
    toDate: new Date(),
    idEntity: 1,
    idCurrency: 2,
  };

  useEffect(() => {
    const getDashboard = async () => {
      const response = await getDashboardInfo(initialValues);
      const formattedDashboard = dashboardCollectionsAdapter(response);
      setValues(formattedDashboard);
    };
    getDashboard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!values) return <LayoutSplashScreen />;

  const { charts } = values;

  return (
    <>
      <FilterModal
        show={subheader.openFilter}
        onHide={subheader.handleClose}
        setValues={setValues}
        currencies={currencies}
        entities={entities}
        products={products}
        initialValues={initialValues}
        users={users}
      />
      <CardsShow data={values} />
      <Grid container justify="space-between" className="mt-5">
        <CardGraphic title="Créditos" data={charts.credits}>
          <DueBarGraphic data={charts.credits.data} />
        </CardGraphic>
        <CardGraphic title="Cobros" data={charts.collections}>
          <GraphicBar data={charts.collections.data} />
        </CardGraphic>
        <CardGraphic title="Cobrabilidad" data={charts.balances}>
          <GraphicLine data={charts.balances} />
        </CardGraphic>
        <CardGraphic title="Volumen" data={charts.volume}>
          <GraphicDoughnut data={charts.volume} />
        </CardGraphic>
        <CardGraphic title="Canales" data={charts.investment}>
          <InversionGraphicDoughnut data={charts.investment} />
        </CardGraphic>
        <CardGraphic title="Cobranzas" data={charts.graphicvi}>
          <NewBarGraphic2 data={charts.graphicvi.data} />
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

export default CreditsDashboardPage;
