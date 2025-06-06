import React from "react";
import Listing from "./Listing";
import { Switch } from "react-router-dom";
import { ContentRoute } from "../../../../../_metronic/layout";
import { ListingTableContextProvider } from "./Listing/ListingTableContext";

export default function QueryPage() {
    return (
        <Switch>
            <ContentRoute path="/credits/query-assignment" component={Listing} ContextProvider={ListingTableContextProvider} />
        </Switch>
    )
}