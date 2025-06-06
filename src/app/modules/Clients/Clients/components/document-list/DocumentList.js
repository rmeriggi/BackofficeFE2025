import React from 'react'
import Listing from "./Listing"
import { ListingTableContextProvider } from './Listing/ListingTableContext'

const DocumentList = ({id, passport, dni}) => {
  return (
    <ListingTableContextProvider>
      <Listing idClient={id} passport={passport} dni={dni}/>
    </ListingTableContextProvider>
  )
}

export default DocumentList