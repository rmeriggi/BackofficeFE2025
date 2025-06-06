import React from 'react';
import { Switch } from 'react-router';
import { ContentRoute } from '../../../../../_metronic/layout';
import Listing from '../components/Listing/index';
import { ListingTableContextProvider } from '../components/Listing/ListingTableContext';

const RosPage = () => {
    const baseRouterUrl = '/bcra'
    
    return (
        <>
        <Switch>
            <ContentRoute 
                exact
                path={baseRouterUrl + '/ros'}
                component={Listing} 
                ContextProvider={ListingTableContextProvider} 
            />
        </Switch>  
    </>  
    )
}

export default RosPage;