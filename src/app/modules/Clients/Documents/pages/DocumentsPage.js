import React from "react";
import Listing from "./Listing";
import { Switch } from "react-router";
import { ContentRoute } from "../../../../../_metronic/layout";
import { ListingTableContextProvider } from "./Listing/ListingTableContext";

export default function AccountingGroupsPage() {
    return (
        <Switch>
            <ContentRoute path="/clients/documents" component={Listing} ContextProvider={ListingTableContextProvider} />
        </Switch>
    )
}