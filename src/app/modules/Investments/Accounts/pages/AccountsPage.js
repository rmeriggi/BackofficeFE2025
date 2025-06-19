import React from "react";
import { Switch } from "react-router";
import { ContentRoute } from "../../../../../_metronic/layout";
import ClientsAccountsPage from "./ClientsAccountsPage";
/* import Listing from "./Listing"; */
/* import { AccountEdit } from "../components/accounts-edit/AccountsEdit"; */
/* import { ListingTableContextProvider } from "./Listing/ListingTableContext";*/

export default function AccountsPage() {
  return (
    <Switch>
      <ContentRoute
        path="/investments/accounts"
        exact component={ClientsAccountsPage} /* component={Listing} ContextProvider={ListingTableContextProvider} */
      />
      {/*  <ContentRoute
                path="/investments/accounts/edit/:id"
                component={AccountEdit}
                /> */}
    </Switch>
  );
}
