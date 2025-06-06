import React from "react";
import ListingFilter from "./ListingFilter";
import ListingCashFilter from "./ListingCashFilter";
import { ListingTable } from "./ListingTable";
import { ListingCashTable } from "./ListingCashTable";
import { CircularProgress } from "@material-ui/core";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls";
import { useFetchBlottersSpeciesInstrument } from "../../../../../hooks/useFetchBlottersSpeciesInstrument";
import { useFetchBlottersCashMoney } from "../../../../../hooks/useFetchBlottersCashMoney";
import { LayoutSplashScreen } from "../../../../../../_metronic/layout";

export default function Listing() {
  const [cashMoney, loadingcashMoney] = useFetchBlottersCashMoney();
  const [
    speciesInstrument,
    loadingInstrument,
  ] = useFetchBlottersSpeciesInstrument();

  console.log("cashMoney", cashMoney);
  console.log("speciesInstrument", speciesInstrument);
  // console.log('pnlsInstrument', pnlsInstrument )
  if (
    !cashMoney ||
    loadingcashMoney ||
    !speciesInstrument ||
    loadingInstrument
  ) {
    return <LayoutSplashScreen />;
  }

  return (
    <>
      <Card>
        <CardHeader className="py-8" title="CAJA">
          <CardHeaderToolbar>
            <ListingCashFilter
              disabled={cashMoney.length === 0}
              data={cashMoney}
            />
          </CardHeaderToolbar>
        </CardHeader>
        <CardBody>
          {loadingcashMoney ? (
            <CircularProgress size={20} color="secondary" />
          ) : (
            <ListingCashTable cashData={cashMoney} />
          )}
        </CardBody>
      </Card>
      <Card>
        <CardHeader className="py-8" title="ESPECIES">
          <CardHeaderToolbar>
            <ListingFilter
              disabled={speciesInstrument.length === 0}
              data={speciesInstrument}
            />
          </CardHeaderToolbar>
        </CardHeader>
        <CardBody>
          {loadingInstrument ? (
            <CircularProgress size={20} color="secondary" />
          ) : (
            <ListingTable speciesData={speciesInstrument} />
          )}
        </CardBody>
      </Card>
    </>
  );
}
