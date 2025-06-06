import React from 'react'
import Listing from './access-flap/Listing'
import { ListingTableContextProvider } from './access-flap/Listing/ListingTableContext'

export default function UserAccessFlap({id}) {
 
  return (
    <ListingTableContextProvider>
      <Listing /> 
    </ListingTableContextProvider>
  
  )
}
