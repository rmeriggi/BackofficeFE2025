import React from 'react';
import Listing from './Listing/index';
import { ListingTableContextProvider } from './Listing/ListingTableContext';

export default function VatPurchasesPage() {
  return (
    <ListingTableContextProvider>
      <Listing />
    </ListingTableContextProvider>
  );
}
