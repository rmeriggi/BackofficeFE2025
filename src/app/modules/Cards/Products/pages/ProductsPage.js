import React from 'react';
import { Switch } from 'react-router-dom';
import { ContentRoute } from '../../../../../_metronic/layout';
import { Listing } from "./Listing";
import { ListingTableContextProvider } from './Listing/ListingTableContext';
import { ProductEdit } from './Edit/ProductEdit';

const ProductsPage = () => {
    return (
        <Switch>
            <ContentRoute exact path="/cards/products" component={Listing} ContextProvider={ListingTableContextProvider} />
            <ContentRoute path="/cards/products/edit/:id" component={ProductEdit} />
        </Switch>    
    )
}

export default ProductsPage;