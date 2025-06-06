import React from 'react'
import { Switch } from 'react-router'
import { ContentRoute } from '../../../../_metronic/layout'
import Listing from './Listing'
import { ListingTableContextProvider } from './Listing/ListingTableContext'

export default function MovementsPage () {
  return (
    <Switch>
      <ContentRoute path="/reports/clients" exact component={Listing} ContextProvider={ListingTableContextProvider} />
    </Switch>
  )
}