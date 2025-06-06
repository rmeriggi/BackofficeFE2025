import React from 'react';
import { Switch } from 'react-router-dom';
import { ContentRoute } from '../../../../../_metronic/layout';
import { Listing } from "./Listing";
import { ListingTableContextProvider } from './Listing/ListingTableContext';

const DistributorsPage = () => {
    return (
        <Switch>
            <ContentRoute 
                exact
                path="/cards/distributors" 
                component={Listing} 
                ContextProvider={ListingTableContextProvider} 
            />
        </Switch>    
    )
}

export default DistributorsPage;