import React from "react";
import Listing from "./Listing";
import { Switch } from "react-router";
import {SubaccountCreate } from "./Create/SubaccountCreate";
import {SubaccountEdit } from "./Edit/SubaccountEdit";
import { ContentRoute } from "../../../../../_metronic/layout";
import { ListingTableContextProvider } from "./Listing/ListingTableContext";

export default function SubaccountsPage() {
    return (
        <Switch>
            <ContentRoute path="/accounting/subaccounts" exact component={Listing} ContextProvider={ListingTableContextProvider} />
            <ContentRoute path="/accounting/subaccounts/edit/:id" component={SubaccountEdit} /> 
            <ContentRoute path="/accounting/subaccounts/new" component={SubaccountCreate} /> 
        </Switch>
    )
}