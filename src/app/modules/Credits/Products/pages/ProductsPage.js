import React from "react";
import Listing from "./Listing";
import { Switch } from "react-router";
import { ProductCreate } from "./Create/ProductCreate";
import { ProductEdit } from "./Edit/ProductEdit";
import { ContentRoute } from "../../../../../_metronic/layout";
import { ListingTableContextProvider } from "./Listing/ListingTableContext";
import { EditContextProvider } from "./Edit/Context/EditContext";

export default function CreditsPage() {
    return (
        <Switch>
            <ContentRoute path="/credits/products" exact component={Listing} ContextProvider={ListingTableContextProvider} />
            <ContentRoute path="/credits/products/new" exact component={ProductCreate} ContextProvider={EditContextProvider}/> 
            <ContentRoute path="/credits/products/edit/:id" component={ProductEdit} ContextProvider={EditContextProvider}/>
        </Switch>
    )
}