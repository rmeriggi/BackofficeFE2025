import React from "react";
import Listing from "./Listing";
import { Switch } from "react-router";
import { ContentRoute } from "../../../../../_metronic/layout";
import { ListingTableContextProvider } from "./Listing/ListingTableContext";

export default function AuxiliaryAccountsPage() {
    return (
        <Switch>
            <ContentRoute path="/accounting/accounting-plan" exact component={Listing} ContextProvider={ListingTableContextProvider} />
        </Switch>
    )
}