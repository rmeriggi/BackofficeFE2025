import React from 'react';
import Listing from '../components/Listing';
import { Switch } from 'react-router-dom';
import { ContentRoute } from '../../../../../_metronic/layout';
import { ListingTableContextProvider } from '../components/Listing/ListingTableContext';


const BlotterPage = () => {
    const baseRouterUrl = '/investments'
    
    return (
        <>
        <Switch>
            <ContentRoute 
                exact
                path={baseRouterUrl + '/pnl'}
                // path={baseRouterUrl + '/blottercash'}
                component={Listing} 
                ContextProvider={ListingTableContextProvider} />
        </Switch>  
    </>  
    )
}

export default BlotterPage;