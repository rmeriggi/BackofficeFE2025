import React from 'react'
import { ListingTableContextProvider } from '../Program/Listing/ListingTableContext'
import Listing from '../Program/Listing'

export default function ProgramEdit() {
  return (
    <ListingTableContextProvider >
      <Listing />
    </ListingTableContextProvider>
  )
}
