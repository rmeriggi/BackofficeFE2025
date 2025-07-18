import React from "react";
import { Switch } from "react-router";
import { ContentRoute } from "../../../../../_metronic/layout";
import Conciliation from "../Conciliation";
import Listing from "../Listing/index";
import { ListingTableContextProvider } from "../Listing/ListingTableContext";
export default function CardsIssuedPage() {
  const baseRouterUrl = "/cards/conciliation";
  return (
    <>
      <Switch>
        <ContentRoute
          path={baseRouterUrl}
          exact
          component={Listing}
          ContextProvider={ListingTableContextProvider}
        />

        <ContentRoute path={`${baseRouterUrl}/:id`} component={Conciliation} />
      </Switch>
    </>
  );
}
