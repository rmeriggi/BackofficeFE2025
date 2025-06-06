import React from 'react'
import {  Switch } from 'react-router'
import Listing from "../components/Listing/index"
import { ContentRoute } from '../../../../../_metronic/layout'
import { ListingTableContextProvider } from "../components/Listing/ListingTableContext"

export default function ScoreparamsPage() {

  const baseRouterUrl = "/settings"
  return (
    <>
    <Switch>
      <ContentRoute 
        exact
        path={baseRouterUrl + "/scoreparams"}
        component={Listing} 
        ContextProvider={ListingTableContextProvider}
      />
    </Switch>  
    </> 
  )
}
