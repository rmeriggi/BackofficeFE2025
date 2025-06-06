import React from 'react';
import Listing from '../components/Listing';
import { Switch } from 'react-router-dom';
import { ContentRoute } from '../../../../../_metronic/layout';
import { ListingTableContextProvider } from '../components/Listing/ListingTableContext';
import { InvoiceEdit } from '../components/InvoiceEdit';


const InvoicePage = () => {
    const baseRouterUrl = '/suppliers'
    return (
        <>
        <Switch>
            <ContentRoute 
                exact
                path={baseRouterUrl + '/invoices'}
                component={Listing} 
                ContextProvider={ListingTableContextProvider} />
                <ContentRoute
            path={baseRouterUrl +"/invoices/edit/:id"}
            component={InvoiceEdit}
            ContextProvider={ListingTableContextProvider}
        />
        </Switch>  
    </>  
    )
}

export default InvoicePage;