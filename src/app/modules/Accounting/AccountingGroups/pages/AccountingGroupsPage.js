import React from "react";
import Listing from "./Listing";
import { Switch } from "react-router";
import { AccountingGroupCreate } from "./Create/AccountingGroupCreate";
import { AccountingGroupEdit } from "./Edit/AccountingGroupEdit";
import { ContentRoute } from "../../../../../_metronic/layout";
import { ListingTableContextProvider } from "./Listing/ListingTableContext";

export default function AccountingGroupsPage() {
    return (
        <Switch>
            <ContentRoute path="/accounting/accounting-groups" exact component={Listing} ContextProvider={ListingTableContextProvider} />
            <ContentRoute path="/accounting/accounting-groups/edit/:id" component={AccountingGroupEdit}/> 
            <ContentRoute path="/accounting/accounting-groups/new" component={AccountingGroupCreate} /> 
        </Switch>
    )
}