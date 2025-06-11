import React from "react";
import { Switch } from "react-router-dom";
import { ContentRoute } from "../../../../../_metronic/layout";
import { Listing } from "./Listing/index";
import { ListingTableContextProvider } from "./Listing/ListingTableContext";
import CardEditForm from "./CardEditForm";
import CardCreateForm from "./CardCreateForm";

export default function LimitsPage() {
  const baseRouterUrl = "/cards";
  return (
    <>
      <Switch>
        <ContentRoute
          path={baseRouterUrl + "/limits"}
          exact
          component={Listing}
          ContextProvider={ListingTableContextProvider}
        />
        <ContentRoute
          path={baseRouterUrl + "/limits/create"}
          component={CardCreateForm}
        />
        <ContentRoute
          path={baseRouterUrl + "/limits/edit/:id"}
          component={CardEditForm}
        />
      </Switch>
    </>
  );
}
