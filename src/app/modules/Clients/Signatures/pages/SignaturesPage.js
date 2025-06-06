import React from 'react';
import Listing from '../components/Listing';
import ListingSignatures from '../components/ListingSignatures';
import { Switch } from 'react-router-dom';
import { ContentRoute } from '../../../../../_metronic/layout';
import { ListingTableContextProvider } from '../components/Listing/ListingTableContext';
import { ListingTableContextSignaturesProvider } from '../components/ListingSignatures/ListingTableContext';


const SignaturesPage = () => {
    const baseRouterUrl = '/clients'
    
    return (
        <>
        <Switch>
            <ContentRoute 
                exact
                path={baseRouterUrl + '/signatures'}
                component={Listing} 
                ContextProvider={ListingTableContextProvider} />
                <ContentRoute 
                exact
                path={baseRouterUrl + '/signatures/:id'}
                component={ListingSignatures} 
                ContextProvider={ListingTableContextSignaturesProvider} />
        </Switch>  
    </>  
    )
}

export default SignaturesPage;