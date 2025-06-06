import React from 'react'
import Listing from "../Scoring/Listing"
import {ListingTableContextProvider} from "../Scoring/Listing/ListingTableContext"

export function ScoringEdit() {

  return (
    <ListingTableContextProvider >
      <Listing />
    </ListingTableContextProvider>
  )
}
