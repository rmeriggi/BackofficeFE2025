import React from "react";
import Listing from "./Listing";
import { Switch } from "react-router";
import { ContentRoute } from "../../../../../_metronic/layout";
import { ListingTableContextProvider } from "./Listing/ListingTableContext";

export default function BalancesPage() {
    return (
        <Switch>
            <ContentRoute 
              exact 
              path="/accounting/balances" 
              component={Listing} 
              ContextProvider={ListingTableContextProvider} 
            />
        </Switch>
    )
}