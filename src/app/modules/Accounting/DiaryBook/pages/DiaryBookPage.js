import React from 'react'
import Listing from './Listing'
import { ListingTableContextProvider } from './Listing/ListingTableContext'

export default function DiaryBookPage  () {
  return (
    <ListingTableContextProvider>
      <Listing />
    </ListingTableContextProvider>
  )
}
