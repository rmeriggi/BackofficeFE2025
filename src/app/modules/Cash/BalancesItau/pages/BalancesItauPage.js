import React from 'react'
import { Switch } from 'react-router-dom'
import { ContentRoute } from '../../../../../_metronic/layout'
import CreatePage from './Create/CreatePage'
import EditPage from './Edit/EditPage'
import Listing from './Listing'
import { ListingTableContextProvider } from './Listing/ListingTableContext'

function BalancesItauPage () {
  return (
    <Switch>
      <ContentRoute exact path="/cash/balances-itau" component={Listing} ContextProvider={ListingTableContextProvider}/>
      <ContentRoute exact path="/cash/balances-itau/create" component={CreatePage} ContextProvider={ListingTableContextProvider}/>
      <ContentRoute exact path="/cash/balances-itau/edit/:id" component={EditPage} ContextProvider={ListingTableContextProvider}/>
    </Switch>
  )
}

export default BalancesItauPage