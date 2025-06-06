import React from 'react';
import { ContentRoute } from '../../../../../_metronic/layout';
import { ListingTableContextProvider } from '../components/Listing/ListingTableContext';
import Listing  from "../components/Listing/index"

export default function TransactionsPage() {

    const baseRouterUrl = "/accounts"
    return (
        <>    
            <ContentRoute 
                path={baseRouterUrl + '/transactions'}
                component={Listing} 
                ContextProvider={ListingTableContextProvider} /> 
	     </> 
    )
}

