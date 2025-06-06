import React from 'react'
import { ListingTableContextProvider } from './Listing/ListingTableContext'
import Listing from "./Listing"

export default function ActivitiesRegisters({idClient}) {
  return (
    <ListingTableContextProvider>
      <Listing idClient={idClient}/>
    </ListingTableContextProvider>
  )
}
