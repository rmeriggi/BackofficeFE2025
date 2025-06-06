import React from "react";
import Listing from "./Listing";
import { Switch } from "react-router-dom";
import { ContentRoute } from "../../../../../_metronic/layout";
import { ListingTableContextProvider } from "./Listing/ListingTableContext";
import CreditDetail  from "./CreditDetail/CreditDetail";

export default function CreditsPage() {
    return (
        <Switch>
            <ContentRoute 
                exact 
                path="/credits/credits" 
                component={Listing} 
                ContextProvider={ListingTableContextProvider} 
            />
            <ContentRoute 
                path="/credits/credits/view/:id" 
                component={CreditDetail} 
            />
        </Switch>
    )
}