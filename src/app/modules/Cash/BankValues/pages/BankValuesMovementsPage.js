import React from 'react'
import Listing from './Listing'
import { ListingTableContextProvider } from './Listing/ListingTableContext'

export default function MovementsPage () {
  return (
    <ListingTableContextProvider>
      <Listing />
    </ListingTableContextProvider>
  )
}
