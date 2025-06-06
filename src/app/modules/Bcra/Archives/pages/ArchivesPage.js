import React from 'react';
import { ContentRoute } from '../../../../../_metronic/layout';
import {Switch } from 'react-router';
import Listing from '../components/Listing/index';
import { ListingTableContextProvider } from '../components/Listing/ListingTableContext';

const ArchivesPage = () => {
    const baseRouterUrl = '/bcra'
    
    return (
        <>
        <Switch>
            <ContentRoute 
                exact
                path={baseRouterUrl + '/archives'}
                component={Listing} 
                ContextProvider={ListingTableContextProvider} />
        </Switch>  
    </>  
    )
}

export default ArchivesPage;