import React from "react";
import Listing from "./Listing";
import { Switch } from "react-router-dom";
import {CreditDetail} from "./CreditDetail/CreditDetail";
import { ContentRoute } from "../../../../../_metronic/layout";
import { ListingTableContextProvider } from "./Listing/ListingTableContext";

export default function CollectionsPage() {
    return (
        <Switch>
            <ContentRoute path="/credits/management" exact component={Listing} ContextProvider={ListingTableContextProvider} />
            <ContentRoute path="/credits/management/view/:id" component={CreditDetail}/>
        </Switch>
    )
}