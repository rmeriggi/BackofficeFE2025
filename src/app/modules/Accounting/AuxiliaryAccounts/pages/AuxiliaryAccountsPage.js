import React from "react";
import Listing from "./Listing";
import { Switch } from "react-router";
import { AuxiliaryAccountsCreate } from "./Create/AuxiliaryAccountsCreate";
import { AuxiliaryAccountsEdit } from "./Edit/AuxiliaryAccountsEdit";
import { ContentRoute } from "../../../../../_metronic/layout";
import { ListingTableContextProvider } from "./Listing/ListingTableContext";

export default function AuxiliaryAccountsPage() {
    return (
        <Switch>
            <ContentRoute path="/accounting/auxiliary-accounts" exact component={Listing} ContextProvider={ListingTableContextProvider} />
            <ContentRoute path="/accounting/auxiliary-accounts/new" exact component={AuxiliaryAccountsCreate} /> 
            <ContentRoute path="/accounting/auxiliary-accounts/edit/:id" component={AuxiliaryAccountsEdit} />
        </Switch>
    )
}