import React from "react";
import { Switch } from "react-router";
import Listing from "./Listing";
import { ContentRoute } from "../../../../../_metronic/layout";



export default function OperationsPage() {
    return (
        <Switch>
           <ContentRoute path="/investments/operations" exact component={Listing}/>
        </Switch>
    )
}