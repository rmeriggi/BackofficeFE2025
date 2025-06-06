import React from 'react';
import Listing from '../components/Listing';
import { Switch } from 'react-router-dom';
import { ContentRoute } from '../../../../../_metronic/layout';
import { ListingTableContextProvider } from '../components/Listing/ListingTableContext';


const EcheckPage = () => {
    const baseRouterUrl = '/echeqs'
    return (
        <>
        <Switch>
            <ContentRoute 
                exact
                path={baseRouterUrl + '/list'}
                component={Listing} 
                ContextProvider={ListingTableContextProvider} />
        </Switch>  
    </>  
    )
}

export default EcheckPage;