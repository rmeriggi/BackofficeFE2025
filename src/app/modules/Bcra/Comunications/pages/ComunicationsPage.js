import React from 'react';
import Listing from '../components/Listing';
import {NewCategoryPage} from '../components/NewCategoryPage'
import { ContentRoute } from '../../../../../_metronic/layout';
import { ListingTableContextProvider } from '../components/Listing/ListingTableContext';
import { Switch } from 'react-router-dom';


const ComunicationsPage = () => {
    const baseRouterUrl = '/bcra'
    
    return (
        <>
        <Switch>
            <ContentRoute 
                exact
                path={baseRouterUrl + '/comunications'}
                component={Listing} 
                ContextProvider={ListingTableContextProvider}
            />
            <ContentRoute 
                path={baseRouterUrl + '/comunications/new-category'}
                component={NewCategoryPage} 
            />
        </Switch> 
    </>  
    )
}

export default ComunicationsPage;