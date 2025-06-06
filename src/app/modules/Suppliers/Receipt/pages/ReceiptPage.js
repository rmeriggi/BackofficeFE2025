import React from 'react';
import Listing from '../components/Listing';
import { Switch } from 'react-router-dom';
import { ContentRoute } from '../../../../../_metronic/layout';
import { ListingTableContextProvider } from '../components/Listing/ListingTableContext';
import { SupplierEdit } from '../components/SupplierEdit';
import { SupplierCreate } from '../components/SupplierCreate';


const ReceiptPage = () => {
    const baseRouterUrl = '/suppliers'
    return (
        <>
        <Switch>
            <ContentRoute 
                exact
                path={baseRouterUrl + '/suppliers'}
                component={Listing} 
                ContextProvider={ListingTableContextProvider} />
            <ContentRoute
            path={baseRouterUrl +"/suppliers/edit/:id"}
            component={SupplierEdit}
            ContextProvider={ListingTableContextProvider}
        />
            <ContentRoute
            path={baseRouterUrl +"/suppliers/supplier/new/create"}
            component={SupplierCreate}
            ContextProvider={ListingTableContextProvider}
        />
        </Switch>  
    </>  
    )
}

export default ReceiptPage;