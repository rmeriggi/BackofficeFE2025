import React from "react";
import { CollectionAdjustments } from "./CollectionsAdjustment/CollectionAdjustments";
import { Switch } from "react-router-dom";
import { ContentRoute } from "../../../../../_metronic/layout";
import { ListingTableContextProvider } from "../pages/CollectionsAdjustment/Listing/ListingTableContext";

export default function SettingsPage() {
    return (
        <Switch>
            <ContentRoute 
                exact 
                path="/credits/settings-collections" 
                component={CollectionAdjustments} 
                ContextProvider={ListingTableContextProvider} 
            />
        </Switch>
    )
}