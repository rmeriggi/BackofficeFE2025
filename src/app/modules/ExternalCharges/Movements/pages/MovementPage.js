import React from 'react'
import { Switch } from 'react-router'
import { ContentRoute } from '../../../../../_metronic/layout'
import { MovementEdit } from './Edit/MovementEdit'
import Listing from './Listing'
import { ListingTableContextProvider } from './Listing/ListingTableContext'

export default function MovementsPage () {
  return (
    <Switch>
            <ContentRoute path="/externalcharges/movement" exact component={Listing} ContextProvider={ListingTableContextProvider} />
            <ContentRoute path="/externalcharges/movement/edit/:id" component={MovementEdit}/> 
    </Switch>
  )
}