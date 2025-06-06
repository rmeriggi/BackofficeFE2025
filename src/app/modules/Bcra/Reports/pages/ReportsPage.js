import React from 'react';
import { Switch } from 'react-router';
import { ContentRoute } from '../../../../../_metronic/layout';
import Listing from '../components/Listing';
import { ListingTableContextProvider } from '../components/Listing/ListingTableContext';

const ReportsPage = () => {
    
    const baseRouterUrl = "/bcra"
    return (
        <>
        <Switch>
            <ContentRoute 
                exact
                path={baseRouterUrl + '/reports'}
                component={Listing} 
                ContextProvider={ListingTableContextProvider} />
        </Switch>  
    </>  
    )
}

export default ReportsPage;