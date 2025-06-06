import React from 'react';
import { Switch } from 'react-router-dom';
import { ContentRoute } from '../../../../../_metronic/layout';
import { Listing } from "./Listing";
import { ListingTableContextProvider } from './Listing/ListingTableContext';

const ProvidersPage = () => {
    return (
        <Switch>
            <ContentRoute 
                exact
                path="/cards/providers" 
                component={Listing} 
                ContextProvider={ListingTableContextProvider} 
            />
        </Switch>    
    )
}

export default ProvidersPage;