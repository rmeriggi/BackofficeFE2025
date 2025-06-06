import React from "react";
import Listing from "./Listing";
import { Switch } from "react-router";
import { AccountCreate } from "./Create/AccountCreate";
import { AccountEdit } from "./Edit/AccountEdit";
import { ContentRoute } from "../../../../../_metronic/layout";
import { ListingTableContextProvider } from "./Listing/ListingTableContext";

export default function AccountsPage() {
    return (
        <Switch>
            <ContentRoute path="/accounting/accounts" exact component={Listing} ContextProvider={ListingTableContextProvider} />
            <ContentRoute path="/accounting/accounts/new" exact component={AccountCreate} />
            <ContentRoute path="/accounting/accounts/edit/:id" component={AccountEdit} />
        </Switch>
    )
}