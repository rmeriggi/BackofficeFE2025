import React from 'react';
import { ListingTableContextProvider } from './Listing/ListingTableContext';
import Listing from './Listing';

export const BenefitsFlap = () => {
    return (
        <ListingTableContextProvider>
            <Listing />
        </ListingTableContextProvider>
    )
}
