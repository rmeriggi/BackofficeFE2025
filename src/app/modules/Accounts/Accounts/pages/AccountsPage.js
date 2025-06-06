import React from 'react';
import Listing from '../components/Listing';
import { Switch } from 'react-router-dom';
import { ContentRoute } from '../../../../../_metronic/layout';
import {Listing as ListingExtract} from "../components/extract/Listing/index"
import AccountTableView from '../components/account-table-view/AccountTableView';
import { ListingTableContextProvider } from '../components/Listing/ListingTableContext';
import {ListingTableContextProvider as ListingTableContextProviderExtract} from "../components/extract/Listing/ListingTableContext"
import { ListingAccountTableContextProvider } from '../components/account-table-view/ListingAccountTableContext';


const AccountsPage = () => {
    const baseRouterUrl = '/accounts'
    
    return (
        <>
        <Switch>
            <ContentRoute 
                exact
                path={baseRouterUrl + '/accounts'}
                component={Listing} 
                ContextProvider={ListingTableContextProvider} />
            <ContentRoute
                path={baseRouterUrl + '/accounts/view/:id'}
                component={AccountTableView} 
                ContextProvider={ListingAccountTableContextProvider}/> 
            <ContentRoute
            path={baseRouterUrl + '/accounts/extract/:id'}
            component={ListingExtract}
            ContextProvider={ListingTableContextProviderExtract} /> 
        </Switch>  
    </>  
    )
}

export default AccountsPage;