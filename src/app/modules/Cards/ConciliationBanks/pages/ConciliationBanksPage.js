import React from "react";
import { Switch } from "react-router";
import { ContentRoute } from "../../../../../_metronic/layout";
import ConciliationBanks from "../ConciliationBanks";
import Listing from "../Listing/";
import { ListingTableContextProvider } from "../Listing/ListingTableContext";

export default function CardsIssuedPage() {
  const baseRouterUrl = "/cards/conciliation-banks";
  return (
    <>
      <Switch>
        <ContentRoute
          path={baseRouterUrl}
          exact
          component={Listing}
          ContextProvider={ListingTableContextProvider}
        />

        <ContentRoute
          path={`${baseRouterUrl}/:id`}
          component={ConciliationBanks}
        />
      </Switch>
    </>
  );
}
