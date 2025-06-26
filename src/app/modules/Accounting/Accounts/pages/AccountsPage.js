import React from "react";
import { Switch } from "react-router";
import { ContentRoute } from "../../../../../_metronic/layout";
import { AccountCreate } from "./Create/AccountCreate";
import { AccountEdit } from "./Edit/AccountEdit";
import Listing from "./Listing";
import { ListingTableContextProvider } from "./Listing/ListingTableContext";

export default function AccountsPage() {
  return (
    <Switch>
      <ContentRoute
        path="/accounting/accounts"
        exact
        component={Listing}
        ContextProvider={ListingTableContextProvider}
      />
      <ContentRoute
        path="/accounting/accounts/new"
        exact
        component={AccountCreate}
      />
      <ContentRoute
        path="/accounting/accounts/edit/:id"
        component={AccountEdit}
      />
    </Switch>
  );
}
