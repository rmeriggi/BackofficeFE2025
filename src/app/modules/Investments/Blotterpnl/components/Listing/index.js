import React from "react";
import ListingFilter from "./ListingFilter";
/* import ListingFilterSpecies from "./ListingFilterSpecies";*/
import { ListingTableSpecies } from "./ListingTableSpecies";
import { ListingTable } from "./ListingTable";
import { CircularProgress } from "@material-ui/core";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls";
/* import { useFetchBlottersPnl } from "../../../../../hooks/useFetchBlottersPnl";
 */ import { useFetchBlottersPnlSpecies } from "../../../../../hooks/useFetchBlottersPnlSpecies";
import { useFetchBlottersPnlInstrument } from "../../../../../hooks/useFetchBlottersPnlInstrument";
import { LayoutSplashScreen } from "../../../../../../_metronic/layout";

export default function Listing() {
  const [pnlsSpecies, loadingPnlsSpecies] = useFetchBlottersPnlSpecies();
  const [
    pnlsInstrument,
    loadingPnlsInstrument,
  ] = useFetchBlottersPnlInstrument();

  if (
    !pnlsInstrument ||
    loadingPnlsInstrument ||
    !pnlsSpecies ||
    loadingPnlsSpecies
  ) {
    return <LayoutSplashScreen />;
  }

  return (
    <>
      <Card>
        <CardHeader className="py-8" title="INSTRUMENTO">
          <CardHeaderToolbar>
            <ListingFilter
              disabled={pnlsInstrument.length === 0}
              data={pnlsInstrument}
            />
          </CardHeaderToolbar>
        </CardHeader>
        <CardBody>
          {loadingPnlsInstrument ? (
            <CircularProgress size={20} color="secondary" />
          ) : (
            <ListingTable pnlData={pnlsInstrument} />
          )}
        </CardBody>
      </Card>
      <Card>
        <CardHeader className="py-8" title="ESPECIE">
          <CardHeaderToolbar>
            {/* <ListingFilterSpecies   
                        disabled={pnlsSpecies.length === 0} 
                        data={pnlsSpecies} 
                    /> */}
          </CardHeaderToolbar>
        </CardHeader>
        <CardBody>
          {loadingPnlsSpecies ? (
            <CircularProgress size={20} color="secondary" />
          ) : (
            <ListingTableSpecies pnlData={pnlsSpecies} />
          )}
        </CardBody>
      </Card>
    </>
  );
}
