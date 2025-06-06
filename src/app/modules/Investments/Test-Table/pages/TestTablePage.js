import React from 'react'
import { Switch } from "react-router-dom";
import Listing from "./Listing";
import { ContentRoute } from "../../../../../_metronic/layout";
import { ListingTableContextProvider } from "./Listing/ListingTableContext";

const ProductsPage = () => {
  return (
    <Switch>
        <ContentRoute path="/investments/testtable" exact component={Listing} ContextProvider={ListingTableContextProvider} />
        </Switch>
)
}

export default ProductsPage