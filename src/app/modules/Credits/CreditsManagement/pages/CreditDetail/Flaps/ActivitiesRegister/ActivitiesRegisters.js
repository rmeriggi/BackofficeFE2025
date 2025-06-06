import React from 'react'
import { ListingTableContextProvider } from './Listing/ListingTableContext'
import Listing from "./Listing"
import { useParams } from 'react-router-dom'

export default function ActivitiesRegisters() {

  const {id} = useParams()
  return (
    <ListingTableContextProvider>
      <Listing id={id}/>
    </ListingTableContextProvider>
  )
}
