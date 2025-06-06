import React from "react";
import Listing from "./Listing";
import { Switch } from "react-router";
import { SeatingTemplatesCreate } from "./Create/SeatingTemplatesCreate";
import { TemplatesEntriesEdit } from "./Edit/TemplatesEntriesEdit";
import { ContentRoute } from "../../../../../_metronic/layout";
import { ListingTableContextProvider } from "./Listing/ListingTableContext";

export default function AuxiliaryAccountsPage() {
    return (
        <Switch>
            <ContentRoute path="/accounting/templates-entries" exact component={Listing} ContextProvider={ListingTableContextProvider} />
            <ContentRoute path="/accounting/templates-entries/new" exact component={SeatingTemplatesCreate} />  
            <ContentRoute path="/accounting/templates-entries/edit/:id" component={TemplatesEntriesEdit} />
        </Switch>
    )
}