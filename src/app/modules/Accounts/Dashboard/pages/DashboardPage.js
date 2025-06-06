import React from 'react'
import Listing from "../components/Listing/index"
import { Switch } from 'react-router'
import { ContentRoute } from '../../../../../_metronic/layout'
import { ListingTableContextProvider } from "../components/Listing/ListingTableContext"

export default function DashboardPage () {

  const baseRouterUrl = "/accounts"

  return (
    <Switch>
      <ContentRoute 
        exact
        path={baseRouterUrl + '/dashboard'}
        component={Listing} 
        ContextProvider={ListingTableContextProvider} />
    </Switch>  
  )
}

