import React from "react";
import { Switch } from "react-router-dom";
import { ContentRoute } from "../../../../../_metronic/layout";
import Listing from "./Listing";
import { ListingTableContextProvider } from "./Listing/ListingTableContext";

const MovementsPage = () => {
  const baseRouterUrl = "/cards/status";
  return (
    <Switch>
      <ContentRoute
        exact
        path={baseRouterUrl}
        component={Listing}
        ContextProvider={ListingTableContextProvider}
      />
      {/*       <ContentRoute
        exact
        path={`${baseRouterUrl}/create`}
        component={Listing}
      />
      <ContentRoute
        exact
        path={`${baseRouterUrl}/edit:id`}
        component={Listing}
      /> */}
    </Switch>
  );
};

export default MovementsPage;
