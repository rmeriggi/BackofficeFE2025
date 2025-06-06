import React from "react";
import Listing from "./Listing";
import { Switch } from "react-router";
import { AccountEdit } from "../components/accounts-edit/AccountsEdit";
import { ContentRoute } from "../../../../../_metronic/layout";
import { ListingTableContextProvider } from "./Listing/ListingTableContext";

export default function AccountsPage() {
    return (
        <Switch>
            <ContentRoute path="/investments/accounts" exact component={Listing} ContextProvider={ListingTableContextProvider} />
            <ContentRoute
                path="/investments/accounts/edit/:id"
                component={AccountEdit}
                />
        </Switch>
    )
}