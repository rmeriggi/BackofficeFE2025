import React from 'react'
import {ListingTableContextProvider} from "./Listing/ListingTableContext"
import Listing from "./Listing/index"

export default function TransactionsCard() {
  return (
    <ListingTableContextProvider>
      <Listing />
    </ListingTableContextProvider>
  )
}
