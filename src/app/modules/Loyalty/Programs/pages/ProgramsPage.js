import React from "react";
import Listing from "./Listing";
import EditProgram from "./EditProgram/EditProgram";
import { Switch } from "react-router-dom";
import { ContentRoute } from "../../../../../_metronic/layout";
import { ListingTableContextProvider } from "./Listing/ListingTableContext";

export default function CreditsPage() {
    return (
        <Switch>
            <ContentRoute path="/loyalty/programs" exact component={Listing} ContextProvider={ListingTableContextProvider} />
            <ContentRoute path="/loyalty/programs/edit/:id" component={EditProgram} />
        </Switch>
    )
}